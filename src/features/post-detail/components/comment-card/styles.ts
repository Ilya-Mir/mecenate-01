import { StyleSheet } from 'react-native';

import { tokens } from '../../../../theme/tokens';

export const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    gap: tokens.spacing[3],
    paddingVertical: tokens.spacing[3],
    borderBottomWidth: 1,
    borderBottomColor: tokens.colors.border.subtle,
  },
  body: {
    flex: 1,
    gap: tokens.spacing[1],
  },
  authorName: {
    ...tokens.typography.bodyStrong,
    color: tokens.colors.content.primary,
  },
  text: {
    ...tokens.typography.body,
    color: tokens.colors.content.primary,
  },
});
