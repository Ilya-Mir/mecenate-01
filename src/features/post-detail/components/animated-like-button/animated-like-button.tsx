import * as Haptics from 'expo-haptics';
import { Platform, Pressable, StyleProp, StyleSheet, Text, ViewStyle } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

import {
  getActionButtonPalette,
} from '../../../../theme/components/action-button';
import { tokens } from '../../../../theme/tokens';
import { LikeIcon } from '../../../../ui/icons';

interface AnimatedLikeButtonProps {
  active: boolean;
  count: string;
  disabled?: boolean;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
}

export function AnimatedLikeButton({
  active,
  count,
  disabled = false,
  onPress,
  style,
}: AnimatedLikeButtonProps) {
  const scale = useSharedValue(1);
  const palette = getActionButtonPalette(
    'like',
    active,
    disabled ? 'disabled' : 'default',
  );

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePress = () => {
    scale.value = withSequence(
      withTiming(1.12, { duration: 120 }),
      withTiming(1, { duration: 160 }),
    );

    if (Platform.OS !== 'web') {
      void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }

    onPress();
  };

  return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled}
      onPress={handlePress}
      style={[
        styles.button,
        { backgroundColor: palette.background },
        style,
      ]}
    >
      <LikeIcon active={active} color={palette.foreground} />
      <Animated.Text
        style={[
          styles.label,
          { color: palette.foreground },
          animatedStyle,
        ]}
      >
        {count}
      </Animated.Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    minWidth: 92,
    height: 42,
    borderRadius: tokens.radius.pill,
    paddingHorizontal: tokens.spacing[4],
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: tokens.spacing[2],
  },
  label: {
    ...tokens.typography.actionLabel,
    fontVariant: ['tabular-nums'],
    textAlign: 'center',
  },
});
