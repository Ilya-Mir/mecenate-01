import { StyleSheet } from 'react-native';

import { tokens } from '../../../../theme/tokens';

export const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: tokens.spacing[2],
    gap: tokens.spacing[3],
  },
  mainBlock: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: tokens.spacing[3],
  },
  labelsColumn: {
    flex: 1,
    gap: 2,
  },
  authorName: {
    ...tokens.typography.authorName,
    color: tokens.colors.content.primary,
  },
  text: {
    ...tokens.typography.commentBody,
    color: tokens.colors.content.primary,
  },
  likeSlot: {
    width: 35,
    height: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
  },
});
