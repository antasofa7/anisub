import {Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {colors, fonts} from '../../../utils';

const Menu = ({name, onPress}) => {
  return (
    <TouchableOpacity style={styles.wrapperMenu} onPress={onPress}>
      <Text style={styles.menu}>{name}</Text>
    </TouchableOpacity>
  );
};

export default Menu;

const styles = StyleSheet.create({
  wrapperMenu: {
    backgroundColor: colors.onPrimary,
    padding: 16,
    marginTop: 10,
  },
  menu: {
    fontFamily: fonts.sora.medium,
    fontSize: 14,
    color: colors.onBackground,
  },
});
