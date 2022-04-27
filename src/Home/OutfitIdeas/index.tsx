import React, { useState } from 'react';
import {Box} from '../../components/Theme';
import Header from '../../components/Header';
import Background from './Background';
import Card from './Card';
import {interpolate, sub, useDerivedValue} from 'react-native-reanimated';
import {
  useTransition,
} from "react-native-redash/lib/module/v1";
import Categories from './Categories';
import { useTiming } from 'react-native-redash';

const cards = [
  {
    index: 3,
    source: require('../../assets/1.png'),
  },
  {
    index: 2,
    source: require('../../assets/2.png'),
  },
  {
    index: 1,
    source: require('../../assets/3.png'),
  },
  {
    index: 0,
    source: require('../../assets/4.png'),
  },
]

// const step = 1 / (cards.length - 1);

interface OutfitIdeasProps {
};

const step = 1 / (cards.length - 1);

const OutfitIdeas: React.FC<OutfitIdeasProps> = props => {
  const {navigation} = props;
  const [currentIndex, setCurentIndex] = useState(0);
  const aIndex = useTiming(currentIndex);

  return (
   <Box flex={1} backgroundColor="background">
     <Header
      title="Outfit Ideas"
      left={{
        icon: 'menu',
        onPress: () => navigation.openDrawer()
      }}
      right={{
        icon: 'shopping-bag',
        onPress: () => navigation.navigate('Cart')
      }}
      dark={false}
    />
    <Categories />
    <Box flex={1}>
      <Background />
      { cards.map(({index, source}) => {
        if (currentIndex < index * step + step) {
          return <Card 
          key={index}
          source={source}
          index={index + 1}
          aIndex={aIndex}
          step={step}
          onSwipe={() => {
            console.log(step);
            setCurentIndex(pre => pre + step);
          }}
        />
        }
      })}
    </Box>
   </Box>
  )
};

export default OutfitIdeas;
