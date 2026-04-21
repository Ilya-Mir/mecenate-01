import { StyleSheet } from 'react-native';

import { tokens } from '../../../../theme/tokens';

export const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: tokens.colors.background.page,
  },
  contentContainer: {
    flexGrow: 1,
    paddingHorizontal: 0,
    paddingTop: tokens.spacing[1],
    paddingBottom: tokens.spacing[8],
  },
  inlineError: {
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
