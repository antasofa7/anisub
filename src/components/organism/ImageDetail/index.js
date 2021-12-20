import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {
  IconBack,
  IconBookmark,
  IconPlayCircle,
  ImageForDetail,
} from '../../../assets';

import {colors, fonts, responsiveHeight, responsiveWidth} from '../../../utils';

const ImageDetail = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Image source={ImageForDetail} style={styles.imageDetail} />
      <LinearGradient
        colors={['rgba(13, 9, 0, 0)', 'rgba(13, 9, 0, 1)']}
        style={styles.linearGradient}
      />
      <IconBack style={styles.iconBack} onPress={() => navigation.goBack()} />
      <IconBookmark style={styles.iconBookmark} />
      <IconPlayCircle style={styles.iconPlay} />
      <View style={styles.wrapperTitle}>
        <Text style={styles.episode}>Episode 09 - 03 Dec 2021</Text>
        <Text style={styles.title}>Death Note - Session 2</Text>
      </View>
    </View>
  );
};

export default ImageDetail;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.onBackground,
  },
  imageDetail: {
    width: responsiveWidth(360),
    height: responsiveHeight(270),
  },
  linearGradient: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    width: responsiveWidth(360),
    height: responsiveHeight(270),
  },
  iconBookmark: {
    position: 'absolute',
    top: 16,
    right: 16,
    opacity: 0.9,
  },
  iconBack: {
    position: 'absolute',
    top: 16,
    left: 16,
    opacity: 0.5,
  },
  iconPlay: {
    position: 'absolute',
    top: 105,
    left: 140,
    opacity: 0.9,
  },
  wrapperTitle: {
    position: 'absolute',
    left: 16,
    bottom: 0,
  },
  episode: {
    fontFamily: fonts.sora.regular,
    fontSize: 12,
    color: colors.onBackground,
    marginBottom: 8,
  },
  title: {
    fontFamily: fonts.nunito.bold,
    fontSize: 22,
    color: colors.onBackground,
  },
});
