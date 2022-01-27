import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Spacing} from '../../components/atoms';
import HeaderLibrary from '../../components/molecules/HeaderLibrary';
import {NewMovie, NewSeries} from '../../components/organism';
import {colors, responsiveHeight} from '../../utils';

export default class Library extends Component {
  constructor(props) {
    super(props);

    this.state = {
      animes: [],
      isLoading: true,
      tabName: 'TV Series',
    };
  }

  getTabName = value => {
    this.setState({tabName: value});
  };

  render() {
    const {navigate} = this.props.navigation;
    const {isLoading, tabName} = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <HeaderLibrary navigation={navigate} handleProps={this.getTabName} />
        {tabName === 'TV Series' ? (
          <NewSeries loading={isLoading} />
        ) : (
          <NewMovie loading={isLoading} />
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
