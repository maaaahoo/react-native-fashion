import React, {useState} from 'react';
import {View} from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';
import { Box, useTheme, Text } from '../../components/Theme';
import { Feather as Icon } from '@expo/vector-icons';

interface RoundedCheckboxGroupProps {
  options: {
    value: string,
  }[],
  valueIsColor?: boolean,
};

const RoundedCheckboxGroup: React.FC<RoundedCheckboxGroupProps> = props => {
  const {options, valueIsColor} = props;
  const [selectedValues, setSelectedValue] = useState([]);

  const theme = useTheme();

  return (
    <Box flexDirection="row" flexWrap="wrap" marginTop="m">
      {
        options.map((option) => {
          const isSelected = selectedValues.indexOf(option.value) !== -1;
          const backgroundColor = isSelected ? theme.colors.primary : theme.colors.grey;

          return (
            <BorderlessButton 
              key={option.value}
              onPress={() => {
                if (isSelected) {
                  selectedValues.splice(selectedValues.indexOf(option.value), 1);
                } else {
                  selectedValues.push(option.value);
                }
                setSelectedValue([...selectedValues]);
              }}
            > 
              <View style={{
                width: 50, 
                height: 50,
                borderRadius: 25,
                justifyContent: 'center',
                alignItems: 'center',
                borderWidth: isSelected ? 1 : 0,
                borderColor: valueIsColor ? option.value : 'white',
                marginBottom: theme.spacing.m,
                marginRight: theme.spacing.s,
              }}>
                <View style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  backgroundColor: valueIsColor ? option.value : backgroundColor,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                  {!valueIsColor && (
                    <Text
                      textAlign="center" 
                      variant="header"
                      color={isSelected ? "background": 'secondary'}
                    >{option.value.toUpperCase()}</Text>
                  )}
                  {valueIsColor && isSelected && (
                    <Icon color="white" name="check" size={16} />
                  )}
                </View>
              </View>
            </BorderlessButton>
          )
        })
      }
    </Box>
  )
};

export default RoundedCheckboxGroup;
