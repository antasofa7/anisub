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

  // componentDidMount() {
  //   this._getGenreList();
  // }

  // _getGenreList = async () => {
  //   this.setState({isLoading: true});
  //   const res = await getGenres();
  //   res.data.map(item => {
  //     this.setState({
  //       genres: {
  //         id: item.genre_id,
  //         name: item.genre_name,
  //       },
  //     });
  //   });
  //   this.setState({isLoading: false});
  // };

  render() {
    const {navigate} = this.props.navigation;
    const {isLoading, isPage} = this.state;
    return (
      <SafeAreaView style={styles.container}>
        {/* <Header home />
        <BannerCarousel navigation={navigate} isPages={isPage} />
        <ContinueWatching animes={animes} />
        <WatchList animes={animes} />
        <NewAllAnime loading={isLoading} isPages={isPage} />
        <UpcomingAnime loading={isLoading} isPages={isPage} /> */}
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
