import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {IconSearch, IconSummer, Logo} from '../../../assets';
import {colors, fonts, responsiveHeight, responsiveWidth} from '../../../utils';
import {InputSearch, Spacing} from '../../atoms';

const Header = ({home}) => {
  const ContentHeader = () => {
    if (home) {
      return (
        <>
          <View style={styles.wrapper}>
            <View style={styles.wrapperLogo}>
              <Image source={Logo} style={styles.logo} />
            </View>
            <Spacing width={10} />
            <View style={styles.season}>
              <IconSummer />
              <Text style={styles.seasonTitle}>Summer</Text>
            </View>
          </View>
          <View style={styles.wrapperSearch}>
            <IconSearch />
          </View>
        </>
      );
    } else {
      return <InputSearch />;
    }
  };
  return (
    <View style={styles.container}>
      <ContentHeader />
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginHorizontal: 16,
    justifyContent: 'space-between',
    alignItems: 'center',
    height: responsiveHeight(60),
  },
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
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
    alignItems: 'center',
  },
  seasonTitle: {
    fontFamily: fonts.sora.medium,
    fontSize: 6,
    color: colors.onBackground,
  },
  wrapperSearch: {
    flexDirection: 'row',
    padding: 3,
    backgroundColor: colors.onPrimary,
    borderRadius: 5,
  },
});
