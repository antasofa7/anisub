import React, {useCallback, useEffect, useState} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {Logo} from '../../../assets';
import {getHotMovies} from '../../../config';
import {colors, fonts, responsiveHeight, responsiveWidth} from '../../../utils';
import Spacing from '../../atoms/Spacing';

const Header = () => {
  const [season, setSeason] = useState([]);
  const getSeason = useCallback(async () => {
    const res = await getHotMovies();
    setSeason(res.data.animes[0]);
  }, []);

  useEffect(() => {
    getSeason();
  }, [getSeason]);

  return (
    <View style={styles.container}>
      <View style={styles.wrapperLogo}>
        <Image source={Logo} style={styles.logo} />
      </View>
      <View style={styles.season}>
        <Text style={styles.seasonTitle}>Season: {season.season}</Text>
        <Spacing width={4} />
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
    fontSize: 14,
    color: colors.secondary,
  },
});
