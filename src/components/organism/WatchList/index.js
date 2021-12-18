import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {MainCardFilm} from '../..';
import {colors, fonts} from '../../../utils';

const WatchList = ({animes}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Watch List</Text>
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

export default WatchList;

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
