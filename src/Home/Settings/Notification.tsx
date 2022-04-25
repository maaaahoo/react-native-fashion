import React, { useState } from 'react';
import {Switch, View} from 'react-native';
import { Box, Text, useTheme } from '../../components/Theme';

interface NotificationProps {
  title: string;
  description: string;
};

const Notification: React.FC<NotificationProps> = props => {
  const {title, description} = props;
  const [selected, setSelected] = useState(false);
  const theme = useTheme();

  return (
    <Box flexDirection="row" padding="m">
      <Box flex={1}>
        <Text variant="title3">{title}</Text>
        <Text variant="body">{description}</Text>
      </Box>
      <Box paddingVertical='m'>
        <Switch 
          value={selected}
          onValueChange={setSelected}
          trackColor={{
            true: theme.colors.primary,
            false: '#F8F8F8'
          }}
        />
      </Box>
    </Box>
  )
};

export default Notification;
