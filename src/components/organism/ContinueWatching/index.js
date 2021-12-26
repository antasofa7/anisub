import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {colors, fonts} from '../../../utils';
import {MainCardFilm} from '../../molecules';

const ContinueWatching = ({animes}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Continue Watching</Text>
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

export default ContinueWatching;

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    marginHorizontal: 16,
  },
  label: {
    fontSize: 14,
    fontFamily: fonts.sora.medium,
    color: colors.onBackground,
  },
  wrapper: {
    flexDirection: 'row',
    marginTop: 8,
  },
});
