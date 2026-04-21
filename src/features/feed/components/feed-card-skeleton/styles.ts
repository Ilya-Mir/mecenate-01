import { StyleSheet } from 'react-native';

import { tokens } from '../../../../theme/tokens';

export const styles = StyleSheet.create({
  card: {
    minHeight: tokens.components.feedCard.minHeight,
    marginBottom: tokens.spacing[3],
    paddingTop: tokens.components.feedCard.paddingVertical,
    paddingBottom: tokens.components.feedCard.paddingVertical,
    gap: tokens.components.feedCard.sectionGap,
  },
  header: {
    height: tokens.components.feedCard.headerHeight,
    flexDirection: 'row',
    alignItems: 'center',
    gap: tokens.components.feedCard.headerGap,
    paddingHorizontal: tokens.components.feedCard.paddingHorizontal,
  },
  mediaSection: {
    gap: tokens.components.feedCard.mediaGap,
  },
  media: {
    alignSelf: 'stretch',
  },
  content: {
    gap: tokens.components.feedCard.contentGap,
    paddingTop: tokens.components.feedCard.contentPaddingTop,
    paddingHorizontal: tokens.components.feedCard.paddingHorizontal,
  },
  actions: {
    height: tokens.components.feedCard.actionRowHeight,
    flexDirection: 'row',
    alignItems: 'center',
    gap: tokens.components.feedCard.actionRowGap,
    paddingHorizontal: tokens.components.feedCard.paddingHorizontal,
  },
});
