import React, {useCallback, useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {MainCardFilm} from '../..';
import {getAnimeByGenre} from '../../../config';
import {colors, fonts} from '../../../utils';

const AnimeByGenre = () => {
  const [genres, setGenres] = useState([]);

  const getMovieList = useCallback(async () => {
    const res = await getAnimeByGenre();
    setGenres(res.data);
  }, []);

  useEffect(() => {
    getMovieList();
  }, [getMovieList]);

  const IMG_URL = 'https://testapi.my.id/images/anime';
  return (
    <View style={styles.container}>
      {genres.map(genre => {
        return (
          <View key={genre.genre_id} style={styles.wrapper}>
            <Text style={styles.label}>{genre.genre_name}</Text>
            <ScrollView horizontal={true} style={styles.wrapperItem}>
              {genre.animes.map(anime => {
                return (
                  <MainCardFilm
                    key={anime.sub_id}
                    title={anime.sub_name}
                    //   rating={anime.rate}
                    thumbnail={`${IMG_URL}/${anime.sub_banner}`}
                  />
                );
              })}
            </ScrollView>
          </View>
        );
      })}
    </View>
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
});
