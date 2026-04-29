import { Text, View } from 'react-native';

import { Avatar } from '../../../../ui/avatar/avatar';
import { Comment } from '../../../../types/api';
import { styles } from './styles';

interface CommentCardProps {
  comment: Comment;
}

export function CommentCard({ comment }: CommentCardProps) {
  return (
    <View style={styles.card}>
      <Avatar
        name={comment.author.displayName}
        size={36}
        uri={comment.author.avatarUrl}
      />
      <View style={styles.body}>
        <Text numberOfLines={1} style={styles.authorName}>
          {comment.author.displayName}
        </Text>
        <Text selectable style={styles.text}>
          {comment.text}
        </Text>
      </View>
    </View>
  );
}
