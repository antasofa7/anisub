import React, {PureComponent} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {GenreButton} from '../../components/molecules';
import {AnimeGenreList, PlaylistByGenre} from '../../components/organism';
import {colors} from '../../utils';

export default class Library extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      genreID: 0,
      isLoading: true,
    };
  }

  getID = value => {
    this.setState({genreID: value});
  };

  render() {
    const {genreID} = this.state;
    const navigate = this.props.navigation;
    return (
      <SafeAreaView style={styles.container}>
        <GenreButton navigation={navigate} handleProps={this.getID} />
        {genreID === 0 ? (
          <AnimeGenreList navigation={navigate} />
        ) : (
          <PlaylistByGenre genreID={genreID} navigation={navigate} />
        )}
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
