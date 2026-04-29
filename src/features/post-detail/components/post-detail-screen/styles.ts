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
  topBar: {
    minHeight: 52,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: tokens.spacing[4],
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: tokens.radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: tokens.colors.background.card,
  },
  backButtonLabel: {
    ...tokens.typography.cardTitle,
    color: tokens.colors.content.primary,
  },
  headerTitle: {
    ...tokens.typography.cardTitle,
    color: tokens.colors.content.primary,
    textAlign: 'center',
    flex: 1,
  },
  topBarSpacer: {
    width: 40,
  },
  contentContainer: {
    paddingBottom: tokens.spacing[8],
    gap: tokens.spacing[3],
  },
  loadingState: {
    flex: 1,
    gap: tokens.spacing[4],
    padding: tokens.spacing[4],
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
  postCard: {
    marginHorizontal: 0,
    paddingTop: tokens.spacing[3],
    gap: tokens.spacing[4],
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
  authorMeta: {
    ...tokens.typography.caption,
    color: tokens.colors.content.secondary,
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
    gap: tokens.spacing[3],
    paddingHorizontal: tokens.components.feedCard.paddingHorizontal,
    paddingBottom: tokens.spacing[4],
  },
  title: {
    ...tokens.typography.screenTitle,
    color: tokens.colors.content.primary,
  },
  bodyText: {
    ...tokens.typography.postPreview,
    color: tokens.colors.content.primary,
  },
  actionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: tokens.spacing[2],
    paddingTop: tokens.spacing[1],
  },
  commentsCard: {
    marginHorizontal: 0,
    padding: tokens.spacing[4],
    gap: tokens.spacing[3],
  },
  sectionTitle: {
    ...tokens.typography.cardTitle,
    color: tokens.colors.content.primary,
  },
  commentInputBlock: {
    gap: tokens.spacing[3],
  },
  commentInput: {
    minHeight: 88,
    borderRadius: tokens.radius.lg,
    borderWidth: 1,
    borderColor: tokens.colors.border.subtle,
    padding: tokens.spacing[3],
    ...tokens.typography.body,
    color: tokens.colors.content.primary,
    backgroundColor: tokens.colors.background.subtle,
    textAlignVertical: 'top',
  },
  commentsLoading: {
    gap: tokens.spacing[2],
  },
  emptyComments: {
    ...tokens.typography.body,
    color: tokens.colors.content.secondary,
    textAlign: 'center',
    paddingVertical: tokens.spacing[5],
  },
});
