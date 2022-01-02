import React from 'react';
import {StyleSheet, TextInput} from 'react-native';
import {colors, fonts} from '../../../utils';

const Input = ({placeholder, onChangeText}) => {
  return (
    <TextInput
      placeholder={placeholder}
      placeholderTextColor={colors.onBackground}
      style={styles.input}
      onChangeText={onChangeText}
    />
  );
};

export default Input;

const styles = StyleSheet.create({
  input: {
    width: '100%',
    fontFamily: fonts.sora.regular,
    fontSize: 12,
    color: colors.onBackground,
  },
});
