import Svg, { Path } from 'react-native-svg';

import type { SvgIconProps } from '../types';

export function CommentIcon({
  size = 15,
  color = '#000000',
  ...props
}: SvgIconProps) {
  return (
    <Svg
      fill="none"
      height={size}
      viewBox="0 0 15 15"
      width={size}
      {...props}
    >
      <Path
        d="M7.5 1C3.91 1 1 3.48 1 6.53C1 8.18 1.87 9.66 3.25 10.67V14L5.79 12.57C6.33 12.67 6.9 12.72 7.5 12.72C11.09 12.72 14 10.24 14 7.19C14 4.14 11.09 1 7.5 1Z"
        fill={color}
      />
    </Svg>
  );
}
