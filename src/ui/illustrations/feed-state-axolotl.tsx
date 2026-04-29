import { Image } from 'react-native';

import { tokens } from '../../theme/tokens';

import axolotlImage from '../../assets/images/feed-state-axolotl.png';

interface FeedStateAxolotlIllustrationProps {
  size?: number;
  accessibilityLabel?: string;
}

export function FeedStateAxolotlIllustration({
  size = tokens.components.feedStateCard.illustrationSize,
  accessibilityLabel = 'Иллюстрация состояния',
}: FeedStateAxolotlIllustrationProps) {
  return (
    <Image
      accessibilityIgnoresInvertColors
      accessibilityLabel={accessibilityLabel}
      accessibilityRole="image"
      resizeMode="contain"
      source={axolotlImage}
      style={{ width: size, height: size }}
    />
  );
}
