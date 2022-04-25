import React from 'react';
import {View} from 'react-native';
import { Box, useTheme } from '../../components/Theme';

interface ItemProps {
};

const Item: React.FC<ItemProps> = props => {
  const {} = props;
  const theme = useTheme();

  return (
    <Box padding="m">
      <Box style={{
        width: 120,
        height: 120,
        borderRadius: 12,
        backgroundColor: theme.colors.pink
      }}>

      </Box>
    </Box>
  )
};

export default Item;
