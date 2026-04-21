import { ReactNode } from 'react';
import { Text, View } from 'react-native';

import { tokens } from '../../../../theme/tokens';
import { Avatar } from '../../../../ui/avatar/avatar';
import { Button } from '../../../../ui/button/button';
import { CardSurface } from '../../../../ui/card/card-surface';
import { styles } from './styles';

interface FeedStateCardProps {
  authorName?: string;
  authorAvatarUrl?: string;
  title: string;
  buttonLabel: string;
  onPress: () => void;
  illustration: ReactNode;
  fullHeight?: boolean;
}

export function FeedStateCard({
  authorName,
  authorAvatarUrl,
  title,
  buttonLabel,
  onPress,
  illustration,
  fullHeight = false,
}: FeedStateCardProps) {
  return (
    <CardSurface style={[styles.card, fullHeight ? styles.cardFullHeight : undefined]}>
      {authorName ? (
        <View style={styles.header}>
          <Avatar
            name={authorName}
            size={tokens.components.feedStateCard.avatarSize}
            uri={authorAvatarUrl}
          />
          <Text style={styles.authorLabel}>{authorName}</Text>
        </View>
      ) : null}

      <View style={styles.illustrationFrame}>{illustration}</View>

      <Text style={styles.title}>{title}</Text>

      <Button fullWidth label={buttonLabel} onPress={onPress} />
    </CardSurface>
  );
}
