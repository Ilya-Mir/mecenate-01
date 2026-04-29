import { InfiniteData, useQueryClient } from '@tanstack/react-query';
import { BlurView } from 'expo-blur';
import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  KeyboardAvoidingView,
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
import { canRenderRemoteImage } from '../../../../utils/media';
import { ActionButton } from '../../../../ui/action-button/action-button';
import { Avatar } from '../../../../ui/avatar/avatar';
import { Button } from '../../../../ui/button/button';
import { CardSurface } from '../../../../ui/card/card-surface';
import { SkeletonBlock } from '../../../../ui/skeleton/skeleton-block';
import { AnimatedLikeButton } from '../animated-like-button';
import { CommentCard } from '../comment-card';
import { usePostComments } from '../../hooks/use-post-comments';
import { usePostDetail } from '../../hooks/use-post-detail';
import { styles } from './styles';

const FEED_FILTERS: FeedTierFilter[] = ['all', 'free', 'paid'];

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
  const postQuery = usePostDetail(postId);
  const commentsQuery = usePostComments(postId);

  usePostRealtime(postId);

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

  if (postQuery.isPending) {
    return (
      <SafeAreaView edges={['top']} style={styles.screen}>
        <View style={styles.topBar}>
          <Pressable accessibilityRole="button" onPress={onBack} style={styles.backButton}>
            <Text style={styles.backButtonLabel}>{'<'}</Text>
          </Pressable>
          <Text style={styles.headerTitle}>Публикация</Text>
          <View style={styles.topBarSpacer} />
        </View>
        <View style={styles.loadingState}>
          <SkeletonBlock height={420} width="100%" />
          <ActivityIndicator color={tokens.colors.brand.primary} size="small" />
        </View>
      </SafeAreaView>
    );
  }

  if (postQuery.isError || !post) {
    return (
      <SafeAreaView edges={['top']} style={styles.screen}>
        <View style={styles.topBar}>
          <Pressable accessibilityRole="button" onPress={onBack} style={styles.backButton}>
            <Text style={styles.backButtonLabel}>{'<'}</Text>
          </Pressable>
          <Text style={styles.headerTitle}>Публикация</Text>
          <View style={styles.topBarSpacer} />
        </View>
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
      </SafeAreaView>
    );
  }

  const isPaidPost = post.tier === 'paid';
  const canShowCover = canRenderRemoteImage(post.coverUrl);

  return (
    <SafeAreaView edges={['top']} style={styles.screen}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.keyboardView}
      >
        <View style={styles.topBar}>
          <Pressable accessibilityRole="button" onPress={onBack} style={styles.backButton}>
            <Text style={styles.backButtonLabel}>{'<'}</Text>
          </Pressable>
          <Text numberOfLines={1} style={styles.headerTitle}>Публикация</Text>
          <View style={styles.topBarSpacer} />
        </View>

        <ScrollView
          contentContainerStyle={styles.contentContainer}
          contentInsetAdjustmentBehavior="automatic"
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <CardSurface style={styles.postCard}>
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
                <Text numberOfLines={1} style={styles.authorMeta}>
                  @{post.author.username}
                </Text>
              </View>
            </View>

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
              <Text selectable style={styles.title}>{post.title}</Text>
              <Text selectable style={styles.bodyText}>
                {post.body || post.preview}
              </Text>
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
            </View>
          </CardSurface>

          <CardSurface style={styles.commentsCard}>
            <Text style={styles.sectionTitle}>Комментарии</Text>

            <View style={styles.commentInputBlock}>
              <TextInput
                maxLength={500}
                multiline
                onChangeText={setCommentText}
                placeholder="Написать комментарий"
                placeholderTextColor={tokens.colors.content.tertiary}
                style={styles.commentInput}
                value={commentText}
              />
              <Button
                disabled={!canSubmitComment}
                fullWidth
                label="Отправить"
                loading={isSendingComment}
                onPress={handleSendComment}
              />
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

            {commentsQuery.hasNextPage ? (
              <Button
                fullWidth
                label="Загрузить еще"
                loading={commentsQuery.isFetchingNextPage}
                onPress={() => {
                  void commentsQuery.fetchNextPage();
                }}
              />
            ) : null}
          </CardSurface>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
});
