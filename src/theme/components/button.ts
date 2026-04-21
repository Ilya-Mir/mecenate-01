import { colors } from '../foundations/colors';
import { radius } from '../foundations/radius';
import { typography } from '../foundations/typography';

export type ButtonVisualState =
  | 'default'
  | 'hover'
  | 'pressed'
  | 'loading'
  | 'disabled';

export const buttonTokens = {
  height: 42,
  radius: radius.md,
  paddingHorizontal: 32,
  gap: 8,
  spinnerSize: 26,
  spinnerStrokeWidth: 2,
  label: typography.buttonLabel,
} as const;

const primaryButtonPalette = {
  default: {
    background: colors.brand.primary,
    foreground: colors.content.inverse,
  },
  hover: {
    background: colors.brand.primaryHover,
    foreground: colors.content.inverseMuted,
  },
  pressed: {
    background: colors.brand.primaryHover,
    foreground: colors.content.inverse,
  },
  loading: {
    background: colors.brand.primaryHover,
    foreground: colors.content.inverseMuted,
  },
  disabled: {
    background: colors.brand.primaryDisabled,
    foreground: colors.content.inverse,
  },
} as const;

export function getPrimaryButtonPalette(state: ButtonVisualState) {
  return primaryButtonPalette[state];
}
