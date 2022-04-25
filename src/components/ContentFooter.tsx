import React from 'react';
import {Dimensions, StyleSheet, Image, View} from 'react-native';
import { Svg, Path } from 'react-native-svg';
import { useTheme } from './Theme';

const {width} = Dimensions.get("window");
const viewBox = {
  width: width,
  height: 100,
}
const height = (100 * width) / viewBox.width;
const d = `M 0 0 H ${width} A 50 50 0 0 1 ${width-50} 50 H 50 A 50 50 0 0 0 0 100`;

interface ContentFooterProps {
};

const ContentFooter: React.FC<ContentFooterProps> = props => {
  const {children} = props;
  const theme = useTheme();

  return (
    <>
      <View style={{...StyleSheet.absoluteFillObject}}>
        <Image 
          source={require("../assets/pattern1.png")}
          style={{
            width,
            height: width * 24 / 32,
          }}
        />
        <Image 
          source={require("../assets/pattern2.png")}
          style={{
            width,
            height: width * 24 / 32,
          }}
        />
        <Image 
          source={require("../assets/pattern3.png")}
          style={{
            width,
            height: width * 24 / 32,
          }}
        />
      </View>
      {children}
      <Svg
        width={width}
        height={height}
        viewBox={[0, 0, viewBox.width, viewBox.height].join("")}
      >
        <Path fill={theme.colors.background} d={d} />
      </Svg>
    </>
  )
};

export default ContentFooter;
