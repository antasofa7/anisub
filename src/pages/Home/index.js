import React, {PureComponent} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Spacing} from '../../components/atoms';
import {
  AnimeByGenre,
  BannerCarousel,
  Header,
  NewAllAnime,
  UpcomingAnime,
} from '../../components/organism';
import HomeComponent from '../../components/organism/HomeComponent';
import {colors, responsiveHeight} from '../../utils';

export default class Home extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      isPage: false,
    };
  }

  render() {
    const {navigate} = this.props.navigation;
    const {isLoading, isPage} = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <HomeComponent
          navigation={navigate}
          loading={isLoading}
          isPages={isPage}
        />
        <Spacing height={responsiveHeight(90)} />
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
