import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {
  IconFilm,
  IconFilmActive,
  IconHome,
  IconHomeActive,
  IconLibrary,
  IconLibraryActive,
  IconPlay,
  IconPlayActive,
  IconSearcActive,
  IconSearchMenu,
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
    if (label === 'Search') {
      return isFocused ? <IconSearcActive /> : <IconSearchMenu />;
    }
    if (label === 'Library') {
      return isFocused ? <IconLibraryActive /> : <IconLibrary />;
    }
    if (label === 'Profile') {
      return isFocused ? <IconUserActive /> : <IconUser />;
    }

    return <IconHomeActive />;
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
      {/* <Text style={styles.label(isFocused)}>{label}</Text> */}
    </TouchableOpacity>
  );
};

export default TabItem;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 12,
  },
  label: isFocused => ({
    color: isFocused ? colors.primary : colors.onBackground,
    fontFamily: fonts.sora.medium,
    fontSize: 8,
    marginTop: 4,
  }),
});
