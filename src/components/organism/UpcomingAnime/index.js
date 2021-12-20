import React, {useCallback, useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {MainCardFilm} from '../..';
import {getUpcomingAnimes} from '../../../config';
import {colors, fonts} from '../../../utils';

const UpcomingAnime = () => {
  const [movies, setMovies] = useState([]);

  const getMovieList = useCallback(async () => {
    const res = await getUpcomingAnimes();
    setMovies(res.data.episodes);
  }, []);

  useEffect(() => {
    getMovieList();
  }, [getMovieList]);

  const IMG_URL = 'https://testapi.my.id/images/anime';
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Upcoming Anime</Text>
      <ScrollView horizontal={true} style={styles.wrapper}>
        {movies.map(anime => {
          return (
            <MainCardFilm
              key={anime.post_id}
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

export default UpcomingAnime;

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