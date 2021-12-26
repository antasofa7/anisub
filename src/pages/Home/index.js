import React, {PureComponent} from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {Spacing} from '../../components/atoms';
import {
  AnimeByGenre,
  BannerCarousel,
  Header,
  NewAllAnime,
  UpcomingAnime,
} from '../../components/organism';
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
      <ScrollView style={styles.container}>
        <Header home />
        <BannerCarousel navigation={navigate} isPages={isPage} />
        {/* <ContinueWatching animes={animes} />
        <WatchList animes={animes} /> */}
        <NewAllAnime loading={isLoading} isPages={isPage} />
        <UpcomingAnime loading={isLoading} isPages={isPage} />
        <AnimeByGenre navigation={navigate} />
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
