import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {colors, fonts} from '../../../utils';

const GenreItem = props => {
  const {genreName, active, onPress} = props;

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text style={styles.title(active)}>{genreName}</Text>
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
  title: active => ({
    fontFamily: fonts.sora.medium,
    fontSize: 12,
    color: active ? colors.primary : colors.onBackground,
    paddingHorizontal: 16,
    paddingVertical: 6,
  }),
});
