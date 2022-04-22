import React from 'react';
import {Dimensions} from 'react-native';
import Header from '../../components/Header';
import { Box, Text, useTheme } from '../../components/Theme';
import Tabs from './Tabs';
import Configuration from './Configuration';
import Personal from './Personal';

const {width} = Dimensions.get("window");
const tabs = [{
  id: 'configuration',
  title: 'Configuration',
},{
  id: 'info',
  title: 'Personal Info'
}]


interface EditProfileProps {
};

const EditProfile: React.FC<EditProfileProps> = props => {
  const {navigation} = props;
  const theme = useTheme();

  return (
    <Box flex={1} backgroundColor="background">
      <Box flex={0.2} backgroundColor={"background"}>
        <Box 
          position="absolute" 
          top={0} 
          left={0} 
          bottom={0} 
          right={0} 
          borderBottomRightRadius={"xl"} 
          backgroundColor={"secondary"}
        >
          <Header
            left={{
              icon: 'menu',
              onPress: () => navigation.openDrawer()
            }}
            title="my profile"
          />
        </Box>
      </Box>
      <Box>
        <Box
          width={100}
          height={100}
          position="absolute"
          top={-50}
          left={width / 2 - 50}
          alignItems="center"
          backgroundColor="primary"
          style={{
            borderRadius: 50,
          }}
        />
        <Box marginVertical="m" style={{ marginTop: 50 + theme.spacing.m }}>
          <Text variant="title1" textAlign="center">Mike Peter</Text>
          <Text variant="body" textAlign="center">mike@flexinstudio.com</Text>
        </Box>
      </Box>
      <Tabs tabs={tabs}>
        <Configuration />
        <Personal />
      </Tabs>
    </Box>
  )
};

export default EditProfile;
