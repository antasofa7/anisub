import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {IconFall, Logo} from '../../../assets';
import {colors, fonts, responsiveHeight, responsiveWidth} from '../../../utils';
import {Spacing} from '../../atoms';

const Header = () => {
  return (
    <View style={styles.container}>
      <View style={styles.wrapperLogo}>
        <Image source={Logo} style={styles.logo} />
      </View>
      <View style={styles.season}>
        <Text style={styles.seasonTitle}>Fall</Text>
        <Spacing width={4} />
        <IconFall />
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: responsiveHeight(60),
  },
  wrapperLogo: {
    width: responsiveWidth(110),
    height: responsiveHeight(44),
  },
  logo: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'contain',
  },
  season: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  seasonTitle: {
    fontFamily: fonts.sora.medium,
    fontSize: 16,
    color: colors.secondary,
  },
});
