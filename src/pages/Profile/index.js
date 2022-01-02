import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {UserCircle} from '../../assets';
import {colors, fonts, responsiveHeight, responsiveWidth} from '../../utils';

const menus = [
  {id: 1, name: 'Help'},
  {id: 2, name: 'FAQ'},
  {id: 3, name: 'Privacy Policy'},
  {id: 4, name: 'Logout'},
];

export default class Profile extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.wrapperUser}>
          <View style={styles.wrapperImage}>
            <FastImage source={UserCircle} style={styles.image} />
          </View>
          <Text style={styles.title}> Salahudin </Text>
          <Text style={styles.email}> Salahudin@gmail.com </Text>
        </View>
        {menus.map(menu => {
          return (
            <View key={menu.id} style={styles.wrapperMenu}>
              <Text style={styles.menu}>{menu.name}</Text>
            </View>
          );
        })}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 24,
  },
  wrapperUser: {
    alignItems: 'center',
    marginTop: responsiveHeight(60),
    marginBottom: 40,
  },
  wrapperImage: {
    width: responsiveWidth(150),
    height: responsiveHeight(150),
  },
  image: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'contain',
  },
  title: {
    fontFamily: fonts.sora.bold,
    fontSize: 24,
    color: colors.onBackground,
  },
  email: {
    fontFamily: fonts.sora.regular,
    fontSize: 12,
    color: colors.onBackground,
  },
  wrapperMenu: {
    marginTop: 16,
  },
  menu: {
    fontFamily: fonts.sora.medium,
    fontSize: 14,
    color: colors.onBackground,
  },
});
