import React, {useState} from 'react';
import {Dimensions} from 'react-native';
import { BorderlessButton, RectButton } from 'react-native-gesture-handler';
import { Box, Text, useTheme } from '../../components/Theme';
import {
  useTransition,
} from "react-native-redash/lib/module/v1";
import Animated, { interpolate, useAnimatedStyle, withTiming, interpolateColor, multiply } from 'react-native-reanimated';
import { mix } from 'react-native-redash';

const {width, height} = Dimensions.get("window");

export interface Tab {
  id: string;
  title: string;
}

interface TabsProps {
  tabs: Tab[],
};

const Tabs: React.FC<TabsProps> = props => {
  const {tabs, children} = props;
  const [index, setIndex] = useState(0);
  const theme = useTheme();

  const selectedTab = tabs[index];
  const transition = useTransition(index);
  const translateX = mix(transition, width * 0.25, width * 0.75);

  
  const backgroundColor = interpolateColor(index, [0, 1], ['rgba(244,198,45,1)', 'rgba(240,141,151,1)']);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      backgroundColor,
      transform: [
        {
          translateX: withTiming(interpolate(index, [0, 1], [width * 0.25, width * 0.75])),
        },
      ],
    };
  });

  return (
    <Box flex={1}>
      <Box flexDirection="row">
        {tabs.map((t, i) => (
          <BorderlessButton style={{ flex: 1 }} key={t.id} onPress={() => setIndex(i)}>
            <Box padding="m" paddingBottom="m">
              <Text variant="title3" textAlign="center">{t.title}</Text>
            </Box>
          </BorderlessButton>
        ))}
        <Animated.View
          style={[{ 
            position: "absolute",
            left: 0,
            bottom: 0,
            width: 10,
            height: 10,
            borderRadius: 5,
          }, animatedStyles]}
        />
      </Box>
      <Animated.View style={{
        flex: 1,
        backgroundColor: 'white',
        width: width * tabs.length,
        flexDirection: 'row',
        transform: [{
          translateX: multiply(-width, transition)
        }]
      }}>
        {children.map((child, index) => (
          <Box flex={1}  key={index} width={width}>{child}</Box>
        ))}
      </Animated.View>
    </Box>
  )
};

export default Tabs;
