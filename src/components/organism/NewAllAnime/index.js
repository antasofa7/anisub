import React, {useCallback, useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {MainCardFilm} from '../..';
import {getAllNew} from '../../../config';
import {colors, fonts} from '../../../utils';

const NewAllAnime = () => {
  const [movies, setMovies] = useState([]);

  const getMovieList = useCallback(async () => {
    const res = await getAllNew();
    setMovies(res.data.episodes);
  }, []);

  useEffect(() => {
    getMovieList();
  }, [getMovieList]);
  const IMG_URL = 'https://testapi.my.id/images/episode';
  return (
    <View style={styles.container}>
      <Text style={styles.label}>New Movie</Text>
      <ScrollView horizontal={true} style={styles.wrapper}>
        {movies.map(anime => {
          return (
            <MainCardFilm
              key={anime.post_id}
              title={anime.post_name}
              rating={anime.rate}
              thumbnail={`${IMG_URL}/${anime.post_image}`}
            />
          );
        })}
      </ScrollView>
    </View>
  );
};

export default NewAllAnime;

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
