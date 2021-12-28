import React, {Component} from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {Spacing} from '../../components/atoms';
import {HeaderSearch} from '../../components/molecules';
import {AnimeByGenre, Header, NewMovie} from '../../components/organism';
import {colors, responsiveHeight} from '../../utils';

export default class Movies extends Component {
  constructor(props) {
    super(props);

    this.state = {
      animes: [],
      isLoading: true,
    };
  }

  render() {
    const {navigate} = this.props.navigation;
    const {isLoading} = this.state;
    return (
      <ScrollView style={styles.container}>
        <HeaderSearch />
        <NewMovie loading={isLoading} />
        {/* <UpcomingAnime animes={animes} /> */}
        {/* <AnimeByGenre loading={isLoading} navigation={navigate} /> */}
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
