import { StyleSheet } from 'react-native';

import { tokens } from '../../../../theme/tokens';

export const styles = StyleSheet.create({
  card: {
    minHeight: tokens.components.feedCard.minHeight,
    marginBottom: tokens.spacing[3],
    paddingTop: tokens.components.feedCard.paddingVertical,
    paddingBottom: tokens.components.feedCard.paddingVertical,
    gap: tokens.spacing[3],
  },
  paidCard: {
    minHeight: tokens.components.feedCard.paidMinHeight,
  },
  pressableContent: {
    gap: tokens.components.feedCard.sectionGap,
  },
  header: {
    height: tokens.components.feedCard.headerHeight,
    flexDirection: 'row',
    alignItems: 'center',
    gap: tokens.components.feedCard.headerGap,
    paddingHorizontal: tokens.components.feedCard.paddingHorizontal,
  },
  authorTextBlock: {
    flex: 1,
    justifyContent: 'center',
  },
  authorNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: tokens.spacing[1],
  },
  coverFrame: {
    position: 'relative',
    height: tokens.components.feedCard.mediaHeight,
  },
  mediaSection: {
    gap: tokens.components.feedCard.mediaGap,
  },
  authorName: {
    ...tokens.typography.authorName,
    color: tokens.colors.content.primary,
    flexShrink: 1,
  },
  coverImage: {
    width: '100%',
    height: tokens.components.feedCard.mediaHeight,
    backgroundColor: tokens.colors.background.subtle,
  },
  coverFallback: {
    height: tokens.components.feedCard.mediaHeight,
    padding: tokens.spacing[5],
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: tokens.colors.background.subtle,
  },
  coverFallbackLabel: {
    ...tokens.typography.cardTitle,
    color: tokens.colors.content.secondary,
    textAlign: 'center',
  },
  body: {
    gap: tokens.components.feedCard.contentGap,
    paddingTop: tokens.components.feedCard.contentPaddingTop,
    paddingHorizontal: tokens.components.feedCard.paddingHorizontal,
  },
  paidBody: {
    paddingTop: tokens.spacing[2],
  },
  title: {
    ...tokens.typography.cardTitle,
    color: tokens.colors.content.primary,
  },
  preview: {
    ...tokens.typography.postPreview,
    color: tokens.colors.content.primary,
  },
  previewContainer: {
    width: '100%',
  },
  actionsRow: {
    height: tokens.components.feedCard.actionRowHeight,
    flexDirection: 'row',
    alignItems: 'center',
    gap: tokens.components.feedCard.actionRowGap,
    paddingHorizontal: tokens.components.feedCard.paddingHorizontal,
  },
});
