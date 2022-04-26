import React from 'react';
import {View} from 'react-native';
import { Box } from '../../components/Theme';
import { Feather as Icon } from '@expo/vector-icons';

import CardLayout from './CardLayout';

interface AddCardProps {
};

const AddCard: React.FC<AddCardProps> = props => {
  const {} = props;

  return (
    <CardLayout onPress={() => true} backgroundColor="secondary">
      <Box 
        flex={1} 
        justifyContent="center" 
        alignItems="center"
        borderRadius="m"
        style={{
          backgroundColor: 'rgba(255,255,255, 0.05)'
        }}
      >
        <Icon name="plus" size={20} color="white" />
      </Box>
    </CardLayout>
  )
};

export default AddCard;
