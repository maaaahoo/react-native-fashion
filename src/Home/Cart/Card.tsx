import React from 'react';
import {View} from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';
import { Box, Text } from '../../components/Theme';
import CardLayout from './CardLayout';

export enum CardType {
  VISA,
  MASTERCARD,
}

interface CardProps {
  card: any,
  selected: boolean,
  onSelect: () => void,
};

const Card: React.FC<CardProps> = props => {
  const {card, selected, onSelect} = props;

  return (
    <CardLayout 
      onPress={onSelect}
      backgroundColor={selected ? "primary" : "background"}
    >
      <Text 
        color={selected ? 'background' : 'primary'} 
        variant="title3"
      >
        {card.type === CardType.VISA ? 'VISA' : 'MASTER'}
      </Text>
      <Text 
        color={selected ? 'background' : 'primary'}
        variant="title3" 
        marginVertical="m"
      >
        **** {card.last4Digits}
      </Text>
      <Text 
        opacity={0.5}
      >
        Expiration
      </Text>
      <Text 
        color={selected ? 'background' : 'primary'}
        variant="title3" 
      >
        {card.expiration}
      </Text>
    </CardLayout>
  )
};

export default Card;
