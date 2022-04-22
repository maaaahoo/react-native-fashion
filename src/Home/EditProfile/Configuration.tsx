import React from 'react';
import { ScrollView } from 'react-native';
import { Box, Text } from '../../components/Theme';

import CheckboxGroup from './CheckboxGroup';
import RoundedCheckboxGroup from './RoundedCheckboxGroup';

const oufitType = [{
  value: "men",
  label: 'For men',
},{
  value: "women",
  label: 'For women',
},{
  value: "both",
  label: 'For both',
},]

const sizes = [
  {value: "s"},
  {value: "m"},
  {value: "l"},
  {value: "xl"},
  {value: "xxl"},
];

const colors = [
  {value: "#0C0D34"},
  {value: "#FF0058"},
  {value: "#50B0DE"},
  {value: "#00D99A"},
  {value: "#FE5E33"},
];

const preferredBrand = [
  {value: "adidas", label: "Adidas"},
  {value: "nike", label: "Nike"},
  {value: "converse", label: "Converse"},
  {value: "tommy-hilfiger", label: "Tommy Hilfiger"},
  {value: "billionaire-boys-club", label: "Billionaire Boys Club"},
  {value: "jordan", label: "Jordan"},
  {value: "le-coq-sportif", label: "Le Coq Sportif"},
]

interface ConfigurationProps {
};

const Configuration: React.FC<ConfigurationProps> = props => {
  const {} = props;

  return (
    <ScrollView>
      <Box padding="m">
        <Text variant="body">What type of outfit you usually wear?</Text>
        <CheckboxGroup options={oufitType} radio />
        <Text variant="body">What is your clothing size?</Text>
        <RoundedCheckboxGroup options={sizes} />
        <Text variant="body">What is your clothing color?</Text>
        <RoundedCheckboxGroup options={colors} valueIsColor />
        <Text variant="body">My preferred brands</Text>
        <CheckboxGroup options={preferredBrand} />
      </Box>
    </ScrollView>
  )
};

export default Configuration;
