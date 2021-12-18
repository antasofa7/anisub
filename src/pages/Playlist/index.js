import React, {Component} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {AnimeList, GenreButton, Header, Spacing} from '../../components';
import {Animes, Genres} from '../../json';
import {colors, responsiveHeight} from '../../utils';

export default class Playlist extends Component {
  constructor(props) {
    super(props);

    this.state = {
      animes: Animes,
      genres: Genres,
    };
  }

  render() {
    const {animes, genres} = this.state;
    return (
      <View style={styles.container}>
        <Header />
        <GenreButton genres={genres} />
        <ScrollView>
          <AnimeList animes={animes} />
          <Spacing height={responsiveHeight(90)} />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
});
