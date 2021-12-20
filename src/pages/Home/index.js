import React, {Component} from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {
  AnimeByGenre,
  BannerCarousel,
  ContinueWatching,
  Header,
  NewAllAnime,
  Spacing,
  UpcomingAnime,
  WatchList,
} from '../../components';
import {colors, responsiveHeight} from '../../utils';

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      animes: [],
    };
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <Header home />
        <BannerCarousel />
        {/* <ContinueWatching animes={animes} />
        <WatchList animes={animes} /> */}
        <NewAllAnime />
        <UpcomingAnime />
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
