import React from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated, { useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { Box, useTheme } from '../../components/Theme';
import {clamp, snapPoint} from 'react-native-redash';

const {width} = Dimensions.get("window");
const height = 682 * width / 375;
const aspectRatio = width / 375;

interface CartContainerProps {
};

const CartContainer: React.FC<CartContainerProps> = props => {
  const {children} = props;
  const theme = useTheme();
  const minHeight = 228 * width / 375;
  const translateY = useSharedValue(0);
  const snapPoints = [-(height - minHeight), 0];
  const onGestureEvent = useAnimatedGestureHandler<{ y: number }>({
    onStart: (event, ctx) => {
      ctx.y = translateY.value;
    },
    onActive: ({ translationY }, ctx) => {
      translateY.value = clamp(ctx.y + translationY, snapPoints[0], snapPoints[1]);
    }, 
    onEnd: ({ velocityY }) => {
      const dest = snapPoint(translateY.value, velocityY, snapPoints);
      translateY.value = withSpring(dest, {overshootClamping: true});
    }
  });

  const style = useAnimatedStyle(() => {
    return {
      transform: [{
        translateY: translateY.value
      }]
    }
  });

  return (
    <Box flex={1} backgroundColor="secondary">
      <PanGestureHandler
        onGestureEvent={onGestureEvent}
      >
        <Animated.View style={[{
          position: 'absolute',
          left: 0,
          top: 0,
          right: 0,
          height,
          backgroundColor: "white",
          borderBottomRightRadius: theme.borderRadii.xl,
          borderBottomLeftRadius: theme.borderRadii.xl,
        }, style]}>
          {children}
          <View style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: theme.borderRadii.xl,
            justifyContent: 'flex-end',
            alignItems: 'center'
          }}>
            <View style={{
              height: 5 * aspectRatio,
              backgroundColor: '#E6E6E6',
              width: 60 * aspectRatio,
              borderRadius: 2.5 * aspectRatio,
              marginBottom: theme.spacing.m,
            }}>

            </View>
          </View>
        </Animated.View>
      </PanGestureHandler>
    </Box>
  )
};

export default CartContainer;

