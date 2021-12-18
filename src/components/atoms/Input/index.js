import React from 'react';
import {TextInput} from 'react-native';
import {colors} from '../../../utils';

const Input = ({placeholder}) => {
  return (
    <TextInput
      placeholder={placeholder}
      placeholderTextColor={colors.onBackground}
    />
  );
};

export default Input;
