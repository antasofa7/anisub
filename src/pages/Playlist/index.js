import React, {Component} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';
import {
  AnimeGenreList,
  AnimeList,
  GenreButton,
  Header,
  Spacing,
} from '../../components';
import {getAnimeByGenre, getGenres} from '../../config';
import {Animes} from '../../json';
import {colors, responsiveHeight} from '../../utils';

export default class Playlist extends Component {
  constructor(props) {
    super(props);

    this.state = {
      animes: Animes,
      genres: [],
      genrePressed: false,
    };
  }

  onPressGenre = () => {
    const response = getGenres();
    response.then(res => {
      const data = res.data;
      console.log('data>> ', data.genre_name);
      // this.setState(data ? {genrePressed: true} : null);
    });
  };

  render() {
    const {genrePressed} = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <Header />
        <GenreButton onPress={this.onPressGenre} />
        <ScrollView nestedScrollEnabled={true}>
          {genrePressed ? <AnimeGenreList /> : null}
          <Spacing height={responsiveHeight(90)} />
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
});
