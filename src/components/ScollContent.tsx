import React from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import { Svg, Path, Defs, ClipPath, Image } from 'react-native-svg';
import { Box, useTheme } from './Theme';

const {width} = Dimensions.get("window");
const viewBox = {
  width: width,
  height: 100,
}
const height = (100 * width) / viewBox.width;
// const d = `M 0 0 H ${width} A 50 50 0 0 1 ${width-50} 50 H 50 A 50 50 0 0 0 0 100`;
const d = `M 0 100 A 50 50 0 0 1 50 50 H ${width-50} A 50 50 0 0 0 ${width} 0 V 100`

interface ScrollContentProps {
};

const ScrollContent: React.FC<ScrollContentProps> = props => {
  const {children} = props;
  const theme = useTheme();

  return (
    <Box flex={1}>
      {children}
      <Svg
        style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}
        width={width}
        height={height}
        viewBox={[0, 0, viewBox.width, viewBox.height].join("")}
      >
        <Defs>
          <ClipPath id="clip">
            <Path fill={theme.colors.background} d={d} />
          </ClipPath>
        </Defs>
        <Image
          x="0%"
          y="0%"
          width="100%"
          height="100%"
          preserveAspectRatio='xMidYmid slice'
          href={require("../assets/pattern1.png")}
          clipPath="url(#clip)"
        />
      </Svg>
    </Box>
  )
};

export default ScrollContent;
