import React, {useCallback, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  StyleSheet,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {getAllNew, getAnimeByGenre} from '../../../config';
import {colors, responsiveHeight} from '../../../utils';
import {Spacing} from '../../atoms';
import {MainCardFilm} from '../../molecules';

const AnimeGenreList = ({loading}) => {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [isLoading, setLoading] = useState(loading);

  const getMovieList = useCallback(async () => {
    setLoading(true);
    const allAnime = await getAllNew();
    const animeGenre = await getAnimeByGenre();
    setMovies(allAnime.data.episodes);
    setGenres(animeGenre.data);
    setLoading(false);
  }, []);
  // console.log('isLoading>>', loading);

  useEffect(() => {
    getAllNew();
    getMovieList();
  }, [getMovieList]);

  const IMG_URL = 'https://testapi.my.id/images/episode';
  const IMG_GENRE_URL = 'https://testapi.my.id/images/anime';

  const numColumns = 3;
  const size = Dimensions.get('window').width / numColumns - 20;

  const _itemSeparator = () => {
    return <View style={styles.separator} />;
  };
  // console.log('isLoading>>', isLoading);

  const _renderItem = ({item, index}) => {
    return (
      <MainCardFilm
        key={item.post_id}
        title={item.post_name}
        rating={item.rate}
        thumbnail={`${IMG_URL}/${item.post_image}`}
        width={size}
        margin={0}
        isLoading={isLoading}
      />
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      {isLoading ? (
        <View style={styles.loading}>
          <ActivityIndicator
            size="large"
            color={colors.onPrimary}
            // style={styles.loading}
          />
        </View>
      ) : (
        <FlatList
          data={movies}
          renderItem={_renderItem}
          ItemSeparatorComponent={_itemSeparator}
          keyExtractor={item => item.post_id.toString()}
          numColumns={numColumns}
          initialNumToRender={12}
          // scrollToIndex={() => ({animated: true, index: 0})}
          scrollToEnd={() => ({animated: true})}
          ListFooterComponent={() => <Spacing height={responsiveHeight(180)} />}
        />
      )}
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
});
