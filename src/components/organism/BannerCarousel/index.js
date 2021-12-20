import {useNavigation} from '@react-navigation/native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  Dimensions,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Carousel, {ParallaxImage} from 'react-native-snap-carousel';
import {IconStarActive} from '../../../assets';
import {getHotMovies} from '../../../config';
import {colors, fonts, responsiveHeight, responsiveWidth} from '../../../utils';

const {width: screenWidth} = Dimensions.get('window');
const {height: screenHeight} = Dimensions.get('window');

const BannerCarousel = () => {
  const carouselRef = useRef(null);
  const navigation = useNavigation();
  const [movies, setMovies] = useState([]);

  const getMovieList = useCallback(async () => {
    const res = await getHotMovies();
    setMovies(res.data.animes);
  }, []);

  useEffect(() => {
    getMovieList();
  }, [getMovieList]);

  const IMG_URL = 'https://testapi.my.id/images/anime';

  const renderItem = ({item, index}, parallaxProps) => {
    return (
      <Pressable onPress={() => navigation.navigate('Detail')}>
        <View style={styles.item} onPress={() => navigation.navigate('Detail')}>
          <ParallaxImage
            key={item.sub_id}
            source={{uri: `${IMG_URL}/${item.sub_banner}` || 'kjjk'}}
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
            <Text style={styles.rating}>{item.rate}</Text>
          </View>
          <Text style={styles.title} numberOfLines={3}>
            {item.sub_name}
          </Text>
        </View>
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      <Carousel
        ref={carouselRef}
        sliderWidth={screenWidth}
        sliderHeight={screenHeight}
        itemWidth={responsiveWidth(216)}
        data={movies}
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
    resizeMode: 'cover',
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
    left: 12,
    right: 18,
    fontSize: 20,
    fontFamily: fonts.nunito.bold,
    color: colors.onBackground,
  },
});
