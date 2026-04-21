import { Image } from 'react-native';

import { tokens } from '../../theme/tokens';

import axolotlImage from '../../assets/images/feed-state-axolotl.png';

interface FeedStateAxolotlIllustrationProps {
  /** По умолчанию — размер из токенов state-card (Figma 112×112). */
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
