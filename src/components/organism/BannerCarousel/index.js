import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
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
import {getRecommendation} from '../../../config';
import {
  colors,
  fonts,
  IMG_ANIME_URL,
  responsiveHeight,
  responsiveWidth,
} from '../../../utils';

const {width: screenWidth} = Dimensions.get('window');
const {height: screenHeight} = Dimensions.get('window');

const BannerCarousel = ({navigation}) => {
  const carouselRef = useRef(null);
  const [movies, setMovies] = useState([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setLoading] = useState(false);

  const getMovieList = useCallback(async () => {
    setLoading(true);
    const res = await getRecommendation();
    setMovies(res.data.animes);
    setTotal(res.data.animes.length);
    setLoading(false);
  }, []);

  useEffect(() => {
    getMovieList();
  }, [getMovieList]);

  const renderItem = ({item, index}) => {
    const indexItem = index <= total + 2 ? index - 2 : 1;
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
          <Text style={styles.total}>{`${indexItem}/${total}`}</Text>
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
      {isLoading ? (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color={colors.secondary} />
        </View>
      ) : (
        <Carousel
          ref={carouselRef}
          sliderWidth={screenWidth}
          sliderHeight={screenHeight}
          itemWidth={responsiveWidth(170)}
          data={movies}
          renderItem={renderItem}
          autoplay={true}
          loop={true}
          // onEndReached={loadMoreMovies}
          // onEndReachedThreshold={0.1}
          // onMomentumScrollBegin={() => {
          //   setStopLoadMore(false);
          // }}
          // ListFooterComponent={() => (
          //   <View style={styles.loading}>
          //     {allDataDisplayed ? (
          //       <Text style={styles.TextDisplayed}>All data is displayed.</Text>
          //     ) : (
          //       <ActivityIndicator size="large" color={colors.secondary} />
          //     )}
          //   </View>
          // )}
        />
      )}
    </SafeAreaView>
  );
};

export default BannerCarousel;

const styles = StyleSheet.create({
  container: {
    height: responsiveHeight(210),
  },
  item: {
    width: responsiveWidth(160),
    height: responsiveHeight(210),
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
    width: responsiveWidth(160),
    height: responsiveHeight(210),
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
  total: {
    position: 'absolute',
    top: 16,
    left: 8,
    color: colors.onBackground,
  },
  title: {
    zIndex: 2,
    position: 'absolute',
    bottom: 16,
    left: 8,
    right: 8,
    fontSize: 18,
    fontFamily: fonts.nunito.bold,
    color: colors.onBackground,
  },
  loading: {
    flex: 1,
    width: responsiveWidth(160),
    justifyContent: 'center',
    alignItems: 'center',
  },
  TextDisplayed: {
    color: colors.onBackground,
    fontFamily: fonts.sora.regular,
    fontSize: 10,
  },
});
