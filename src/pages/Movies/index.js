import React, {Component} from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {Header, NewMovie, Spacing, UpcomingAnime} from '../../components';
import {getNewMovies} from '../../config';
import {colors, responsiveHeight} from '../../utils';

export default class Movies extends Component {
  constructor(props) {
    super(props);

    this.state = {
      animes: [],
    };
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <Header />
        <NewMovie />
        {/* <UpcomingAnime animes={animes} /> */}
        <Spacing height={responsiveHeight(90)} />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
});
