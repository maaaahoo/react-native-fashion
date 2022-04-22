import React from 'react';
import {ScrollView, View} from 'react-native';
import { Box, Text } from '../../components/Theme';
import CheckboxGroup from './CheckboxGroup';
import TextInput from '../../components/Form/TextInput';

const genders = [{
  value: 'male', label: 'Male'
}, {
  value: 'female', label: 'Female'
}]

interface PersonalProps {
};

const Personal: React.FC<PersonalProps> = props => {
  const {} = props;

  return (
    <ScrollView>
      <Box padding="m">
        <Text variant="body">Account Information</Text>
        <Box marginBottom="m">
          <TextInput 
            icon='user' 
            placeholder='Name'
            autoCapitalize='none'
          />
        </Box>
        <Box marginBottom="m">
          <TextInput 
            icon='lock' 
            placeholder='Enter your Password'
            secureTextEntry
            autoCompleteType={'password'}
            autoCapitalize='none'
            returnKeyType='go'
            returnKeyLabel='go'
          />
        </Box>
        <Box marginBottom="m">
          <TextInput 
            icon='map-pin' 
            placeholder='Address'
            autoCapitalize='none'
            returnKeyType='next'
            returnKeyLabel='next'
          />
        </Box>
        <CheckboxGroup options={genders} radio />
      </Box>
    </ScrollView>
  )
};

export default Personal;
