import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

import { tokens } from '../../theme/tokens';

interface SkeletonBlockProps {
  width?: number | `${number}%`;
  height: number;
  borderRadius?: number;
  style?: StyleProp<ViewStyle>;
}

export function SkeletonBlock({
  width = '100%',
  height,
  borderRadius = tokens.components.feedCard.skeletonRadius,
  style,
}: SkeletonBlockProps) {
  return (
    <View
      style={[
        styles.base,
        {
          width,
          height,
          borderRadius,
        },
        style,
      ]}
    />
  );
}

const styles = StyleSheet.create({
  base: {
    backgroundColor: tokens.colors.background.skeleton,
  },
});
