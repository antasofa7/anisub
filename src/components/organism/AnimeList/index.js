import React from 'react';
import {Dimensions, FlatList, StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {MainCardFilm} from '../..';

const AnimeList = ({animes}) => {
  const numColumns = 3;
  const size = Dimensions.get('window').width / numColumns - 20;

  const _itemSeparator = () => {
    return <View style={styles.separator} />;
  };

  const _renderItem = ({item, index}) => {
    console.log(item);
    return (
      <MainCardFilm
        key={index}
        title={item.title}
        rating={item.rating}
        thumbnail={item.thumbnail}
        width={size}
        margin={0}
      />
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={animes}
        renderItem={_renderItem}
        ItemSeparatorComponent={_itemSeparator}
        keyExtractor={item => item.id}
        numColumns={numColumns}
      />
    </SafeAreaView>
  );
};

export default AnimeList;

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
