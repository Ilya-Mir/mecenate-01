import { StyleSheet } from 'react-native';

import { tokens } from '../../../../theme/tokens';

export const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingTop: tokens.spacing[4],
    paddingHorizontal: tokens.components.feedStateCard.paddingHorizontal,
  },
});
