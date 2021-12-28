import {useNavigation} from '@react-navigation/native';
import React, {useCallback, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {getAllNew, getAnimeByGenre, getMoreAllNew} from '../../../config';
import {
  colors,
  IMG_ANIME_URL,
  IMG_EPISODE_URL,
  responsiveHeight,
} from '../../../utils';
import {Spacing} from '../../atoms';
import {GenreButton, MainCardFilm} from '../../molecules';

// let stopLoadMore = true;

const AnimeGenreList = ({loading}) => {
  const navigation = useNavigation();
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [isLoading, setLoading] = useState(loading);
  const [page, setPage] = useState(0);
  const [stopLoadMore, setStopLoadMore] = useState(true);

  const getMovieList = useCallback(async () => {
    setLoading(true);
    const allAnime = await getAllNew();
    const animeGenre = await getAnimeByGenre();
    setMovies(allAnime.data.episodes);
    setGenres(animeGenre.data);
    setLoading(false);
  }, []);

  useEffect(() => {
    getMovieList();
  }, [getMovieList]);

  const numColumns = 3;
  const size = Dimensions.get('window').width / numColumns - 20;

  const _itemSeparator = () => {
    return <View style={styles.separator} />;
  };

  const loadMoreMovies = async () => {
    setLoading(true);
    if (!stopLoadMore) {
      setPage(page + 1);
      const res = await getMoreAllNew(page);
      // const pages = res.data.pages;
      // console.log('pages>>', pages);
      if (!res.error) {
        setMovies([...movies, ...res.data.episodes]);
        // setMoreMovies(res.data.episodes);
        setStopLoadMore(true);
        // setIsPage(true);
      }
      return;
    }
    setLoading(false);
  };
  // console.log('page>>', page);
  // console.log('movies>>', movies);
  const _renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('Detail', {animeId: item.sub_id})}>
        <MainCardFilm
          key={item.post_id}
          title={item.post_name}
          rating={item.rate}
          thumbnail={`${IMG_EPISODE_URL}/${item.post_image}`}
          width={size}
          margin={0}
          isLoading={isLoading}
        />
      </TouchableOpacity>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      {/* {isLoading ? (
        <View style={styles.loading}>
          <ActivityIndicator
            size="large"
            color={colors.onPrimary}
            // style={styles.loading}
          />
        </View>
      ) : ( */}
      {/* <GenreButton navigation={navigation} /> */}
      <FlatList
        data={movies}
        renderItem={_renderItem}
        ItemSeparatorComponent={_itemSeparator}
        keyExtractor={item => item.post_id.toString()}
        numColumns={numColumns}
        // initialNumToRender={12}
        // scrollToEnd={() => ({animated: true})}
        // ListHeaderComponent={() => <GenreButton navigation={navigation} />}
        // ListFooterComponent={() => <Spacing height={responsiveHeight(140)} />}
        onEndReached={loadMoreMovies}
        onEndReachedThreshold={0.5}
        onMomentumScrollBegin={() => setStopLoadMore(false)}
        ListFooterComponent={() =>
          isLoading ? (
            <View style={styles.loading}>
              <ActivityIndicator size="large" color={colors.onBackground} />
            </View>
          ) : (
            <Spacing height={responsiveHeight(140)} />
          )
        }
      />
      {/* )} */}
    </SafeAreaView>
  );
};

export default AnimeGenreList;

const styles = StyleSheet.create({
  container: {
    margin: 16,
  },
  separator: {
    height: 12,
    width: '100%',
    backgroundColor: 'transparent',
  },
  loading: {
    flex: 1,

    justifyContent: 'center',
    alignItems: 'center',
  },
});
