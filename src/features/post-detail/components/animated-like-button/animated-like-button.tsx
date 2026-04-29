import * as Haptics from 'expo-haptics';
import { Platform, Pressable, StyleProp, StyleSheet, ViewStyle } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

import {
  actionButtonTokens,
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
      <LikeIcon color={palette.foreground} filled={active} />
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
    width: actionButtonTokens.width,
    height: actionButtonTokens.height,
    borderRadius: actionButtonTokens.radius,
    paddingLeft: actionButtonTokens.paddingLeft,
    paddingRight: actionButtonTokens.paddingRight,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: actionButtonTokens.gap,
  },
  label: {
    ...tokens.typography.actionLabel,
    textAlign: 'center',
  },
});
