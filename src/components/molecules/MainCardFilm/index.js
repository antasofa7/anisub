import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';
import {colors, fonts, responsiveHeight, responsiveWidth} from '../../../utils';
import Star from '../../atoms/Star';

const MainCardFilm = props => {
  const {title, rating, thumbnail, width, margin, episode} = props;

  return (
    <View style={styles.container(margin)}>
      <FastImage
        source={{
          uri: thumbnail || '../../../assets/images/image-default.jpg',
          priority: FastImage.priority.normal,
        }}
        style={styles.imageThumbnail(width)}
      />
      <LinearGradient
        colors={['rgba(13, 9, 0, 0)', 'rgba(13, 9, 0, 0.85)']}
        style={styles.linearGradient(width)}
      />
      <View style={styles.wrapperTitle(width)}>
        <Text style={styles.title} numberOfLines={2}>
          {title}
        </Text>
        {episode && <Text style={styles.episode}>Episode {episode}</Text>}
        {rating && <Star rating={rating} size={20} />}
      </View>
    </View>
  );
};

export default MainCardFilm;

const styles = StyleSheet.create({
  container: margin => ({
    marginRight: margin || responsiveWidth(14),
  }),
  imageThumbnail: width => ({
    width: width || responsiveWidth(110),
    height: responsiveHeight(170),
    borderRadius: 10,
    resizeMode: 'cover',
  }),
  linearGradient: width => ({
    position: 'absolute',
    top: 0,
    left: 0,
    width: width || responsiveWidth(110),
    height: responsiveHeight(170),
    borderRadius: 10,
  }),
  wrapperTitle: width => ({
    position: 'absolute',
    left: 6,
    bottom: 8,
    width: width - 16 || responsiveWidth(110),
  }),
  title: {
    color: colors.onBackground,
    fontSize: 12,
    fontFamily: fonts.sora.medium,
    marginLeft: 3,
  },
  episode: {
    color: colors.secondary,
    fontSize: 9,
    fontFamily: fonts.sora.regular,
    marginBottom: 3,
    marginLeft: 3,
  },
});
