import React, {useCallback, useEffect, useState} from 'react';
import {Dimensions, FlatList, StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {MainCardFilm} from '../..';
import {getAllNew, getAnimeByGenre} from '../../../config';

const AnimeGenreList = ({animes}) => {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);

  const getMovieList = useCallback(async () => {
    const allAnime = await getAllNew();
    const animeGenre = await getAnimeByGenre();
    setMovies(allAnime.data.episodes);
    setGenres(animeGenre.data);
  }, []);

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

  const _renderItem = ({item, index}) => {
    return (
      <MainCardFilm
        key={item.post_id}
        title={item.post_name}
        rating={item.rate}
        thumbnail={`${IMG_URL}/${item.post_image}`}
        width={size}
        margin={0}
      />
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={movies}
        renderItem={_renderItem}
        ItemSeparatorComponent={_itemSeparator}
        keyExtractor={(item, index) => `key-${index}`}
        numColumns={numColumns}
      />
    </SafeAreaView>
  );
};

export default AnimeGenreList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 16,
  },
  separator: {
    height: 12,
    width: '100%',
    backgroundColor: 'transparent',
  },
});
