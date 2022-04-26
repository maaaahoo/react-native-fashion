import React, {useState} from 'react';
import {Dimensions, ScrollView, StyleSheet, View} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import Header from '../../components/Header';
import { Box, useTheme, Text } from '../../components/Theme';
import CartContainer from './CartContainer';
import Item from './Item';
import Checkout from './Checkout';

const {width} = Dimensions.get("window");
const aspectRatio = width / 375;
const height = 100 * aspectRatio;
const d = `M 0 0 A 50 50 0 0 0 50 50 H ${width-50} A 50 50 0 0 1 ${width} 100 V 0 Z`

const defaultItem = [{id: 1}, {id: 2}, {id: 3}, {id: 4}];

interface CartProps {
};

const Cart: React.FC<CartProps> = props => {
  const {navigation} = props;
  const theme = useTheme();
  const [items, setItems] = useState(defaultItem);

  return (
    <CartContainer CheckoutComponent={Checkout}>
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
      <Box flex={1}>
        <ScrollView
          style={{
            borderBottomRightRadius: theme.borderRadii.xl,
            borderBottomLeftRadius: theme.borderRadii.xl,
          }}
          contentContainerStyle={{
            paddingVertical: 50 * aspectRatio
          }}
          showsVerticalScrollIndicator={false}
        >
          {items.map((item, index) => (
            <Item key={item.id} onDelete={() => {
              console.log('删除');
              items.splice(index, 1);
              setItems(items.concat());
            }} />
          ))}
        </ScrollView>
        <Box style={{
          position: 'absolute',
          top: 0,
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
    </CartContainer>
  )
};

export default Cart;
