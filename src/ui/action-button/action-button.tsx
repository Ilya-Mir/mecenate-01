import {
  Pressable,
  PressableStateCallbackType,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';

import {
  ActionButtonKind,
  ActionButtonVisualState,
  getActionButtonPalette,
} from '../../theme/components/action-button';
import { tokens } from '../../theme/tokens';
import { CommentIcon, LikeIcon } from '../icons';

interface ActionButtonProps {
  kind: ActionButtonKind;
  value: string;
  active?: boolean;
  disabled?: boolean;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

function resolveVisualState(
  interaction: PressableStateCallbackType,
  disabled: boolean,
): ActionButtonVisualState {
  const hovered = 'hovered' in interaction ? Boolean(interaction.hovered) : false;

  if (disabled) {
    return 'disabled';
  }

  if (interaction.pressed) {
    return 'pressed';
  }

  if (hovered) {
    return 'hover';
  }

  return 'default';
}

function ActionIcon({
  kind,
  color,
  filled,
}: {
  kind: ActionButtonKind;
  color: string;
  filled: boolean;
}) {
  if (kind === 'comment') {
    return <CommentIcon color={color} />;
  }

  return <LikeIcon color={color} filled={filled} />;
}

function ActionButtonContent({
  kind,
  value,
  active,
  color,
}: {
  kind: ActionButtonKind;
  value: string;
  active: boolean;
  color: string;
}) {
  return (
    <>
      <View style={styles.iconSlot}>
        <ActionIcon color={color} filled={kind === 'like' && active} kind={kind} />
      </View>
      <Text style={[styles.label, { color }]}>{value}</Text>
    </>
  );
}

export function ActionButton({
  kind,
  value,
  active = false,
  disabled = false,
  onPress,
  style,
}: ActionButtonProps) {
  if (!onPress) {
    const palette = getActionButtonPalette(kind, active, disabled ? 'disabled' : 'default');

    return (
      <View
        style={[
          styles.base,
          { backgroundColor: palette.background },
          style,
        ]}
      >
        <ActionButtonContent
          active={active}
          color={palette.foreground}
          kind={kind}
          value={value}
        />
      </View>
    );
  }

  return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled}
      onPress={onPress}
      style={(interaction) => {
        const state = resolveVisualState(interaction, disabled);
        const palette = getActionButtonPalette(kind, active, state);

        return [
          styles.base,
          { backgroundColor: palette.background },
          style,
        ];
      }}
    >
      {(interaction) => {
        const state = resolveVisualState(interaction, disabled);
        const palette = getActionButtonPalette(kind, active, state);

        return (
          <ActionButtonContent
            active={active}
            color={palette.foreground}
            kind={kind}
            value={value}
          />
        );
      }}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    width: tokens.components.actionButton.width,
    height: tokens.components.actionButton.height,
    borderRadius: tokens.components.actionButton.radius,
    paddingLeft: tokens.components.actionButton.paddingLeft,
    paddingRight: tokens.components.actionButton.paddingRight,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: tokens.components.actionButton.gap,
  },
  label: {
    ...tokens.components.actionButton.label,
    textAlign: 'center',
  },
  iconSlot: {
    width: tokens.components.actionButton.iconSlotSize,
    height: tokens.components.actionButton.iconSlotSize,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
