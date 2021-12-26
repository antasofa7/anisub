import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Carousel, {ParallaxImage} from 'react-native-snap-carousel';
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
  const [moreMovies, setMoreMovies] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [isPage, setIsPage] = useState(isPages);

  const getMovieList = useCallback(async () => {
    const res = await getHotMovies();
    setMovies(res.data.animes);
  }, []);

  useEffect(() => {
    getMovieList();
  }, [getMovieList]);

  const loadMoreMovies = async () => {
    if (!stopLoadMore) {
      setLoading(true);
      setPage(page + 1);
      const res = await getMoreHotMovies(page);
      if (res.data.pages) {
        setMoreMovies(res.data.animes);
        stopLoadMore = true;
        setIsPage(true);
      } else {
      }
      console.log('err>>', res.data);
    }
    setLoading(false);
  };
  // console.log('animes>>', movies);
  // console.log('pageUp>>', page);
  // console.log('isPage>>', isPage);

  const renderItem = ({item, index}, parallaxProps) => {
    return (
      <TouchableOpacity
        onPress={() => navigation('Detail', {animeId: item.sub_id})}>
        <View
          style={styles.item}
          // onPress={() =>
          //   this.props.navigation.navigate('Detail', {animeId: item.sub_id})
          // }
        >
          <Image
            key={item.sub_id}
            source={{uri: `${IMG_ANIME_URL}/${item.sub_banner}` || 'Hot Anime'}}
            // containerStyle={styles.imageContainer}
            style={styles.image}
            // parallaxFactor={0.4}
            // {...parallaxProps}
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
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Carousel
        // horizontal
        ref={carouselRef}
        sliderWidth={screenWidth}
        sliderHeight={screenHeight}
        itemWidth={responsiveWidth(240)}
        data={!isPage ? movies : moreMovies}
        renderItem={renderItem}
        // hasParallaxImages={true}
        // firstItem={3}
        // autoplay={true}
        // autoplayDelay={1000}
        // loop={true}
        onEndReached={loadMoreMovies}
        onEndReachedThreshold={0.5}
        onMomentumScrollBegin={() => {
          stopLoadMore = false;
        }}
        ListFooterComponent={() =>
          isLoading && (
            <View style={styles.loading}>
              <ActivityIndicator />
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
  // imageContainer: {
  //   flex: 1,
  //   marginBottom: Platform.select({ios: 0, android: 1}), // Prevent a random Android rendering issue
  //   backgroundColor: colors.onPrimary,
  //   borderRadius: 20,
  // },
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
