import React from 'react';
import {View} from 'react-native';
import { Box, useTheme, Text } from '../../components/Theme';
import SwipeableRow from './SwipeableRow';

interface ItemProps {
  onDelete: () => void;
};

const Item: React.FC<ItemProps> = props => {
  const {onDelete} = props;
  const theme = useTheme();

  return (
    <SwipeableRow onDelete={() => {
      console.log('SwipeableRow')
      onDelete();
    }}>
      <Box padding="m" flexDirection="row">
        <Box style={{
          width: 120,
          height: 120,
          borderRadius: 12,
          backgroundColor: theme.colors.pink,
          opacity: 0.5,
        }} />
        <Box padding="m">
          <Text variant="header">Size M</Text>
          <Text variant="title3" marginBottom="s">Short Sleeve Orangic Top</Text>
          <Text variant="title3" color="primary">$29.9</Text>
        </Box>
        <Box justifyContent="center">
          <Box 
            backgroundColor='secondary'
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              height: 24,
              width: 24,
              borderRadius: 12
            }}
          >
            <Text variant="header" color="background">x2</Text>
          </Box>
        </Box>
      </Box>
    </SwipeableRow>
  )
};

export default Item;
