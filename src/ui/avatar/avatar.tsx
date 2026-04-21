import { Image, StyleSheet, Text, View } from 'react-native';

import { tokens } from '../../theme/tokens';
import { canRenderRemoteImage, getInitials } from '../../utils/media';

interface AvatarProps {
  name: string;
  uri?: string | null;
  size?: number;
}

export function Avatar({ name, uri, size = 32 }: AvatarProps) {
  const initials = getInitials(name);
  const canShowImage = canRenderRemoteImage(uri);
  const borderRadius = size / 2;

  if (canShowImage && uri) {
    return (
      <Image
        source={{ uri }}
        style={[
          styles.image,
          {
            width: size,
            height: size,
            borderRadius,
          },
        ]}
      />
    );
  }

  return (
    <View
      style={[
        styles.fallback,
        {
          width: size,
          height: size,
          borderRadius,
        },
      ]}
    >
      <Text style={styles.label}>{initials}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    backgroundColor: tokens.colors.background.subtle,
  },
  fallback: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: tokens.colors.brand.primary,
  },
  label: {
    ...tokens.typography.captionStrong,
    color: tokens.colors.content.inverse,
  },
});
