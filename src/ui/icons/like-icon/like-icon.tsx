import Svg, { Path } from 'react-native-svg';

import type { SvgIconProps } from '../types';

export interface LikeIconProps extends SvgIconProps {
  active?: boolean;
}

export function LikeIcon({
  size = 17,
  color = '#000000',
  active = false,
  ...props
}: LikeIconProps) {
  return (
    <Svg
      fill="none"
      height={size}
      viewBox="0 0 17 15"
      width={size}
      {...props}
    >
      {active ? (
        <Path
          d="M8.5 14.2L7.27 13.08C2.9 9.12 0 6.48 0 3.25C0 1.29 1.54 0 3.5 0C4.61 0 5.66 0.51 6.33 1.32L8.5 3.7L10.67 1.32C11.34 0.51 12.39 0 13.5 0C15.46 0 17 1.29 17 3.25C17 6.48 14.1 9.12 9.73 13.08L8.5 14.2Z"
          fill={color}
        />
      ) : (
        <Path
          d="M8.5 13.56L7.58 12.73C3.43 8.98 1 6.78 1 4.06C1 2.45 2.25 1.25 3.86 1.25C4.78 1.25 5.66 1.68 6.23 2.36L8.5 4.96L10.77 2.36C11.34 1.68 12.22 1.25 13.14 1.25C14.75 1.25 16 2.45 16 4.06C16 6.78 13.57 8.98 9.42 12.73L8.5 13.56Z"
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
        />
      )}
    </Svg>
  );
}
