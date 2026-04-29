import { StyleSheet } from 'react-native';

import { tokens } from '../../../../theme/tokens';

export const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: tokens.colors.background.page,
  },
  keyboardView: {
    flex: 1,
  },
  swipeRoot: {
    flex: 1,
    position: 'relative',
  },
  mainColumn: {
    flex: 1,
  },
  scroll: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: tokens.spacing[4],
    paddingHorizontal: 0,
  },
  loadingState: {
    flex: 1,
    position: 'relative',
    gap: tokens.spacing[3],
    paddingHorizontal: tokens.spacing[4],
    paddingBottom: tokens.spacing[4],
  },
  loadingPostCard: {
    marginHorizontal: 0,
    paddingTop: tokens.components.feedCard.paddingVertical,
    gap: tokens.components.feedCard.sectionGap,
  },
  loadingHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: tokens.components.feedCard.headerGap,
    paddingHorizontal: tokens.components.feedCard.paddingHorizontal,
  },
  loadingHeaderText: {
    flex: 1,
    gap: tokens.spacing[2],
  },
  loadingBody: {
    gap: tokens.components.feedCard.mediaGap,
    paddingHorizontal: tokens.components.feedCard.paddingHorizontal,
    paddingBottom: tokens.components.feedCard.paddingVertical,
  },
  loadingActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: tokens.components.feedCard.actionRowGap,
    paddingTop: tokens.spacing[1],
  },
  loadingCommentsBlock: {
    paddingHorizontal: tokens.components.feedCard.paddingHorizontal,
    paddingBottom: tokens.components.feedCard.paddingVertical,
    gap: tokens.spacing[2],
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingLabel: {
    marginTop: tokens.spacing[2],
    ...tokens.typography.body,
    color: tokens.colors.content.primary,
  },
  errorState: {
    flex: 1,
    gap: tokens.spacing[4],
    alignItems: 'center',
    justifyContent: 'center',
    padding: tokens.spacing[4],
  },
  errorTitle: {
    ...tokens.typography.stateCardTitle,
    color: tokens.colors.content.primary,
    textAlign: 'center',
  },
  detailCard: {
    marginHorizontal: 0,
    paddingTop: tokens.components.feedCard.paddingVertical,
    paddingBottom: tokens.components.feedCard.paddingVertical,
    gap: tokens.components.feedCard.sectionGap,
  },
  detailInner: {
    gap: tokens.components.feedCard.sectionGap,
  },
  mediaColumn: {
    gap: tokens.components.feedCard.mediaGap,
  },
  scrollBackCapture: {
    flex: 1,
  },
  authorRow: {
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
  authorName: {
    ...tokens.typography.authorName,
    color: tokens.colors.content.primary,
  },
  coverFrame: {
    position: 'relative',
    minHeight: tokens.components.feedCard.mediaHeight,
    backgroundColor: tokens.colors.background.subtle,
    overflow: 'hidden',
  },
  coverImage: {
    width: '100%',
    height: tokens.components.feedCard.mediaHeight,
  },
  coverFallback: {
    height: tokens.components.feedCard.mediaHeight,
    alignItems: 'center',
    justifyContent: 'center',
    padding: tokens.spacing[5],
    backgroundColor: tokens.colors.background.subtle,
  },
  coverFallbackLabel: {
    ...tokens.typography.cardTitle,
    color: tokens.colors.content.secondary,
    textAlign: 'center',
  },
  paidOverlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    padding: tokens.spacing[6],
    backgroundColor: tokens.colors.overlay.paywall,
  },
  paidOverlayText: {
    ...tokens.typography.paywallMessage,
    color: tokens.colors.content.inverse,
    textAlign: 'center',
  },
  postBody: {
    gap: tokens.components.feedCard.mediaGap,
    paddingHorizontal: tokens.components.feedCard.paddingHorizontal,
    paddingBottom: tokens.components.feedCard.paddingVertical,
  },
  title: {
    ...tokens.typography.cardTitle,
    color: tokens.colors.content.primary,
  },
  previewContainer: {
    width: '100%',
  },
  preview: {
    ...tokens.typography.postPreview,
    color: tokens.colors.content.primary,
  },
  actionsRow: {
    height: tokens.components.feedCard.actionRowHeight,
    flexDirection: 'row',
    alignItems: 'center',
    gap: tokens.components.feedCard.actionRowGap,
  },
  commentsSection: {
    gap: tokens.spacing[2],
    paddingHorizontal: tokens.components.feedCard.paddingHorizontal,
    paddingBottom: tokens.components.feedCard.paddingVertical,
  },
  commentsHeaderRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    width: '100%',
  },
  commentsCountLabel: {
    ...tokens.typography.commentsSectionTitle,
    color: tokens.colors.content.commentHeader,
  },
  sortLink: {
    ...tokens.typography.postPreviewLink,
    color: tokens.colors.brand.primary,
  },
  commentsLoading: {
    gap: tokens.spacing[2],
  },
  nextPageLoader: {
    paddingVertical: tokens.spacing[2],
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyComments: {
    ...tokens.typography.body,
    color: tokens.colors.content.secondary,
    textAlign: 'center',
    paddingVertical: tokens.spacing[5],
  },
  composer: {
    marginTop: tokens.components.postDetailComposer.gapAboveComposer,
    paddingHorizontal: tokens.components.postDetailComposer.paddingHorizontal,
    paddingTop: tokens.components.postDetailComposer.paddingTop,
    backgroundColor: tokens.colors.background.card,
    overflow: 'hidden',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: tokens.colors.border.subtle,
  },
  composerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: tokens.components.postDetailComposer.rowGap,
  },
  composerInput: {
    flex: 1,
    minWidth: 0,
    height: tokens.components.postDetailComposer.inputHeight,
    borderRadius: tokens.components.postDetailComposer.inputBorderRadius,
    borderWidth: tokens.components.postDetailComposer.inputBorderWidth,
    borderColor: tokens.colors.background.muted,
    paddingVertical: tokens.components.postDetailComposer.inputPaddingVertical,
    paddingHorizontal: tokens.components.postDetailComposer.inputPaddingHorizontal,
    ...tokens.typography.postPreview,
    fontVariant: ['tabular-nums', 'lining-nums'],
    color: tokens.colors.content.primary,
    backgroundColor: tokens.colors.background.card,
  },
  sendButton: {
    width: tokens.components.postDetailComposer.sendButtonSize,
    height: tokens.components.postDetailComposer.sendButtonSize,
    padding: tokens.components.postDetailComposer.sendButtonPadding,
    borderRadius: tokens.radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
