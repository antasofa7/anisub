import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {MainCardFilm} from '../..';
import {colors, fonts} from '../../../utils';

const NewMovie = ({animes}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>New Movie</Text>
      <ScrollView horizontal={true} style={styles.wrapper}>
        {animes.map(anime => {
          return (
            <MainCardFilm
              key={anime.id}
              title={anime.title}
              rating={anime.rating}
              thumbnail={anime.thumbnail}
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
