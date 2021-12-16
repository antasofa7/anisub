import React, {Component} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {Logo} from '../../assets';
import {color} from '../../utils/colors';
import {responsiveHeight, responsiveWidth} from '../../utils/dimensions';

export default class Splash extends Component {
  componentDidMount() {
    setTimeout(() => {
      this.props.navigation.navigate('MainApp');
    }, 3000);
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.wrapper}>
          <Image source={Logo} style={styles.logo} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: color.backgroud,
  },
  wrapper: {
    width: responsiveWidth(138),
    height: responsiveHeight(55),
  },
  logo: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'contain',
  },
});
