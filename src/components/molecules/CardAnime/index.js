import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';
import {colors, fonts, responsiveHeight, responsiveWidth} from '../../../utils';
import Star from '../../atoms/Star';

const CardAnime = props => {
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
      <View style={styles.wrapperTitle}>
        <Text style={styles.title} numberOfLines={2}>
          {title}
        </Text>
        {episode && <Text style={styles.episode}>Episode {episode}</Text>}
        {rating && <Star rating={rating} size={18} />}
      </View>
    </View>
  );
};

export default CardAnime;

const styles = StyleSheet.create({
  container: margin => ({
    marginRight: margin ? margin : responsiveWidth(12),
  }),
  imageThumbnail: width => ({
    width: width || responsiveWidth(120),
    height: responsiveHeight(130),
    borderRadius: 10,
    resizeMode: 'cover',
  }),
  linearGradient: width => ({
    position: 'absolute',
    top: 0,
    left: 0,
    width: width || responsiveWidth(120),
    height: responsiveHeight(130),
    borderRadius: 10,
  }),
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
  episode: {
    color: colors.secondary,
    fontSize: 10,
    fontFamily: fonts.sora.regular,
    marginBottom: 3,
    marginLeft: 3,
  },
});
