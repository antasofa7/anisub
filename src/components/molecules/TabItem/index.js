import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {
  IconHome,
  IconHomeActive,
  IconLibrary,
  IconLibraryActive,
  IconSearcActive,
  IconSearchMenu,
  IconUser,
  IconUserActive,
} from '../../../assets';
import {colors, fonts, responsiveWidth} from '../../../utils';

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
    </TouchableOpacity>
  );
};

export default TabItem;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: responsiveWidth(16),
  },
  label: isFocused => ({
    color: isFocused ? colors.primary : colors.onBackground,
    fontFamily: fonts.sora.medium,
    fontSize: 8,
    marginTop: 4,
  }),
});
