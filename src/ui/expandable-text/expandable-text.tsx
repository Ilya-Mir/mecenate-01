import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useState } from 'react';
import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  TextLayoutEventData,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';

import { tokens } from '../../theme/tokens';

interface ExpandableTextProps {
  text: string;
  collapsedLines?: number;
  buttonLabel?: string;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

export function ExpandableText({
  text,
  collapsedLines = 2,
  buttonLabel = 'Показать еще',
  style,
  textStyle,
}: ExpandableTextProps) {
  const [expanded, setExpanded] = useState(false);
  const [isExpandable, setIsExpandable] = useState(false);
  const [measured, setMeasured] = useState(false);

  useEffect(() => {
    setExpanded(false);
    setIsExpandable(false);
    setMeasured(false);
  }, [collapsedLines, text]);

  const handleMeasure = ({
    nativeEvent,
  }: {
    nativeEvent: TextLayoutEventData;
  }) => {
    if (measured) {
      return;
    }

    setMeasured(true);
    setIsExpandable(nativeEvent.lines.length > collapsedLines);
  };

  return (
    <View style={[styles.container, style]}>
      <Text
        numberOfLines={expanded ? undefined : collapsedLines}
        style={[styles.text, textStyle]}
      >
        {text}
      </Text>

      {!measured ? (
        <Text onTextLayout={handleMeasure} style={[styles.measureText, textStyle]}>
          {text}
        </Text>
      ) : null}

      {isExpandable && !expanded ? (
        <Pressable
          accessibilityRole="button"
          onPress={() => {
            setExpanded(true);
          }}
          style={styles.overlayButton}
        >
          <LinearGradient
            colors={['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 0.8)', '#FFFFFF']}
            end={{ x: 1, y: 0.5 }}
            start={{ x: 0, y: 0.5 }}
            style={styles.fade}
          />

          <View style={styles.buttonLabelWrap}>
            <Text numberOfLines={1} style={styles.buttonLabel}>
              {buttonLabel}
            </Text>
          </View>
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    minHeight: tokens.components.feedCard.previewCollapsedHeight,
    width: '100%',
  },
  text: {
    ...tokens.typography.postPreview,
    color: tokens.colors.content.primary,
  },
  measureText: {
    ...tokens.typography.postPreview,
    color: tokens.colors.content.primary,
    position: 'absolute',
    left: 0,
    right: 0,
    opacity: 0,
    zIndex: -1,
    pointerEvents: 'none',
  },
  overlayButton: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    width: tokens.components.feedCard.previewOverlayWidth,
    height: tokens.components.feedCard.previewButtonHeight,
    flexDirection: 'row',
    alignItems: 'center',
  },
  fade: {
    width: tokens.components.feedCard.previewFadeWidth,
    height: tokens.components.feedCard.previewButtonHeight,
  },
  buttonLabelWrap: {
    width: tokens.components.feedCard.previewButtonWidth,
    height: tokens.components.feedCard.previewButtonHeight,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: tokens.colors.background.card,
  },
  buttonLabel: {
    ...tokens.typography.postPreviewLink,
    color: tokens.colors.brand.primary,
    textAlign: 'center',
  },
});
