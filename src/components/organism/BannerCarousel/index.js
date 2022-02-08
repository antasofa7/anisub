import React, {useEffect, useRef, useState} from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';
import {SafeAreaView} from 'react-native-safe-area-context';
import Carousel from 'react-native-snap-carousel';
import {IconStarActive} from '../../../assets';
import {
  colors,
  fonts,
  IMG_ANIME_URL,
  responsiveHeight,
  responsiveWidth,
} from '../../../utils';

const {width: screenWidth} = Dimensions.get('window');
const {height: screenHeight} = Dimensions.get('window');

const BannerCarousel = ({navigation, hotMovies}) => {
  const carouselRef = useRef(null);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    setMovies(hotMovies);
  }, [hotMovies]);

  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() => navigation('Detail', {animeId: item.sub_id})}>
        <View style={styles.item}>
          <FastImage
            key={index}
            source={{
              uri: `${IMG_ANIME_URL}/${item.sub_banner}` || 'Hot Anime',
              priority: FastImage.priority.normal,
            }}
            style={styles.image}
          />
          <LinearGradient
            colors={['rgba(13, 9, 0, 0)', 'rgba(13, 9, 0, 0.75)']}
            style={styles.linearGradient}
          />
          <View style={styles.wrapperRating}>
            <IconStarActive />
            <Text style={styles.rating}>{item.rate}</Text>
          </View>
          <Text style={styles.title} numberOfLines={2}>
            {item.sub_name}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Carousel
        ref={carouselRef}
        sliderWidth={screenWidth}
        sliderHeight={screenHeight}
        itemWidth={responsiveWidth(230)}
        data={movies}
        renderItem={renderItem}
        autoplay={true}
        loop={true}
      />
    </SafeAreaView>
  );
};

export default BannerCarousel;

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    height: responsiveHeight(270),
  },
  item: {
    width: responsiveWidth(220),
    height: responsiveHeight(270),
  },
  image: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'cover',
    borderRadius: 20,
  },
  linearGradient: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    width: responsiveWidth(220),
    height: responsiveHeight(270),
    borderRadius: 20,
  },
  wrapperRating: {
    flexDirection: 'row',
    position: 'absolute',
    top: 16,
    right: 12,
    alignItems: 'center',
    backgroundColor: colors.background,
    borderRadius: 8,
    opacity: 0.8,
  },
  rating: {
    color: colors.onBackground,
    paddingRight: 8,
    fontSize: 16,
    fontFamily: fonts.nunito.bold,
  },
  title: {
    zIndex: 2,
    position: 'absolute',
    bottom: 24,
    left: 12,
    right: 12,
    fontSize: 24,
    fontFamily: fonts.nunito.bold,
    color: colors.onBackground,
  },
  loading: {
    flex: 1,
    width: responsiveWidth(220),
    justifyContent: 'center',
    alignItems: 'center',
  },
});
