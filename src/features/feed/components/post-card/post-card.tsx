import { observer } from 'mobx-react-lite';
import { Alert, Image, Pressable, Text, View } from 'react-native';

import { toggleLike } from '../../../../api/posts';
import { useRootStore } from '../../../../stores/root-store';
import { tokens } from '../../../../theme/tokens';
import { Post } from '../../../../types/api';
import { formatCompactCount } from '../../../../utils/format';
import { canRenderRemoteImage } from '../../../../utils/media';
import { ActionButton } from '../../../../ui/action-button/action-button';
import { Avatar } from '../../../../ui/avatar/avatar';
import { CardSurface } from '../../../../ui/card/card-surface';
import { ExpandableText } from '../../../../ui/expandable-text/expandable-text';
import { SkeletonBlock } from '../../../../ui/skeleton/skeleton-block';
import { PaidPostGate } from '../paid-post-gate';
import { styles } from './styles';

interface PostCardProps {
  post: Post;
  onPress?: () => void;
}

export const PostCard = observer(function PostCard({
  post,
  onPress,
}: PostCardProps) {
  const { likesStore, sessionStore } = useRootStore();
  const likeSnapshot = likesStore.getSnapshot(post);
  const isPaidPost = post.tier === 'paid';
  const canShowCover = canRenderRemoteImage(post.coverUrl);

  const handleLikePress = async () => {
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
    } catch {
      if (
        previousSnapshot.isLiked === post.isLiked &&
        previousSnapshot.likesCount === post.likesCount
      ) {
        likesStore.clear(post.id);
      } else {
        likesStore.setSnapshot(post.id, {
          ...previousSnapshot,
          isPending: false,
        });
      }

      Alert.alert('Не удалось обновить лайк');
    }
  };

  const mainContent = (
    <>
      <View style={styles.header}>
        <Avatar
          name={post.author.displayName}
          size={tokens.components.feedCard.avatarSize}
          uri={post.author.avatarUrl}
        />

        <View style={styles.authorTextBlock}>
          <View style={styles.authorNameRow}>
            <Text numberOfLines={1} style={styles.authorName}>
              {post.author.displayName}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.mediaSection}>
        <View style={styles.coverFrame}>
          {canShowCover ? (
            <Image
              blurRadius={isPaidPost ? 20 : 0}
              source={{ uri: post.coverUrl }}
              style={styles.coverImage}
            />
          ) : (
            <View style={styles.coverFallback}>
              <Text style={styles.coverFallbackLabel}>{post.title}</Text>
            </View>
          )}

          {isPaidPost ? <PaidPostGate onPress={() => {}} /> : null}
        </View>

        <View style={[styles.body, isPaidPost ? styles.paidBody : null]}>
          {isPaidPost ? (
            <>
              <SkeletonBlock
                height={26}
                width={tokens.components.feedCard.skeletonTitleWidth}
              />
              <SkeletonBlock height={40} width="100%" />
            </>
          ) : (
            <>
              <Text style={styles.title}>{post.title}</Text>
              <ExpandableText
                style={styles.previewContainer}
                text={post.preview}
                textStyle={styles.preview}
              />
            </>
          )}
        </View>
      </View>
    </>
  );

  const actions = !isPaidPost ? (
    <View style={styles.actionsRow}>
      <ActionButton
        active={likeSnapshot.isLiked}
        disabled={likeSnapshot.isPending}
        kind="like"
        onPress={handleLikePress}
        value={formatCompactCount(likeSnapshot.likesCount)}
      />
      <ActionButton
        kind="comment"
        onPress={onPress}
        value={formatCompactCount(post.commentsCount)}
      />
    </View>
  ) : null;

  const canOpenDetail = Boolean(onPress) && !isPaidPost;

  const content = (
    <>
      {canOpenDetail ? (
        <Pressable
          accessibilityRole="button"
          onPress={onPress}
          style={styles.pressableContent}
        >
          {mainContent}
        </Pressable>
      ) : (
        mainContent
      )}
      {actions}
    </>
  );

  return (
    <CardSurface style={[styles.card, isPaidPost ? styles.paidCard : null]}>
      {content}
    </CardSurface>
  );
});
