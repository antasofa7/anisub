import {useNavigation} from '@react-navigation/native';
import React, {useCallback, useEffect, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {getNewMovies} from '../../../config';
import {colors, fonts} from '../../../utils';
import {MainCardFilm} from '../../molecules';

const NewMovie = ({loading}) => {
  const navigation = useNavigation();
  const [movies, setMovies] = useState([]);
  const [isLoading, setLoading] = useState(loading);

  const getMovieList = useCallback(async () => {
    setLoading(true);
    const res = await getNewMovies();
    setLoading(false);
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
            <TouchableOpacity
              key={anime.sub_id}
              onPress={() =>
                navigation.navigate('Detail', {animeId: anime.sub_id})
              }>
              <MainCardFilm
                title={anime.sub_name}
                rating={anime.rate}
                thumbnail={`${IMG_URL}/${anime.sub_banner}`}
                isLoading={isLoading}
              />
            </TouchableOpacity>
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
    marginTop: 12,
  },
  label: {
    fontSize: 14,
    fontFamily: fonts.sora.medium,
    color: colors.onBackground,
  },
});
