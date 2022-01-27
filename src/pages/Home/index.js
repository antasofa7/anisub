import React from 'react';
import {StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {PureComponent} from 'react/cjs/react.development';
import {Spacing} from '../../components/atoms';
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
