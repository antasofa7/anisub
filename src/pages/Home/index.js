import React, {Component} from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {
  BannerCarousel,
  ContinueWatching,
  Header,
  NewMovie,
  Spacing,
  WatchList,
} from '../../components';
import {Animes} from '../../json';
import {colors, responsiveHeight} from '../../utils';

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      animes: Animes,
    };
  }

  render() {
    const {animes} = this.state;
    return (
      <ScrollView style={styles.container}>
        <Header home />
        <BannerCarousel animes={animes} />
        <ContinueWatching animes={animes} />
        <WatchList animes={animes} />
        <NewMovie animes={animes} />
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
