import { colors } from '../foundations/colors';
import { radius } from '../foundations/radius';
import { typography } from '../foundations/typography';

export type ActionButtonKind = 'like' | 'comment';
export type ActionButtonVisualState =
  | 'default'
  | 'hover'
  | 'pressed'
  | 'disabled';

export const actionButtonTokens = {
  height: 36,
  width: 63,
  paddingLeft: 6,
  paddingRight: 12,
  gap: 4,
  iconSlotSize: 24,
  radius: radius.pill,
  label: typography.actionLabel,
} as const;

const neutralPalette = {
  default: {
    background: colors.actionNeutral.default,
    foreground: colors.actionNeutral.foreground,
  },
  hover: {
    background: colors.actionNeutral.hover,
    foreground: colors.actionNeutral.foreground,
  },
  pressed: {
    background: colors.actionNeutral.pressed,
    foreground: colors.actionNeutral.foreground,
  },
  disabled: {
    background: colors.actionNeutral.disabled,
    foreground: colors.actionNeutral.foregroundDisabled,
  },
} as const;

const activeLikePalette = {
  default: {
    background: colors.actionLike.default,
    foreground: colors.actionLike.foreground,
  },
  hover: {
    background: colors.actionLike.hover,
    foreground: colors.actionLike.foreground,
  },
  pressed: {
    background: colors.actionLike.pressed,
    foreground: colors.actionLike.foreground,
  },
  disabled: {
    background: colors.actionLike.disabled,
    foreground: colors.actionLike.foreground,
  },
} as const;

export function getActionButtonPalette(
  kind: ActionButtonKind,
  active: boolean,
  state: ActionButtonVisualState,
) {
  if (kind === 'like' && active) {
    return activeLikePalette[state];
  }

  return neutralPalette[state];
}
