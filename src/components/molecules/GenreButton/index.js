import React, {useCallback, useEffect, useState} from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {getGenres} from '../../../config';
import {colors, fonts} from '../../../utils';

const allGenre = {genre_id: 0, genre_name: 'All'};

const GenreButton = props => {
  const [genres, setGenres] = useState([]);
  const [activeGenre, setActiveGenre] = useState(0);

  const getGenreList = useCallback(async () => {
    const res = await getGenres();
    setGenres([allGenre, ...res.data]);
  }, []);

  useEffect(() => {
    getGenreList();
  }, [getGenreList]);

  const onPressGenre = value => {
    props.handleProps(value);
    setActiveGenre(value);
  };

  const _renderItem = ({item, index}) => {
    const active = item.genre_id === activeGenre ? true : false;
    return (
      <View style={styles.wrapper(active)}>
        <TouchableOpacity
          key={item.genre_id}
          onPress={() => onPressGenre(item.genre_id)}>
          <Text style={styles.title(active)}>{item.genre_name}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        data={genres}
        renderItem={_renderItem}
        keyExtractor={item => item.genre_id.toString()}
        scrollToEnd={() => ({animated: true})}
      />
    </View>
  );
};

export default GenreButton;

const styles = StyleSheet.create({
  container: {
    margin: 16,
  },
  wrapper: active => ({
    backgroundColor: active ? colors.primary : colors.onPrimary,
    marginRight: 8,
    borderRadius: 10,
  }),
  title: active => ({
    fontFamily: fonts.sora.medium,
    fontSize: 14,
    color: active ? colors.background : colors.onBackground,
    paddingHorizontal: 16,
    paddingVertical: 8,
  }),
});
