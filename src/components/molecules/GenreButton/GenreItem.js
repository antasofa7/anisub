import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {colors, fonts} from '../../../utils';

const GenreItem = ({genre}) => {
  return (
    <TouchableOpacity style={styles.container}>
      <Text style={styles.title}>{genre}</Text>
    </TouchableOpacity>
  );
};

export default GenreItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.onPrimary,
    marginRight: 8,
    borderRadius: 10,
  },
  title: {
    fontFamily: fonts.sora.medium,
    fontSize: 12,
    color: colors.onBackground,
    paddingHorizontal: 16,
    paddingVertical: 6,
  },
});
