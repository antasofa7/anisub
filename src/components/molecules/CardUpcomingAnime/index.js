import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';
import {colors, fonts, responsiveHeight, responsiveWidth} from '../../../utils';
import Star from '../../atoms/Star';

const CardUpcomingAnime = props => {
  const {title, rating, thumbnail} = props;

  return (
    <View style={styles.container}>
      <FastImage
        source={{
          uri: thumbnail || '../../../assets/images/image-default.jpg',
          priority: FastImage.priority.normal,
        }}
        style={styles.imageThumbnail}
      />
      <LinearGradient
        colors={['rgba(13, 9, 0, 0)', 'rgba(13, 9, 0, 0.85)']}
        style={styles.linearGradient}
      />
      <View style={styles.wrapperTitle}>
        <Text style={styles.title} numberOfLines={2}>
          {title}
        </Text>
        <Star rating={rating} size={18} />
      </View>
    </View>
  );
};

export default CardUpcomingAnime;

const styles = StyleSheet.create({
  container: {
    marginRight: responsiveWidth(12),
  },
  imageThumbnail: {
    width: responsiveWidth(120),
    height: responsiveHeight(130),
    borderRadius: 10,
    resizeMode: 'cover',
  },
  linearGradient: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    width: responsiveWidth(120),
    height: responsiveHeight(130),
    borderRadius: 10,
  },
  wrapperTitle: {
    position: 'absolute',
    left: 4,
    bottom: 8,
    width: responsiveWidth(110),
  },
  title: {
    color: colors.onBackground,
    fontSize: 11,
    fontFamily: fonts.sora.medium,
    marginLeft: 3,
  },
});
