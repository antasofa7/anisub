import {useNavigation} from '@react-navigation/native';
import React, {useCallback, useEffect, useState} from 'react';
import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {IconBack} from '../../assets';
import Spacing from '../../components/atoms/Spacing';
import {LoadingPage} from '../../components/atoms/Loading';
import {ListFooterComponent} from '../../components/atoms/Loading/ListFooterComponent';
import {MainCardFilm} from '../../components/molecules';
import {getMorePlaylistyByGenre, getPlaylistyByGenre} from '../../config';
import {
  colors,
  fonts,
  IMG_ANIME_URL,
  responsiveHeight,
  responsiveWidth,
} from '../../utils';
import BannerAds from '../../components/organism/BannerAds';

const GenrePage = ({route}) => {
  const navigation = useNavigation();
  const {genre} = route.params;
  const [movies, setMovies] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [isMoreLoading, setMoreLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [isPage, setIsPage] = useState(false);
  const [stopLoadMore, setStopLoadMore] = useState(false);
  const [allDataDisplayed, setAllDataDisplayed] = useState(false);

  const getMovieList = useCallback(async () => {
    setLoading(true);
    const res = await getPlaylistyByGenre(genre.genre_id);
    setMovies(res.data.getAnime);
    setIsPage(res.data.pages);
    setLoading(false);

    if (!res.data.pages) {
      setAllDataDisplayed(true);
      setMoreLoading(false);
    }
  }, [genre]);

  useEffect(() => {
    getMovieList();
  }, [getMovieList]);

  const numColumns = 2;
  const size = Dimensions.get('window').width / numColumns - 24;

  const _renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('Detail', {animeId: item.sid_new})}>
        <MainCardFilm
          key={item.sub_id}
          title={item.sub_name}
          rating={item.rate}
          thumbnail={`${IMG_ANIME_URL}/${item.sub_banner}`}
          width={size}
          margin={0}
        />
      </TouchableOpacity>
    );
  };

  const _itemSeparator = () => {
    return <View style={styles.separator} />;
  };

  const loadMoreMovies = async () => {
    try {
      if (!stopLoadMore) {
        if (isPage) {
          setMoreLoading(true);
          const res = await getMorePlaylistyByGenre(genre.genre_id, page);
          setMovies([...movies, ...res.data.getAnime]);
          setIsPage(res.data.pages);
          setPage(page + 1);
          setStopLoadMore(true);

          setMoreLoading(false);
        } else {
          setAllDataDisplayed(true);
          setMoreLoading(false);
        }
      }
      setMoreLoading(false);
    } catch (error) {
      console.log('error >> ', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {isLoading ? (
        <LoadingPage />
      ) : (
        <>
          <BannerAds marginHorizontal />
          <View style={styles.wrapper}>
            <View style={styles.header}>
              <View style={styles.iconBack}>
                <IconBack onPress={() => navigation.goBack()} />
              </View>
              <Spacing width={16} />
              <Text style={styles.subTitle}>Genre: </Text>
              <Text numberOfLines={1} style={styles.title}>
                {genre.genre_name}
              </Text>
            </View>
            <FlatList
              data={movies}
              renderItem={_renderItem}
              ItemSeparatorComponent={_itemSeparator}
              keyExtractor={(item, index) => String(index)}
              numColumns={numColumns}
              onEndReached={loadMoreMovies}
              onEndReachedThreshold={0.1}
              onMomentumScrollBegin={() => setStopLoadMore(false)}
              ListHeaderComponent={() => <Spacing height={16} />}
              ListFooterComponent={
                <ListFooterComponent
                  isMoreLoading={isMoreLoading}
                  allDataDisplayed={allDataDisplayed}
                />
              }
              removeClippedSubviews={true} // Unmount components when outside of window
              initialNumToRender={4} // Reduce initial render amount
              maxToRenderPerBatch={1} // Reduce number in each render batch
            />
          </View>
        </>
      )}
    </SafeAreaView>
  );
};

export default GenrePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  wrapper: {
    margin: 16,
  },
  header: {
    width: responsiveWidth(360),
    height: responsiveHeight(40),
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  iconBack: {
    opacity: 0.5,
  },
  title: {
    fontFamily: fonts.sora.medium,
    fontSize: 18,
    color: colors.secondary,
    marginTop: -3,
  },
  subTitle: {
    fontFamily: fonts.sora.regular,
    fontSize: 18,
    color: colors.onBackground,
    marginTop: -3,
  },
  separator: {
    height: 14,
    width: '100%',
    backgroundColor: 'transparent',
  },
});
