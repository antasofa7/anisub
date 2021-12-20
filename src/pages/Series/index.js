import React, {Component} from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {Header, Spacing} from '../../components';
import NewSeries from '../../components/organism/NewSeries';
import {Animes} from '../../json';
import {colors, responsiveHeight} from '../../utils';

export default class Series extends Component {
  constructor(props) {
    super(props);

    this.state = {
      animes: Animes,
    };
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <Header />
        <NewSeries />
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
