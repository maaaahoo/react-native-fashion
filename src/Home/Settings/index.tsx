import React from 'react';
import {View, StyleSheet} from 'react-native';
import ContentFooter from '../../components/ContentFooter';
import Header from '../../components/Header';
import { Box } from '../../components/Theme';
import Notification from './Notification';

interface SettingsProps {
};

const Settings: React.FC<SettingsProps> = props => {
  const {navigation} = props;

  return (
    <ContentFooter>
     <Box backgroundColor="background">
        <Header
          left={{
            icon: 'menu',
            onPress: () => navigation.openDrawer()
          }}
          right={{
            icon: 'share',
            onPress: () => null
          }}
          title="Notifications"
          dark={false}
        />
        <Box padding='m'>
          <Notification
            title={"Outfit Ideas"}
            description={"Receive daily notifications"}
          />
          <Notification
            title={"Discounts & Sales"}
            description={"Buy the stuff you love for less"}
          />
          <Notification
            title={"Stock Notifications"}
            description={"If the product you comes back"}
          />
          <Notification
            title={"New Stuff"}
            description={"Hear it first, wear it first"}
          />
        </Box>
      </Box>
    </ContentFooter>
  )
};

export default Settings;
