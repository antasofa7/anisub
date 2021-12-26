import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {colors, fonts, responsiveHeight, responsiveWidth} from '../../../utils';
import {ImageLoading, Star} from '../../atoms';

const CardNewAllMovie = props => {
  const {title, rating, thumbnail, width, margin, isLoading} = props;
  // console.log('loading >>', isLoading);

  return (
    <View style={styles.container(margin)}>
      {isLoading ? (
        <ImageLoading />
      ) : (
        <Image
          source={{
            uri: thumbnail || '../../../assets/images/image-default.jpg',
          }}
          style={styles.imageThumbnail(width)}
        />
      )}
      <LinearGradient
        colors={['rgba(13, 9, 0, 0)', 'rgba(13, 9, 0, 0.85)']}
        style={styles.linearGradient(width)}
      />
      <View style={styles.wrapperTitle}>
        <Text style={styles.title}>{title}</Text>
        <Star rating={rating} size={12} />
      </View>
    </View>
  );
};

export default CardNewAllMovie;

const styles = StyleSheet.create({
  container: margin => ({
    marginRight: margin ? margin : responsiveWidth(12),
  }),
  imageThumbnail: width => ({
    width: width ? width : responsiveWidth(100),
    height: responsiveHeight(110),
    borderRadius: 10,
    resizeMode: 'cover',
  }),
  linearGradient: width => ({
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    width: responsiveWidth(100) || width,
    height: responsiveHeight(110),
    borderRadius: 10,
  }),
  wrapperTitle: {
    position: 'absolute',
    left: 4,
    bottom: 8,
    width: responsiveWidth(100),
  },
  title: {
    color: colors.onBackground,
    fontSize: 8,
    fontFamily: fonts.sora.medium,
  },
});
