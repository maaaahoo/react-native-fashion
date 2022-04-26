import React from 'react';
import {View} from 'react-native';
import { Box, Text } from '../../components/Theme';

interface ListItemProps {
  label: string;
  value: number;
};

const ListItem: React.FC<ListItemProps> = props => {
  const {label, value} = props;

  return (
    <Box flexDirection="row" paddingVertical="m">
      <Box flex={1}>
        <Text color="background" variant="title3">{label}</Text>
      </Box>
      <Box>
        <Text color="primary" variant="title3">${value}</Text>
      </Box>
    </Box>
  )
};

export default ListItem;
