import React, {PureComponent} from 'react';
import {StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Spacing from '../../components/atoms/Spacing';
import HeaderSearch from '../../components/molecules/HeaderSearch';
import {NewMovie, NewSeries} from '../../components/organism';
import {getNewMovies, getNewSeries} from '../../config';
import {colors, responsiveHeight} from '../../utils';

export default class Search extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      tabName: 'TV Series',
      newSeries: [],
      newMovies: [],
    };
  }

  _getMovieList = () => {
    Promise.all([getNewSeries(), getNewMovies()])
      .then(([resSeries, resMovies]) => {
        this.setState({isLoading: true});
        setTimeout(() => {
          this.setState({
            newSeries: resSeries.data,
            newMovies: resMovies.data,
          });
          this.setState({isLoading: false});
        }, 3000);
      })
      .catch(err => {
        console.log('err >> ', err);
      });
  };

  componentDidMount() {
    this._getMovieList();
  }

  getTabName = value => {
    this.setState({tabName: value});
  };

  render() {
    const {navigate} = this.props.navigation;
    const {isLoading, tabName, newSeries, newMovies} = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <HeaderSearch navigation={navigate} handleProps={this.getTabName} />
        {tabName === 'TV Series' ? (
          <NewSeries loading={isLoading} newSeries={newSeries} />
        ) : (
          <NewMovie loading={isLoading} newMovies={newMovies} />
        )}
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
