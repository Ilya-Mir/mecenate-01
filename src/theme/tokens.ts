import { actionButtonTokens } from './components/action-button';
import { buttonTokens } from './components/button';
import { feedCardTokens } from './components/card';
import { feedStateCardTokens } from './components/state-card';
import { colors } from './foundations/colors';
import { fontFamilies } from './foundations/fonts';
import { radius } from './foundations/radius';
import { shadows } from './foundations/shadows';
import { spacing } from './foundations/spacing';
import { typography } from './foundations/typography';

export const tokens = {
  colors,
  fonts: fontFamilies,
  spacing,
  radius,
  typography,
  shadows,
  components: {
    button: buttonTokens,
    actionButton: actionButtonTokens,
    feedCard: feedCardTokens,
    feedStateCard: feedStateCardTokens,
  },
} as const;

export { manropeFontMap } from './foundations/fonts';
