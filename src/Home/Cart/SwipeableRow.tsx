import React, { useRef, useCallback } from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import Animated, { runOnJS, Transition, Transitioning, useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';
import { snapPoint } from 'react-native-redash';
import {LinearGradient} from 'expo-linear-gradient';
import { Box, useTheme } from '../../components/Theme';
import RoundedIconButton from '../../components/RoundedIconButton';

interface SwipeableRowProps {
  onDelete: () => void;
  height: number;
};

const {width} = Dimensions.get("window");
const aspectRatio = width / 375;
const finalDest = width;
const snapPoints = [-85 * aspectRatio, 0 , finalDest];


const SwipeableRow: React.FC<SwipeableRowProps> = props => {
  const {children, onDelete, height: defaultHeight} = props;

  const theme = useTheme();
  const translateX = useSharedValue(0);
  const height = useSharedValue(defaultHeight);

  const deleteItem = useCallback(() => {
    onDelete && onDelete();
  }, [onDelete]);

  const onGestureEvent = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      ctx.x = translateX.value;
    },
    onActive: ({ translationX }, ctx) => {
      translateX.value = ctx.x + translationX;
    },
    onEnd: ({ velocityX }) => {
      const dest = snapPoint(translateX.value, velocityX, snapPoints);
      translateX.value = withSpring(
        dest,
        {
          overshootClamping: true,
        },
        () => {
          if (dest === finalDest) {
            height.value = withTiming(0, {duration: 250}, () => runOnJS(deleteItem)());
          }
        }
      )
    }
  })

  const style = useAnimatedStyle(() => ({
    height: height.value,
    backgroundColor: 'white',
    transform: [{
      translateX: translateX.value
    }]
  }));

  const deleteStyle = useAnimatedStyle(() => ({
    opacity: translateX.value > 0 ? 1 : 0,
  }));

  const editStyle = useAnimatedStyle(() => ({
    opacity: translateX.value < 0 ? 1 : 0,
  }));

  return (
    <View>
      <Animated.View style={[{
        ...StyleSheet.absoluteFillObject,
      }, deleteStyle]}>
        <LinearGradient 
          colors={[theme.colors.danger, theme.colors.background]} 
          style={{...StyleSheet.absoluteFillObject}}
          start={[0, 0.5]}
          end={[1, 0.5]}
        >
          <Box flex={1} justifyContent="center" padding="m">
            <RoundedIconButton 
              onPress={() => {}}
              name={"x"}
              size={24}
              color="white"
              backgroundColor="danger"
            />
          </Box>
        </LinearGradient>
      </Animated.View>
      <Animated.View style={[{
        ...StyleSheet.absoluteFillObject,
      }, editStyle]}>
        <LinearGradient 
          colors={[theme.colors.lightBlue, theme.colors.background]} 
          style={{...StyleSheet.absoluteFillObject}}
          start={[1, 0.5]}
          end={[0.6, 0.5]}
        >
          <Box justifyContent="space-evenly" padding="m" alignItems='flex-end' flex={1}>
            <RoundedIconButton 
              onPress={() => {}}
              name={"plus"}
              size={24}
              color="white"
              backgroundColor="primary"
            />
            <RoundedIconButton 
              onPress={() => {}}
              name={"minus"}
              size={24}
              color="white"
              backgroundColor="danger"
            />
          </Box>
        </LinearGradient>
      </Animated.View>
      <PanGestureHandler {...{onGestureEvent}}>
        <Animated.View style={style}>
          {children}
        </Animated.View>
      </PanGestureHandler>
    </View>
  )
};

export default SwipeableRow;
