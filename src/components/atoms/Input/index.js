import React from 'react';
import {StyleSheet, TextInput} from 'react-native';
import {colors, fonts} from '../../../utils';

const Input = ({
  placeholder,
  onChangeText,
  value,
  onFocus,
  onKeyPress,
  onSubmitEditing,
  keyboardType,
  secureTextEntry,
}) => {
  return (
    <TextInput
      value={value}
      placeholder={placeholder}
      placeholderTextColor={colors.onBackground}
      style={styles.input}
      keyboardType={keyboardType}
      secureTextEntry={secureTextEntry}
      onChangeText={onChangeText}
      onFocus={onFocus}
      onKeyPress={onKeyPress}
      onSubmitEditing={onSubmitEditing}
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
