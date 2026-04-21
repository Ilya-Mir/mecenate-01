import { PropsWithChildren } from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

import { tokens } from '../../theme/tokens';

interface CardSurfaceProps extends PropsWithChildren {
  style?: StyleProp<ViewStyle>;
}

export function CardSurface({ children, style }: CardSurfaceProps) {
  return <View style={[styles.base, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  base: {
    backgroundColor: tokens.colors.background.card,
    borderRadius: tokens.components.feedCard.radius,
    overflow: 'hidden',
    ...tokens.shadows.card,
  },
});
