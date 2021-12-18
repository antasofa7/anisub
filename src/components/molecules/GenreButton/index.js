import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import GenreItem from './GenreItem';

const GenreButton = ({genres}) => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal={true} style={styles.wrapper}>
        {genres.map(genre => {
          return <GenreItem key={genre.id} genre={genre.genre} />;
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
