import { StyleSheet } from 'react-native';

import { tokens } from '../../../../theme/tokens';

export const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: tokens.colors.background.page,
  },
  screenContent: {
    flex: 1,
  },
  listContainer: {
    flex: 1,
    position: 'relative',
  },
  contentContainer: {
    flexGrow: 1,
    paddingHorizontal: 0,
    paddingTop: 0,
    paddingBottom: tokens.spacing[8],
  },
  filterWrapper: {
    height: 38,
    paddingHorizontal: tokens.spacing[4],
    marginBottom: tokens.spacing[3],
  },
  filterBar: {
    height: 38,
    flexDirection: 'row',
    alignItems: 'stretch',
    borderRadius: tokens.radius.pill,
    backgroundColor: tokens.colors.background.card,
    borderWidth: 1,
    borderColor: tokens.colors.border.subtle,
    overflow: 'hidden',
  },
  filterTab: {
    height: 38,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    borderRadius: tokens.radius.pill,
  },
  filterTabActive: {
    backgroundColor: tokens.colors.brand.primary,
  },
  filterLabel: {
    fontFamily: tokens.fonts.medium,
    fontSize: 13,
    lineHeight: 18,
    color: tokens.colors.content.secondary,
    textAlign: 'center',
  },
  filterLabelActive: {
    fontFamily: tokens.fonts.bold,
    color: tokens.colors.content.inverse,
  },
  tabTransitionOverlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(245, 248, 253, 0.6)',
  },
  tabTransitionLabel: {
    marginTop: tokens.spacing[2],
    ...tokens.typography.body,
    color: tokens.colors.content.primary,
  },
  inlineError: {
    marginHorizontal: tokens.spacing[4],
    marginBottom: tokens.spacing[4],
    borderRadius: tokens.radius.lg,
    padding: tokens.spacing[4],
    backgroundColor: '#FFF0EB',
  },
  inlineErrorTitle: {
    ...tokens.typography.bodyStrong,
    color: tokens.colors.feedback.danger,
  },
  inlineErrorText: {
    ...tokens.typography.caption,
    color: tokens.colors.feedback.danger,
    marginTop: tokens.spacing[2],
  },
  loadingState: {
    paddingBottom: tokens.spacing[2],
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: tokens.spacing[7],
    paddingVertical: tokens.spacing[10],
  },
  emptyTitle: {
    ...tokens.typography.screenTitle,
    color: tokens.colors.content.primary,
    textAlign: 'center',
  },
  emptyDescription: {
    ...tokens.typography.body,
    color: tokens.colors.content.secondary,
    marginTop: tokens.spacing[3],
    textAlign: 'center',
  },
  footerLoader: {
    paddingVertical: tokens.spacing[5],
  },
  footerSpacer: {
    height: tokens.spacing[2],
  },
});
