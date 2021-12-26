import React, {useCallback, useEffect, useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {getGenres} from '../../../config';
import GenreItem from './GenreItem';

const GenreButton = ({navigation}) => {
  const [genres, setGenres] = useState([]);
  const [activeGenre, setActiveGenre] = useState('all');
  const getGenreList = useCallback(async () => {
    const res = await getGenres();
    setGenres(res.data);
  }, []);

  useEffect(() => {
    getGenreList();
  }, [getGenreList]);

  const onPressGenre = value => {
    setActiveGenre(value);
  };

  const _renderItem = ({item, index}) => {
    return (
      <GenreItem
        key={item.genre_id}
        genreName={item.genre_name}
        active={item.genre_name === activeGenre ? true : false}
        onPress={() => onPressGenre(item.genreName)}
        navigation={navigation}
      />
    );
  };

  return (
    <View style={styles.container}>
      <View horizontal={true} style={styles.wrapper}>
        <FlatList
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={genres}
          renderItem={_renderItem}
          keyExtractor={item => item.genre_id.toString()}
          // initialNumToRender={12}
          scrollToEnd={() => ({animated: true})}
        />
      </View>
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
