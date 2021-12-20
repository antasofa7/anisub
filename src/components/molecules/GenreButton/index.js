import React, {useCallback, useEffect, useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {getGenres} from '../../../config';
import GenreItem from './GenreItem';

const GenreButton = ({onPress}) => {
  const [genres, setGenres] = useState([]);
  const getGenreList = useCallback(async () => {
    const res = await getGenres();
    setGenres(res.data);
  }, []);

  useEffect(() => {
    getGenreList();
  }, [getGenreList]);

  return (
    <View style={styles.container}>
      <ScrollView horizontal={true} style={styles.wrapper}>
        {genres.map(genre => {
          return (
            <GenreItem
              key={genre.genre_id}
              genre={genre.genre_name}
              onPress={onPress(genre.genre_id)}
            />
          );
        })}
      </ScrollView>
    </View>
  );
};

export default GenreButton;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginVertical: 8,
  },
  wrapper: {
    flexDirection: 'row',
  },
});
