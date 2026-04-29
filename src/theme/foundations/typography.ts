import { TextStyle } from 'react-native';

import { fontFamilies } from './fonts';

const createTextStyle = (
  fontFamily: string,
  fontSize: number,
  lineHeight: number,
  extras?: TextStyle,
): TextStyle => ({
  fontFamily,
  fontSize,
  lineHeight,
  ...extras,
});

export const typography = {
  buttonLabel: createTextStyle(fontFamilies.semibold, 15, 26),
  actionLabel: createTextStyle(fontFamilies.bold, 13, 18, {
    fontVariant: ['tabular-nums'],
  }),
  screenTitle: createTextStyle(fontFamilies.bold, 22, 28, {
    letterSpacing: -0.3,
  }),
  stateCardTitle: createTextStyle(fontFamilies.bold, 18, 26),
  cardTitle: createTextStyle(fontFamilies.bold, 18, 26),
  body: createTextStyle(fontFamilies.medium, 13, 18),
  bodyStrong: createTextStyle(fontFamilies.semibold, 13, 18),
  paywallMessage: createTextStyle(fontFamilies.semibold, 15, 20),
  postPreview: createTextStyle(fontFamilies.medium, 15, 20),
  postPreviewLink: createTextStyle(fontFamilies.medium, 15, 20),
  caption: createTextStyle(fontFamilies.medium, 12, 16),
  captionStrong: createTextStyle(fontFamilies.semibold, 12, 16),
  authorName: createTextStyle(fontFamilies.bold, 15, 20),
  commentBody: createTextStyle(fontFamilies.medium, 14, 20, {
    fontVariant: ['tabular-nums'],
  }),
  commentsSectionTitle: createTextStyle(fontFamilies.semibold, 15, 20, {
    fontVariant: ['tabular-nums'],
  }),
  stateAuthorLabel: createTextStyle(fontFamilies.bold, 15, 20),
  eyebrow: createTextStyle(fontFamilies.semibold, 13, 18, {
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  }),
} as const;
