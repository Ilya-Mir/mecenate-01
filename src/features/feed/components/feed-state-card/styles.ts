import { StyleSheet } from 'react-native';

import { tokens } from '../../../../theme/tokens';

export const styles = StyleSheet.create({
  card: {
    marginTop: tokens.spacing[4],
    minHeight: tokens.components.feedStateCard.minHeight,
    paddingHorizontal: tokens.components.feedStateCard.paddingHorizontal,
    paddingVertical: tokens.components.feedStateCard.paddingVertical,
    gap: tokens.components.feedStateCard.gap,
  },
  cardFullHeight: {
    flex: 1,
    justifyContent: 'center',
    minHeight: tokens.components.feedStateCard.minHeight,
  },
  header: {
    height: tokens.components.feedStateCard.headerHeight,
    flexDirection: 'row',
    alignItems: 'center',
    gap: tokens.components.feedStateCard.headerGap,
    alignSelf: 'stretch',
  },
  authorLabel: {
    ...tokens.typography.stateAuthorLabel,
    color: tokens.colors.content.primary,
  },
  illustrationFrame: {
    width: tokens.components.feedStateCard.illustrationSize,
    height: tokens.components.feedStateCard.illustrationSize,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  title: {
    ...tokens.typography.stateCardTitle,
    color: tokens.colors.content.primary,
    textAlign: 'center',
    alignSelf: 'stretch',
  },
});
