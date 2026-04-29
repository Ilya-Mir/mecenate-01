import Svg, { Path } from 'react-native-svg';

import type { SvgIconProps } from '../types';

export interface LikeIconProps extends SvgIconProps {
  filled?: boolean;
}

export function LikeIcon({
  size = 24,
  color = '#000000',
  filled = false,
  ...props
}: LikeIconProps) {
  return (
    <Svg
      fill="none"
      height={size}
      viewBox="0 0 24 24"
      width={size}
      {...props}
    >
      <Path
        d="M12 19.5L10.8147 18.421C6.6049 14.6035 3.82561 12.0777 3.82561 8.99591C3.82561 6.47003 5.80381 4.5 8.32153 4.5C9.74387 4.5 11.109 5.16213 12 6.20027C12.891 5.16213 14.2561 4.5 15.6785 4.5C18.1962 4.5 20.1744 6.47003 20.1744 8.99591C20.1744 12.0777 17.3951 14.6035 13.1853 18.421L12 19.5Z"
        fill={filled ? color : 'none'}
        stroke={filled ? 'none' : color}
        strokeLinejoin="round"
        strokeWidth={1.8}
      />
    </Svg>
  );
}
