import React, {useCallback} from 'react';
import {StyleSheet, Dimensions, ImageRequireSource} from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated, {add, runOnJS, useAnimatedGestureHandler, useAnimatedStyle, useDerivedValue, useSharedValue, withSpring} from 'react-native-reanimated';
import {mixColor, mix, snapPoint} from 'react-native-redash';
import {
  usePanGestureHandler,
} from "react-native-redash/lib/module/v1";

import { Box } from '../../components/Theme';
import { useSpring } from './Animations';

const {width: wWidth} = Dimensions.get("window");
const width = wWidth * 0.75;
const height = width * (425/294);
const borderRadius = 24;
interface CardProps {
  position: Animated.Adaptable<number>;
  onSwipe: () => void;
  source: ImageRequireSource;
  index: number;
  step: number;
  aIndex: Animated.SharedValue<number>;
};

const Card: React.FC<CardProps> = props => {
  const {index, aIndex, step, onSwipe, source} = props;
  const {gestureHandler, translation, velocity, state} = usePanGestureHandler();
  
  const position = useDerivedValue(() => index * step - aIndex.value);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const snapPoints = [-wWidth, 0, wWidth];

  const handleSwipeEnd = useCallback((dest: number) => {
    dest !== 0 && onSwipe && onSwipe();
  }, []);

  const onGestureEvent = useAnimatedGestureHandler<{x: number, y: number}>({
    onStart: (_, ctx) => {
      ctx.x = translateX.value;
      ctx.y = translateY.value;
    },
    onActive: ({ translationX, translationY }, ctx) => {
      translateX.value = translationX + ctx.x;
      translateY.value = translationY + ctx.y;
    },
    onEnd: ({ velocityX, velocityY }) => {
      translateY.value = withSpring(0, {
        velocity: velocityY,
      });
      const dest = snapPoint(translateX.value, velocityX, snapPoints);
      translateX.value = withSpring(
        dest,
        {
          overshootClamping: dest === 0? false: true,
          restSpeedThreshold: dest === 0? 0.01: 100,
          restDisplacementThreshold:  dest === 0? 0.01: 100,
        },
        () => runOnJS(handleSwipeEnd)(dest),
      );
    }
  })

  const scale = mix(position.value, 1, 0.9);
  // const translateX = 0;
  // const translateY = 0;

  const imageScaleStyle = useAnimatedStyle(() => ({
    transform: [{
      scale: mix(position.value, 1.1, 1)
    }]
  }));

  const cardStyle = useAnimatedStyle(() => ({
    backgroundColor: mixColor(position.value, "#C9E9E7", "#74BCB8"),
    transform: [{
      translateY: translateY.value
    }, {
      translateX: translateX.value
    },{
      scale
    }]
  }));

  return (
    <Box 
      style={StyleSheet.absoluteFillObject}
      justifyContent="center"
      alignItems="center"
    >
      <PanGestureHandler onGestureEvent={onGestureEvent}>
        <Animated.View 
          style={[{ 
            width, 
            height, 
            borderRadius,
            overflow: 'hidden',
          }, cardStyle]} 
        >
          <Animated.Image {...{source}}  style={[{
            ...StyleSheet.absoluteFillObject,
            width: undefined,
            height: undefined,
          }, imageScaleStyle]} />
        </Animated.View>
      </PanGestureHandler>
    </Box>
  )
};

export default Card;
