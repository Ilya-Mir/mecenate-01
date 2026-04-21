import { View } from 'react-native';

import { tokens } from '../../../../theme/tokens';
import { CardSurface } from '../../../../ui/card/card-surface';
import { SkeletonBlock } from '../../../../ui/skeleton/skeleton-block';
import { styles } from './styles';

export function FeedCardSkeleton() {
  return (
    <CardSurface style={styles.card}>
      <View style={styles.header}>
        <SkeletonBlock
          borderRadius={tokens.components.feedCard.avatarSize / 2}
          height={tokens.components.feedCard.avatarSize}
          width={tokens.components.feedCard.avatarSize}
        />
        <SkeletonBlock
          height={20}
          width={tokens.components.feedCard.skeletonTextWidth}
        />
      </View>

      <View style={styles.mediaSection}>
        <SkeletonBlock
          borderRadius={0}
          height={tokens.components.feedCard.mediaHeight}
          style={styles.media}
        />

        <View style={styles.content}>
          <SkeletonBlock
            height={26}
            width={tokens.components.feedCard.skeletonTitleWidth}
          />
          <SkeletonBlock height={20} width="100%" />
        </View>
      </View>

      <View style={styles.actions}>
        <SkeletonBlock
          height={tokens.components.feedCard.actionRowHeight}
          width={tokens.components.feedCard.skeletonButtonWidth}
        />
        <SkeletonBlock
          height={tokens.components.feedCard.actionRowHeight}
          width={tokens.components.feedCard.skeletonButtonWidth}
        />
      </View>
    </CardSurface>
  );
}
