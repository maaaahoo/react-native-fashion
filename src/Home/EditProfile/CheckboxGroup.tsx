import React, {useState} from 'react';
import Button from '../../components/Button';
import { Box, useTheme } from '../../components/Theme';

interface CheckboxGroupProps {
  options: {
    value: string,
    label: string,
  }[], 
  radio?: boolean
};

const CheckboxGroup: React.FC<CheckboxGroupProps> = props => {
  const {options, radio} = props;
  const [selectedValues, setSelectedValue] = useState([]);

  const theme = useTheme();

  return (
    <Box flexDirection="row" flexWrap="wrap" marginTop="m">
      {
        options.map((option) => {
          const isSelected = selectedValues.indexOf(option.value) !== -1;
          return (
            <Button 
              key={option.value}
              variant={isSelected ? "primary" : "default"}
              label={option.label}
              onPress={() => {
                if (radio) {
                  setSelectedValue([option.value]);  
                } else {
                  if (isSelected) {
                    selectedValues.splice(selectedValues.indexOf(option.value), 1);
                  } else {
                    selectedValues.push(option.value);
                  }
                  setSelectedValue([...selectedValues]);  
                }
              }}
              style={{
                width: 'auto',
                height: 'auto',
                padding: 16,
                marginBottom: theme.spacing.m,
                marginRight: theme.spacing.s,
              }}
            >
            
            </Button>
          )
        })
      }
    </Box>
  )
};

export default CheckboxGroup;
