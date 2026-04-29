export const colors = {
  static: {
    white: '#FFFFFF',
    black: '#101114',
  },
  background: {
    page: '#F5F8FD',
    card: '#FFFFFF',
    muted: '#EFF2F7',
    subtle: '#F2F4F8',
    skeleton: 'rgba(238, 239, 241, 0.8)',
  },
  content: {
    primary: '#111416',
    secondary: '#57626F',
    tertiary: '#B6BEC8',
    commentHeader: '#68727D',
    inputPlaceholder: '#A4AAB0',
    inverse: '#FFFFFF',
    inverseMuted: '#DFD0F5',
  },
  brand: {
    primary: '#6115CD',
    primaryHover: '#4E11A4',
    primaryDisabled: '#D5C9FF',
    primaryLoader: '#C0A1EB',
  },
  actionLike: {
    default: '#FF2B75',
    hover: '#EA276B',
    pressed: '#DE2465',
    disabled: '#FFBAD2',
    foreground: '#FFEAF1',
  },
  actionNeutral: {
    default: '#EFF2F7',
    hover: '#DDDDDD',
    pressed: '#D4D4D4',
    disabled: '#FFFFFF',
    foreground: '#57626F',
    foregroundDisabled: '#B6BEC8',
  },
  feedback: {
    danger: '#CC4D47',
    success: '#2DB884',
  },
  border: {
    subtle: '#E8ECEF',
  },
  overlay: {
    strong: 'rgba(14, 16, 26, 0.58)',
    medium: 'rgba(14, 16, 26, 0.32)',
    paywall: 'rgba(0, 0, 0, 0.5)',
  },
} as const;
