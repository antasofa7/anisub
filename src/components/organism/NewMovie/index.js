import React, {useCallback, useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {MainCardFilm} from '../..';
import {getNewMovies} from '../../../config';
import {colors, fonts} from '../../../utils';

const NewMovie = () => {
  const [movies, setMovies] = useState([]);

  const getMovieList = useCallback(async () => {
    const res = await getNewMovies();
    setMovies(res.data.animes);
  }, []);

  useEffect(() => {
    getMovieList();
  }, [getMovieList]);

  const IMG_URL = 'https://testapi.my.id/images/anime';
  return (
    <View style={styles.container}>
      <Text style={styles.label}>New Movie</Text>
      <ScrollView horizontal={true} style={styles.wrapper}>
        {movies.map(anime => {
          return (
            <MainCardFilm
              key={anime.sub_id}
              title={anime.sub_name}
              rating={anime.rate}
              thumbnail={`${IMG_URL}/${anime.sub_banner}`}
            />
          );
        })}
      </ScrollView>
    </View>
  );
};

export default NewMovie;

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    marginHorizontal: 16,
  },
  wrapper: {
    flexDirection: 'row',
    marginTop: 8,
  },
  label: {
    fontSize: 14,
    fontFamily: fonts.sora.medium,
    color: colors.onBackground,
  },
});
