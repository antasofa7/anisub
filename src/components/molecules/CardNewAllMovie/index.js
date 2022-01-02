import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';
import {colors, fonts, responsiveHeight, responsiveWidth} from '../../../utils';
import {Star} from '../../atoms';

const CardNewAllMovie = props => {
  const {title, rating, thumbnail, width, margin, isLoading} = props;

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
        <Star rating={rating} size={14} />
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
    width: width ? width : responsiveWidth(110),
    height: responsiveHeight(110),
    borderRadius: 10,
    resizeMode: 'cover',
  }),
  linearGradient: width => ({
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    width: responsiveWidth(110) || width,
    height: responsiveHeight(110),
    borderRadius: 10,
  }),
  wrapperTitle: {
    position: 'absolute',
    left: 4,
    right: 4,
    bottom: 8,
    width: responsiveWidth(100),
  },
  title: {
    color: colors.onBackground,
    fontSize: 10,
    fontFamily: fonts.sora.medium,
  },
});
