import React from 'react';
import {Dimensions, ScrollView, StyleSheet, View} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import Header from '../../components/Header';
import { Box, useTheme, Text } from '../../components/Theme';
import CartContainer from './CartContainer';
import Item from './Item';

const {width} = Dimensions.get("window");
const aspectRatio = width / 375;
const height = 100 * aspectRatio;
const d = `M 0 0 A 50 50 0 0 0 50 50 H ${width-50} A 50 50 0 0 1 ${width} 100 V 0 Z`

interface CartProps {
};

const Cart: React.FC<CartProps> = props => {
  const {navigation} = props;
  const theme = useTheme();

  return (
    <CartContainer>
      <Box>
        <Box backgroundColor="primary">
          <Header
            left={{
              icon: 'arrow-left',
              onPress: () => navigation.goBack()
            }}
            title="Shopping Cart"
            dark={true}
          />
        </Box>
        <View style={{ height: height / 2 }} />
        <Box style={{
          position: 'absolute',
          bottom: -height/2,
          left: 0,
          right: 0,
          height,
        }}>
          <Svg style={StyleSheet.absoluteFill} viewBox={`0 0 ${width} ${height}`} >
            <Path d={d} fill={theme.colors.primary} />
          </Svg>
          <Text variant="title2" textAlign="center" color="white">3 Items Add</Text>
        </Box>
      </Box>
      <ScrollView
        style={{
          borderBottomRightRadius: theme.borderRadii.xl,
          borderBottomLeftRadius: theme.borderRadii.xl,
        }}
        showsVerticalScrollIndicator={false}
      >
        <Item />
        <Item />
        <Item />
        <Item />
      </ScrollView>
    </CartContainer>
  )
};

export default Cart;
