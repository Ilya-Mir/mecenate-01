import { Platform } from 'react-native';

const androidCardShadow = Platform.select({
  android: {
    elevation: 4,
  },
  default: {},
});

const androidSoftShadow = Platform.select({
  android: {
    elevation: 2,
  },
  default: {},
});

export const shadows = {
  card: {
    shadowColor: '#101114',
    shadowOpacity: 0.06,
    shadowRadius: 16,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    ...androidCardShadow,
  },
  soft: {
    shadowColor: '#101114',
    shadowOpacity: 0.04,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    ...androidSoftShadow,
  },
} as const;
