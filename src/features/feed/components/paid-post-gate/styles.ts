import { StyleSheet } from 'react-native';

import { tokens } from '../../../../theme/tokens';

export const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: tokens.colors.overlay.paywall,
  },
  message: {
    width: tokens.components.feedCard.paywallContentWidth,
    alignItems: 'center',
    gap: 1,
  },
  topContent: {
    padding: tokens.components.feedCard.paywallContentGap,
    alignItems: 'center',
  },
  textIcon: {
    width: tokens.components.feedCard.paywallMessageWidth,
    alignItems: 'center',
    justifyContent: 'center',
    gap: tokens.spacing[2],
  },
  iconBox: {
    width: tokens.components.feedCard.paywallIconBoxSize,
    height: tokens.components.feedCard.paywallIconBoxSize,
    borderRadius: tokens.components.feedCard.paywallIconBoxRadius,
    backgroundColor: tokens.colors.brand.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  copy: {
    ...tokens.typography.paywallMessage,
    width: tokens.components.feedCard.paywallMessageWidth,
    color: tokens.colors.content.inverse,
    textAlign: 'center',
  },
  button: {
    width: tokens.components.feedCard.paywallButtonWidth,
    alignSelf: 'center',
  },
});
