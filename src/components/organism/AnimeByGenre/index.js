import React, {useCallback, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {getAnimeByGenre} from '../../../config';
import {colors, fonts, IMG_ANIME_URL} from '../../../utils';
import {MainCardFilm} from '../../molecules';

const AnimeByGenre = ({navigation}) => {
  // const [genres, setGenres] = useState([]);
  const [movies, setMovies] = useState([]);
  const [isLoading, setLoading] = useState(true);
  // const [isLoadingGenre, setLoadingGenre] = useState(true);

  // const getGenreList = useCallback(async () => {
  //   setLoadingGenre(true);
  //   const res = await getGenres();
  //   res.data.map(item => {
  //     console.log(item.genre_name);
  //   });
  //   setGenres(res.data);
  //   setLoadingGenre(false);
  // }, []);

  // console.log(genres);
  const getMovieList = useCallback(async () => {
    setLoading(true);
    const res = await getAnimeByGenre();
    setMovies(res.data);
    setLoading(false);
  }, []);

  useEffect(() => {
    // getGenreList();
    getMovieList();
  }, [getMovieList]);

  const _renderItem = ({item, index}) => {
    return (
      <View key={item.sub_id} style={styles.wrapperItem}>
        <TouchableOpacity
          onPress={() => navigation('Detail', {animeId: item.sub_id})}>
          {/* <Text style={styles.label}>{item.name}</Text>
        <ScrollView horizontal={true} style={styles.wrapperItem}>
          {genre.animes.map(anime => {
            return ( */}
          <MainCardFilm
            key={item.sub_id}
            title={item.sub_name}
            //   rating={item.rate}
            thumbnail={`${IMG_ANIME_URL}/${item.sub_banner}`}
            isLoading={isLoading}
            // onPress={() => navigation.navigate("movie", { movieId: item.id })}
          />
          {/* //     );
        //   })}
        // </ScrollView> */}
        </TouchableOpacity>
      </View>
    );
  };
  // console.log('movies ', movies);

  return (
    <SafeAreaView style={styles.container}>
      {isLoading ? (
        <View style={styles.loading}>
          <ActivityIndicator
            size="large"
            color={colors.onPrimary}
            // style={styles.loading}
          />
          {/* {genresName.map(genre => {
            return (
              <View style={styles.wrapper} key={genre.genre_id}>
                <Text style={styles.label}>{genre.genre_name}</Text>
                <View style={styles.wrapperImageLoading}>
                  <ImageLoading margin />
                  <ImageLoading margin />
                  <ImageLoading />
                </View>
              </View>
            );
          })} */}
        </View>
      ) : (
        <View>
          {movies.map(genre => {
            return (
              <View key={genre.genre_id}>
                <Text style={styles.label}>{genre.genre_name}</Text>
                <FlatList
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  data={genre.animes}
                  renderItem={_renderItem}
                  initialNumToRender={3}
                  // ItemSeparatorComponent={_itemSeparator}
                  keyExtractor={item => item.sub_id.toString()}
                  // numColumns={numColumns}
                  // scrollToIndex={() => ({animated: true, index: 0})}
                  scrollToEnd={() => ({animated: true})}
                />
              </View>
            );
          })}
        </View>
      )}
    </SafeAreaView>
  );
};

export default AnimeByGenre;

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    marginHorizontal: 16,
  },
  wrapper: {
    marginTop: 16,
  },
  wrapperItem: {
    flexDirection: 'row',
    marginTop: 8,
  },
  label: {
    fontSize: 14,
    fontFamily: fonts.sora.medium,
    color: colors.onBackground,
  },
  wrapperImageLoading: {
    flexDirection: 'row',
    marginTop: 8,
  },
  loading: {
    marginTop: 16,
  },
});
