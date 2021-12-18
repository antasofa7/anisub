import React from 'react';
import {StyleSheet, View} from 'react-native';
import Input from '.';
import {IconSearch} from '../../../assets';
import {colors} from '../../../utils';

const InputSearch = () => {
  return (
    <View style={styles.container}>
      <IconSearch />
      <Input placeholder="Search anime..." />
    </View>
  );
};

export default InputSearch;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    backgroundColor: colors.onPrimary,
    borderRadius: 10,
  },
});
