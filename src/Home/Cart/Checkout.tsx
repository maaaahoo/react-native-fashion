import React, { useState } from 'react';
import {ScrollView, View} from 'react-native';
import { Box, Text } from '../../components/Theme';
import Card, {CardType} from './Card';
import AddCard from './AddCard';
import ListItem from './ListItem';
import {Button} from '../../components';

interface CheckoutProps {
  minHeight: number;
};


const cards = [
  {
    id: 0,
    type: CardType.VISA,
    last4Digits: 5132,
    expiration: "05/24",
  },
  {
    id: 1,
    type: CardType.MASTERCARD,
    last4Digits: 2620,
    expiration: "05/24",
  },
]

const Checkout: React.FC<CheckoutProps> = props => {
  const {minHeight} = props;
  const [selectedCard, setSelectedCard] = useState(cards[0].id);

  return (
    <Box flex={1} backgroundColor="secondary" style={{
      paddingTop: minHeight
    }}>
      <Box flex={1} padding="m">
        <Box>
          <ScrollView  showsHorizontalScrollIndicator={false} horizontal>
            <AddCard />
            {cards.map((card, index) => (
              <Card 
                card={card} 
                key={card.id}
                selected={selectedCard === card.id}
                onSelect={() => {
                  setSelectedCard(card.id)
                }}
              />
            ))}
          </ScrollView>
        </Box>
        <Box flex={1} marginTop="xl">
          <Text color="background" variant="title3">Delivery address</Text>
          <Box flexDirection="row" opacity={0.5} paddingVertical="m">
            <Box flex={1}>
              <Text color="background">Unit 15, York Farm Business Centre,</Text>
              <Text color="background">Watling St, Towcester</Text>
            </Box>
            <Box padding="m" justifyContent="center">
              <Text color="background">Change</Text>
            </Box>
          </Box>
          <ListItem label="Total Item (6)" value={189.94} />
          <ListItem label="Standard Delivery" value={12} />
          <ListItem label="Total Payment" value={201.84} />
          <Box flex={1} justifyContent="flex-end" paddingVertical="l" alignItems="center">
           <Button label="Swipe to Pay $201.84" variant="primary" />
          </Box>
        </Box>
      </Box>
    </Box>
  )
};

export default Checkout;
