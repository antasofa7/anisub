import React, {Component} from 'react';
import {Alert, Image, Platform, StyleSheet, View} from 'react-native';
import {Logo} from '../../assets';
import {colors, responsiveHeight, responsiveWidth} from '../../utils';
import NetInfo from '@react-native-community/netinfo';

export default class Splash extends Component {
  unsubscribe = NetInfo.addEventListener(state => {
    if (Platform.OS === 'android') {
      if (state.isConnected === false) {
        Alert.alert('Please check your internet connection!');
      } else {
        setTimeout(() => {
          this.props.navigation.navigate('MainApp');
        }, 3000);
      }
      console.log('Connection type', state.type);

      console.log('Is connected?', state.isConnected);
    }
  });
  componentDidMount() {
    // this.CheckConnectivity();
    this.unsubscribe();
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
    backgroundColor: colors.background,
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
