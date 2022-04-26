import React from 'react';
import { BorderlessButton } from 'react-native-gesture-handler';
import { Box } from '../../components/Theme';

interface CardLayoutProps {
  onPress: () => void,
  backgroundColor: string,
};

const CardLayout: React.FC<CardLayoutProps> = props => {
  const {onPress, children, backgroundColor} = props;

  return (
    <BorderlessButton onPress={onPress}>
      <Box 
        marginLeft="m"
        borderRadius="m"
        padding="m"
        width={120} 
        height={160} 
        backgroundColor={backgroundColor}
      >
        {children}
      </Box>

    </BorderlessButton>
  )
};

export default CardLayout;
