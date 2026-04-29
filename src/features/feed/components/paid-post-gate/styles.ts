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
    width: tokens.components.feedCard.paywallMessageContainerWidth,
    minHeight: tokens.components.feedCard.paywallMessageContainerHeight,
    paddingHorizontal: tokens.components.feedCard.paywallMessageContainerPaddingHorizontal,
    alignItems: 'center',
    gap: 1,
  },
  topContent: {
    padding: tokens.components.feedCard.paywallContentGap,
    minHeight: tokens.components.feedCard.paywallContentHeight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textIcon: {
    width: tokens.components.feedCard.paywallMessageWidth,
    minHeight: tokens.components.feedCard.paywallTextIconHeight,
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
