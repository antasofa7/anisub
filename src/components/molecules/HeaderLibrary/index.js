import React from 'react';
import {
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from 'react-native';
import {IconSearch} from '../../../assets';
import {colors, fonts, responsiveHeight} from '../../../utils';
import {InputSearch} from '../../atoms';

const HeaderLibrary = () => {
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <View style={styles.search}>
          <IconSearch />
        </View>
        <TouchableOpacity>
          <View style={styles.series}>
            <Text style={styles.title}>TV Series</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={styles.movies}>
            <Text style={styles.title}>Movies</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HeaderLibrary;

const styles = StyleSheet.create({
  container: {
    // flexDirection: 'row',
    marginHorizontal: 16,
  },
  wrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: responsiveHeight(60),
  },
  title: {
    fontFamily: fonts.sora.regular,
    fontSize: 14,
    color: colors.onBackground,
  },
  search: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});
