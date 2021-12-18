import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {
  IconFilm,
  IconFilmActive,
  IconHome,
  IconHomeActive,
  IconPlay,
  IconPlayActive,
  IconTv,
  IconTvActive,
  IconUser,
  IconUserActive,
} from '../../../assets';
import {colors, fonts} from '../../../utils';

const TabItem = props => {
  const {index, label, isFocused, onPress, onLongPress} = props;

  const Icon = () => {
    if (label === 'Home') {
      return isFocused ? <IconHomeActive /> : <IconHome />;
    }
    if (label === 'TV Series') {
      return isFocused ? <IconTvActive /> : <IconTv />;
    }
    if (label === 'Playlist') {
      return isFocused ? <IconPlayActive /> : <IconPlay />;
    }
    if (label === 'Movies') {
      return isFocused ? <IconFilmActive /> : <IconFilm />;
    }
    if (label === 'Profile') {
      return isFocused ? <IconUserActive /> : <IconUser />;
    }

    return <IconPlay />;
  };

  return (
    <TouchableOpacity
      key={index}
      accessibilityRole="button"
      accessibilityState={isFocused ? {selected: true} : {}}
      onPress={onPress}
      onLongPress={onLongPress}
      style={styles.container}>
      <Icon />
      <Text style={styles.label(isFocused)}>{label}</Text>
    </TouchableOpacity>
  );
};

export default TabItem;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 4,
  },
  label: isFocused => ({
    color: isFocused ? colors.primary : colors.onBackground,
    fontFamily: fonts.sora.medium,
    fontSize: 8,
    marginTop: 4,
  }),
});
