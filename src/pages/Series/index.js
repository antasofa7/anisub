import React, {Component} from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {Spacing} from '../../components/atoms';
import {AnimeByGenre, Header, NewSeries} from '../../components/organism';
import {Animes} from '../../json';
import {colors, responsiveHeight} from '../../utils';

export default class Series extends Component {
  constructor(props) {
    super(props);

    this.state = {
      animes: Animes,
      isLoading: true,
    };
  }

  render() {
    const {isLoading} = this.state;
    return (
      <ScrollView style={styles.container}>
        <Header />
        <NewSeries loading={isLoading} />
        {/* <UpcomingAnime animes={animes} /> */}
        <AnimeByGenre />
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
