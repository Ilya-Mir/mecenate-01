import { Text, View } from 'react-native';

import { tokens } from '../../../../theme/tokens';
import { Avatar } from '../../../../ui/avatar/avatar';
import { LikeIcon } from '../../../../ui/icons';
import { Comment } from '../../../../types/api';
import { styles } from './styles';

interface CommentCardProps {
  comment: Comment;
}

export function CommentCard({ comment }: CommentCardProps) {
  return (
    <View style={styles.row}>
      <View style={styles.mainBlock}>
        <Avatar
          name={comment.author.displayName}
          size={tokens.components.feedCard.avatarSize}
          uri={comment.author.avatarUrl}
        />
        <View style={styles.labelsColumn}>
          <Text numberOfLines={1} style={styles.authorName}>
            {comment.author.displayName}
          </Text>
          <Text selectable style={styles.text}>
            {comment.text}
          </Text>
        </View>
      </View>
      <View style={styles.likeSlot} accessibilityElementsHidden>
        <LikeIcon color={tokens.colors.content.secondary} filled={false} size={15} />
      </View>
    </View>
  );
}
