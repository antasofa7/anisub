import React, {Component} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';
import {Spacing} from '../../components/atoms';
import {GenreButton, HeaderSearch} from '../../components/molecules';
import {
  AnimeGenreList,
  Header,
  PlaylistByGenre,
} from '../../components/organism';
import {getAnimeByGenre, getGenres} from '../../config';
import {Animes} from '../../json';
import Router from '../../router';
import {colors, responsiveHeight} from '../../utils';

export default class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      genreID: 0,
      isLoading: true,
    };
  }

  getID = value => {
    this.setState({genreID: value});
  };

  render() {
    const {genreID} = this.state;
    console.log('genre>>', genreID);
    const navigate = this.props.navigation;
    return (
      <SafeAreaView style={styles.container}>
        <HeaderSearch navigation={navigate} />
        <GenreButton navigation={navigate} handleProps={this.getID} />
        {genreID === 0 ? (
          <AnimeGenreList navigation={navigate} />
        ) : (
          <PlaylistByGenre genreID={genreID} />
        )}
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
