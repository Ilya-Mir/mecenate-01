import { StyleSheet } from 'react-native';

import { tokens } from '../../../../theme/tokens';

export const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    paddingVertical: tokens.spacing[4],
    paddingHorizontal: tokens.components.feedStateCard.paddingHorizontal,
  },
});
