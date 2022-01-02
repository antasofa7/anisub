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
import Carousel from 'react-native-snap-carousel';
import {IconStarActive} from '../../../assets';
import {getHotMovies, getMoreHotMovies} from '../../../config';
import {
  colors,
  fonts,
  IMG_ANIME_URL,
  responsiveHeight,
  responsiveWidth,
} from '../../../utils';

const {width: screenWidth} = Dimensions.get('window');
const {height: screenHeight} = Dimensions.get('window');

let stopLoadMore = true;

const BannerCarousel = ({navigation, isPages}) => {
  const carouselRef = useRef(null);
  const [movies, setMovies] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [page, setPage] = useState(0);

  const getMovieList = useCallback(async () => {
    const res = await getHotMovies();
    setMovies(res.data.animes);
  }, []);

  useEffect(() => {
    getMovieList();
  }, [getMovieList]);

  const loadMoreMovies = async () => {
    setLoading(true);
    if (!stopLoadMore) {
      setPage(page + 1);
      const res = await getMoreHotMovies(page);
      if (res.error) {
        return null;
      }
      setMovies([...movies, ...res.data.animes]);
      stopLoadMore = true;
    }
    setLoading(false);
  };

  const renderItem = ({item, index}, parallaxProps) => {
    return (
      <TouchableOpacity
        onPress={() => navigation('Detail', {animeId: item.sub_id})}>
        <View style={styles.item}>
          <FastImage
            key={item.sub_id}
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
    <View style={styles.container}>
      <Carousel
        ref={carouselRef}
        sliderWidth={screenWidth}
        sliderHeight={screenHeight}
        itemWidth={responsiveWidth(240)}
        data={movies}
        renderItem={renderItem}
        onEndReached={loadMoreMovies}
        onEndReachedThreshold={0.5}
        onMomentumScrollBegin={() => {
          stopLoadMore = false;
        }}
        ListFooterComponent={() =>
          isLoading && (
            <View style={styles.loading}>
              <ActivityIndicator size="large" color={colors.onPrimary} />
            </View>
          )
        }
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
    width: responsiveWidth(230),
    height: responsiveHeight(280),
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
    width: responsiveWidth(230),
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
    bottom: 16,
    left: 16,
    right: 16,
    fontSize: 24,
    fontFamily: fonts.nunito.bold,
    color: colors.onBackground,
  },
  loading: {
    flex: 1,
    width: responsiveWidth(230),
    justifyContent: 'center',
    alignItems: 'center',
  },
});
