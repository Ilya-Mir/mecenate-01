import { InfiniteData, useQueryClient } from '@tanstack/react-query';
import { BlurView } from 'expo-blur';
import { observer } from 'mobx-react-lite';
import { useMemo, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  KeyboardAvoidingView,
  NativeSyntheticEvent,
  NativeScrollEvent,
  PanResponder,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { addComment, toggleLike } from '../../../../api/posts';
import { queryKeys } from '../../../../api/query-keys';
import { usePostRealtime } from '../../../../realtime/use-post-realtime';
import { useRootStore } from '../../../../stores/root-store';
import { tokens } from '../../../../theme/tokens';
import { CommentsPage, Post, PostsPage } from '../../../../types/api';
import { FeedTierFilter } from '../../../../types/feed';
import { formatCompactCount } from '../../../../utils/format';
import { formatCommentsCountLabel } from '../../../../utils/format-comments-count';
import { canRenderRemoteImage } from '../../../../utils/media';
import { ActionButton } from '../../../../ui/action-button/action-button';
import { Avatar } from '../../../../ui/avatar/avatar';
import { Button } from '../../../../ui/button/button';
import { CardSurface } from '../../../../ui/card/card-surface';
import { ExpandableText } from '../../../../ui/expandable-text/expandable-text';
import { SendIcon } from '../../../../ui/icons';
import { SkeletonBlock } from '../../../../ui/skeleton/skeleton-block';
import { AnimatedLikeButton } from '../animated-like-button';
import { CommentCard } from '../comment-card';
import { usePostComments } from '../../hooks/use-post-comments';
import { usePostDetail } from '../../hooks/use-post-detail';
import { styles } from './styles';

const FEED_FILTERS: FeedTierFilter[] = ['all', 'free', 'paid'];
const COMMENTS_LOAD_MORE_THRESHOLD_RATIO = 0.25;

interface PostDetailScreenProps {
  postId: string;
  onBack: () => void;
}

function updateFeedPost(
  data: InfiniteData<PostsPage> | undefined,
  postId: string,
  updatePost: (post: Post) => Post,
) {
  if (!data) {
    return data;
  }

  return {
    ...data,
    pages: data.pages.map((page) => ({
      ...page,
      posts: page.posts.map((post) =>
        post.id === postId ? updatePost(post) : post,
      ),
    })),
  };
}

export const PostDetailScreen = observer(function PostDetailScreen({
  postId,
  onBack,
}: PostDetailScreenProps) {
  const queryClient = useQueryClient();
  const { likesStore, sessionStore } = useRootStore();
  const [commentText, setCommentText] = useState('');
  const [isSendingComment, setIsSendingComment] = useState(false);
  const lastAutoLoadCursorRef = useRef<string | null>(null);
  const postQuery = usePostDetail(postId);
  const commentsQuery = usePostComments(postId);

  usePostRealtime(postId);

  const edgeSwipePan = useMemo(
    () =>
      PanResponder.create({
        onMoveShouldSetPanResponder: (_, g) =>
          g.dx > 12 && Math.abs(g.dx) > Math.abs(g.dy) + 4,
        onPanResponderRelease: (_, g) => {
          if (g.dx > 56) {
            onBack();
          }
        },
      }),
    [onBack],
  );

  const post = postQuery.data;
  const comments = commentsQuery.data?.pages.flatMap((page) => page.comments) ?? [];
  const likeSnapshot = post
    ? likesStore.getSnapshot(post)
    : { isLiked: false, likesCount: 0, isPending: false };
  const canSubmitComment =
    commentText.trim().length > 0 &&
    commentText.trim().length <= 500 &&
    !isSendingComment;

  const patchPostCaches = (updatePost: (post: Post) => Post) => {
    queryClient.setQueryData<Post | undefined>(
      queryKeys.postDetail(sessionStore.apiBaseUrl, sessionStore.userToken, postId),
      (currentPost) => (currentPost ? updatePost(currentPost) : currentPost),
    );

    FEED_FILTERS.forEach((tierFilter) => {
      queryClient.setQueryData<InfiniteData<PostsPage> | undefined>(
        queryKeys.feedPosts(sessionStore.apiBaseUrl, sessionStore.userToken, tierFilter),
        (data) => updateFeedPost(data, postId, updatePost),
      );
    });
  };

  const handleLikePress = async () => {
    if (!post) {
      return;
    }

    const previousSnapshot = { ...likeSnapshot };
    const nextSnapshot = {
      isLiked: !previousSnapshot.isLiked,
      likesCount: Math.max(
        0,
        previousSnapshot.likesCount + (previousSnapshot.isLiked ? -1 : 1),
      ),
      isPending: true,
    };

    likesStore.setSnapshot(post.id, nextSnapshot);
    patchPostCaches((currentPost) => ({
      ...currentPost,
      likesCount: nextSnapshot.likesCount,
      isLiked: nextSnapshot.isLiked,
    }));

    try {
      const response = await toggleLike({
        baseUrl: sessionStore.apiBaseUrl,
        token: sessionStore.userToken,
        postId: post.id,
      });

      likesStore.setSnapshot(post.id, {
        isLiked: response.isLiked,
        likesCount: response.likesCount,
        isPending: false,
      });
      patchPostCaches((currentPost) => ({
        ...currentPost,
        likesCount: response.likesCount,
        isLiked: response.isLiked,
      }));
    } catch {
      likesStore.setSnapshot(post.id, {
        ...previousSnapshot,
        isPending: false,
      });
      patchPostCaches((currentPost) => ({
        ...currentPost,
        likesCount: previousSnapshot.likesCount,
        isLiked: previousSnapshot.isLiked,
      }));
      Alert.alert('Не удалось обновить лайк');
    }
  };

  const handleSendComment = async () => {
    const text = commentText.trim();

    if (!post || !text || text.length > 500) {
      return;
    }

    setIsSendingComment(true);

    try {
      const comment = await addComment({
        baseUrl: sessionStore.apiBaseUrl,
        token: sessionStore.userToken,
        postId,
        text,
      });

      queryClient.setQueryData<InfiniteData<CommentsPage> | undefined>(
        queryKeys.postComments(sessionStore.apiBaseUrl, sessionStore.userToken, postId),
        (data) => {
          if (!data) {
            return data;
          }

          const [firstPage, ...restPages] = data.pages;

          if (!firstPage) {
            return data;
          }

          return {
            ...data,
            pages: [
              {
                ...firstPage,
                comments: [comment, ...firstPage.comments],
              },
              ...restPages,
            ],
          };
        },
      );
      patchPostCaches((currentPost) => ({
        ...currentPost,
        commentsCount: currentPost.commentsCount + 1,
      }));
      setCommentText('');
    } catch {
      Alert.alert('Не удалось отправить комментарий');
    } finally {
      setIsSendingComment(false);
    }
  };

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (!commentsQuery.hasNextPage || commentsQuery.isFetchingNextPage) {
      return;
    }

    const currentNextCursor =
      commentsQuery.data?.pages[commentsQuery.data.pages.length - 1]?.nextCursor ?? null;
    if (!currentNextCursor || lastAutoLoadCursorRef.current === currentNextCursor) {
      return;
    }

    const { contentOffset, contentSize, layoutMeasurement } = event.nativeEvent;
    const bottomOffset = contentSize.height - (contentOffset.y + layoutMeasurement.height);
    const dynamicThreshold =
      layoutMeasurement.height * COMMENTS_LOAD_MORE_THRESHOLD_RATIO;

    if (bottomOffset <= dynamicThreshold) {
      lastAutoLoadCursorRef.current = currentNextCursor;
      void commentsQuery.fetchNextPage();
    }
  };

  const swipeOverlay = (
    <View pointerEvents="box-none" style={styles.edgeSwipeZone} {...edgeSwipePan.panHandlers} />
  );

  if (postQuery.isPending) {
    return (
      <SafeAreaView edges={['top', 'bottom']} style={styles.screen}>
        <View style={styles.swipeRoot}>
          {swipeOverlay}
          <View style={styles.loadingState}>
            <CardSurface style={styles.loadingPostCard}>
              <View style={styles.loadingHeader}>
                <SkeletonBlock height={40} width={40} />
                <View style={styles.loadingHeaderText}>
                  <SkeletonBlock height={14} width={132} />
                </View>
              </View>
              <SkeletonBlock height={tokens.components.feedCard.mediaHeight} width="100%" />
              <View style={styles.loadingBody}>
                <SkeletonBlock height={26} width="68%" />
                <SkeletonBlock height={18} width="100%" />
                <SkeletonBlock height={18} width="84%" />
                <View style={styles.loadingActions}>
                  <SkeletonBlock height={36} width={63} />
                  <SkeletonBlock height={36} width={63} />
                </View>
              </View>
              <View style={styles.loadingCommentsBlock}>
                <SkeletonBlock height={20} width="40%" />
                <SkeletonBlock height={58} width="100%" />
                <SkeletonBlock height={58} width="100%" />
              </View>
            </CardSurface>

            <View pointerEvents="none" style={styles.loadingOverlay}>
              <ActivityIndicator color={tokens.colors.brand.primary} size="large" />
              <Text style={styles.loadingLabel}>Загружаем публикацию</Text>
            </View>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  if (postQuery.isError || !post) {
    return (
      <SafeAreaView edges={['top', 'bottom']} style={styles.screen}>
        <View style={styles.swipeRoot}>
          {swipeOverlay}
          <View style={styles.errorState}>
            <Text style={styles.errorTitle}>Не удалось загрузить публикацию</Text>
            <Button
              fullWidth
              label="Повторить"
              onPress={() => {
                void postQuery.refetch();
              }}
            />
          </View>
        </View>
      </SafeAreaView>
    );
  }

  const isPaidPost = post.tier === 'paid';
  const canShowCover = canRenderRemoteImage(post.coverUrl);
  const bodyText = post.body || post.preview;

  const sendIconColor = canSubmitComment
    ? tokens.colors.brand.primary
    : tokens.colors.brand.primaryDisabled;

  const composerRow = (
    <View style={styles.composerRow}>
      <TextInput
        maxLength={500}
        multiline
        onChangeText={setCommentText}
        placeholder="Ваш комментарий"
        placeholderTextColor={tokens.colors.content.inputPlaceholder}
        style={styles.composerInput}
        value={commentText}
      />
      <Pressable
        accessibilityLabel="Отправить комментарий"
        accessibilityRole="button"
        disabled={!canSubmitComment}
        onPress={handleSendComment}
        style={({ pressed }) => [
          styles.sendButton,
          pressed && canSubmitComment ? { opacity: 0.85 } : null,
        ]}
      >
        {isSendingComment ? (
          <ActivityIndicator color={sendIconColor} size="small" />
        ) : (
          <SendIcon
            color={sendIconColor}
            size={tokens.components.postDetailComposer.sendIconWidth}
          />
        )}
      </Pressable>
    </View>
  );

  return (
    <SafeAreaView edges={['top', 'bottom']} style={styles.screen}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.keyboardView}
      >
        <View style={styles.swipeRoot}>
          {swipeOverlay}
          <View style={styles.mainColumn}>
            <ScrollView
              contentContainerStyle={styles.contentContainer}
              contentInsetAdjustmentBehavior="automatic"
              keyboardShouldPersistTaps="handled"
              onScroll={handleScroll}
              scrollEventThrottle={16}
              showsVerticalScrollIndicator={false}
              style={styles.scroll}
            >
              <CardSurface style={styles.detailCard}>
                <View style={styles.detailInner}>
                  <View style={styles.authorRow}>
                    <Avatar
                      name={post.author.displayName}
                      size={tokens.components.feedCard.avatarSize}
                      uri={post.author.avatarUrl}
                    />
                    <View style={styles.authorTextBlock}>
                      <Text numberOfLines={1} style={styles.authorName}>
                        {post.author.displayName}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.mediaColumn}>
                    <View style={styles.coverFrame}>
                      {canShowCover ? (
                        <Image source={{ uri: post.coverUrl }} style={styles.coverImage} />
                      ) : (
                        <View style={styles.coverFallback}>
                          <Text style={styles.coverFallbackLabel}>{post.title}</Text>
                        </View>
                      )}

                      {isPaidPost ? (
                        <BlurView intensity={42} style={styles.paidOverlay}>
                          <Text style={styles.paidOverlayText}>
                            Контент скрыт пользователем. Доступ откроется после доната
                          </Text>
                        </BlurView>
                      ) : null}
                    </View>

                    <View style={styles.postBody}>
                      <Text selectable style={styles.title}>
                        {post.title}
                      </Text>
                      <ExpandableText
                        style={styles.previewContainer}
                        text={bodyText}
                        textStyle={styles.preview}
                      />
                      {!isPaidPost ? (
                        <View style={styles.actionsRow}>
                          <AnimatedLikeButton
                            active={likeSnapshot.isLiked}
                            count={formatCompactCount(likeSnapshot.likesCount)}
                            disabled={likeSnapshot.isPending}
                            onPress={handleLikePress}
                          />
                          <ActionButton
                            kind="comment"
                            value={formatCompactCount(post.commentsCount)}
                          />
                        </View>
                      ) : null}
                    </View>
                  </View>
                </View>

                <View style={styles.commentsSection}>
                  <View style={styles.commentsHeaderRow}>
                    <Text style={styles.commentsCountLabel}>
                      {formatCommentsCountLabel(post.commentsCount)}
                    </Text>
                    <Pressable accessibilityRole="button">
                      <Text style={styles.sortLink}>Сначала новые</Text>
                    </Pressable>
                  </View>

                  {commentsQuery.isPending ? (
                    <View style={styles.commentsLoading}>
                      <SkeletonBlock height={58} width="100%" />
                      <SkeletonBlock height={58} width="100%" />
                    </View>
                  ) : null}

                  {!commentsQuery.isPending && comments.length === 0 ? (
                    <Text style={styles.emptyComments}>Комментариев пока нет</Text>
                  ) : null}

                  {comments.map((comment) => (
                    <CommentCard comment={comment} key={comment.id} />
                  ))}

                  {commentsQuery.isFetchingNextPage ? (
                    <View style={styles.nextPageLoader}>
                      <ActivityIndicator color={tokens.colors.brand.primary} size="small" />
                    </View>
                  ) : null}
                </View>
              </CardSurface>
            </ScrollView>
          </View>

          {Platform.OS === 'web' ? (
            <View style={[styles.composer, styles.composerSolid]}>{composerRow}</View>
          ) : (
            <BlurView
              intensity={tokens.components.postDetailComposer.blurIntensity}
              style={styles.composer}
              tint="light"
            >
              {composerRow}
            </BlurView>
          )}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
});
