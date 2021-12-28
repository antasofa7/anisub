import React, {Component} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';
import {Spacing} from '../../components/atoms';
import {GenreButton, HeaderSearch} from '../../components/molecules';
import {AnimeGenreList, Header} from '../../components/organism';
import {getAnimeByGenre, getGenres} from '../../config';
import {Animes} from '../../json';
import Router from '../../router';
import {colors, responsiveHeight} from '../../utils';

export default class Playlist extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // genres: [],
      // genrePressed: false,
      isLoading: true,
    };
  }

  // onPressGenre = () => {
  //   const response = getGenres();
  //   response.then(res => {
  //     const data = res.data;
  //     // this.setState(data ? {genrePressed: true} : null);
  //   });
  // };

  render() {
    const {genrePressed, isLoading} = this.state;
    const navigate = this.props.navigation;
    return (
      <SafeAreaView style={styles.container}>
        <HeaderSearch />
        <GenreButton navigation={navigate} />
        <AnimeGenreList navigation={navigate} />
        {/* {genrePressed ? <AnimeGenreList /> : null} */}
        {/* <Spacing height={responsiveHeight(90)} /> */}
        {/* <View>
        </View> */}
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
