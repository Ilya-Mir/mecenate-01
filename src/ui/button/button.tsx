import {
  Pressable,
  PressableStateCallbackType,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';

import {
  ButtonVisualState,
  getPrimaryButtonPalette,
} from '../../theme/components/button';
import { tokens } from '../../theme/tokens';
import { Spinner } from '../spinner/spinner';

interface ButtonProps {
  label: string;
  onPress?: () => void;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  style?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
}

function resolveVisualState(
  interaction: PressableStateCallbackType,
  disabled: boolean,
  loading: boolean,
): ButtonVisualState {
  const hovered = 'hovered' in interaction ? Boolean(interaction.hovered) : false;

  if (disabled) {
    return 'disabled';
  }

  if (loading) {
    return 'loading';
  }

  if (interaction.pressed) {
    return 'pressed';
  }

  if (hovered) {
    return 'hover';
  }

  return 'default';
}

export function Button({
  label,
  onPress,
  disabled = false,
  loading = false,
  fullWidth = false,
  style,
  labelStyle,
}: ButtonProps) {
  const isDisabled = disabled || loading;

  const renderContent = (state: ButtonVisualState) => {
    const palette = getPrimaryButtonPalette(state);

    if (loading) {
      return (
        <Spinner
          color={tokens.colors.brand.primaryLoader}
          size={tokens.components.button.spinnerSize}
          strokeWidth={tokens.components.button.spinnerStrokeWidth}
        />
      );
    }

    return (
      <Text style={[styles.label, { color: palette.foreground }, labelStyle]}>
        {label}
      </Text>
    );
  };

  if (!onPress) {
    const state = isDisabled ? 'disabled' : 'default';
    const palette = getPrimaryButtonPalette(state);

    return (
      <View
        style={[
          styles.base,
          fullWidth ? styles.fullWidth : undefined,
          { backgroundColor: palette.background },
          style,
        ]}
      >
        {renderContent(state)}
      </View>
    );
  }

  return (
    <Pressable
      accessibilityRole="button"
      disabled={isDisabled}
      onPress={onPress}
      style={(interaction) => {
        const state = resolveVisualState(interaction, isDisabled, loading);
        const palette = getPrimaryButtonPalette(state);

        return [
          styles.base,
          fullWidth ? styles.fullWidth : undefined,
          { backgroundColor: palette.background },
          style,
        ];
      }}
    >
      {(interaction) => {
        const state = resolveVisualState(interaction, isDisabled, loading);
        return renderContent(state);
      }}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    minHeight: tokens.components.button.height,
    borderRadius: tokens.components.button.radius,
    paddingHorizontal: tokens.components.button.paddingHorizontal,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fullWidth: {
    width: '100%',
  },
  label: {
    ...tokens.components.button.label,
    textAlign: 'center',
  },
});
