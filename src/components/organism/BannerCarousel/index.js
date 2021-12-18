import React, {useRef} from 'react';
import {Dimensions, Platform, StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Carousel, {ParallaxImage} from 'react-native-snap-carousel';
import {IconStarActive} from '../../../assets';
import {colors, fonts, responsiveHeight, responsiveWidth} from '../../../utils';

const {width: screenWidth} = Dimensions.get('window');
const {height: screenHeight} = Dimensions.get('window');

const BannerCarousel = ({animes}) => {
  const carouselRef = useRef(null);

  const renderItem = ({item, index}, parallaxProps) => {
    return (
      <View style={styles.item}>
        <ParallaxImage
          key={index}
          source={item.thumbnail}
          containerStyle={styles.imageContainer}
          style={styles.image}
          parallaxFactor={0.4}
          {...parallaxProps}
        />
        <LinearGradient
          colors={['rgba(13, 9, 0, 0)', 'rgba(13, 9, 0, 0.75)']}
          style={styles.linearGradient}
        />
        <View style={styles.wrapperRating}>
          <IconStarActive />
          <Text style={styles.rating}>{item.rating}</Text>
        </View>
        <Text style={styles.title} numberOfLines={3}>
          {item.title}
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Carousel
        ref={carouselRef}
        sliderWidth={screenWidth}
        sliderHeight={screenHeight}
        itemWidth={responsiveWidth(216)}
        data={animes}
        renderItem={renderItem}
        hasParallaxImages={true}
      />
    </View>
  );
};

export default BannerCarousel;

const styles = StyleSheet.create({
  container: {
    height: responsiveHeight(280),
  },
  item: {
    width: responsiveWidth(200),
    height: responsiveHeight(280),
  },
  imageContainer: {
    flex: 1,
    marginBottom: Platform.select({ios: 0, android: 1}), // Prevent a random Android rendering issue
    backgroundColor: colors.onBackground,
    borderRadius: 20,
  },
  image: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'contain',
  },
  linearGradient: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    width: responsiveWidth(200),
    height: responsiveHeight(280),
    borderRadius: 20,
  },
  wrapperRating: {
    flexDirection: 'row',
    position: 'absolute',
    top: 16,
    right: 8,
    alignItems: 'center',
    backgroundColor: colors.background,
    borderRadius: 8,
    opacity: 0.8,
  },
  rating: {
    color: colors.onBackground,
    paddingRight: 10,
  },
  title: {
    zIndex: 2,
    position: 'absolute',
    bottom: 12,
    left: 16,
    right: 16,
    fontSize: 32,
    fontFamily: fonts.nunito.bold,
    color: colors.onBackground,
    backgroundColor: 'transparent',
  },
});
