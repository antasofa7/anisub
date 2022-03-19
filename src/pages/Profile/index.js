import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';
import Share from 'react-native-share';
import {UserCircle} from '../../assets';
import Input from '../../components/atoms/Input';
import Menu from '../../components/atoms/Menu';
import {colors, fonts, responsiveHeight, responsiveWidth} from '../../utils';

const options = {
  title: 'Share this app',
  message: '',
  url: 'https://play.google.com/store/apps/details?id=com.anisub',
};

export default class Profile extends Component {
  constructor() {
    super();

    this.state = {
      isLogin: false,
    };
  }

  share = async (customOptions = options) => {
    try {
      const result = await Share.open(customOptions);
      console.log(result);
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    const {isLogin} = this.state;
    return (
      <View style={styles.container}>
        {isLogin ? (
          <>
            <View style={styles.wrapperUser}>
              <View style={styles.wrapperImage}>
                <FastImage source={UserCircle} style={styles.image} />
              </View>
              <Text style={styles.title}> Salahudin </Text>
              <Text style={styles.email}> 081388017878 </Text>
            </View>
            <Menu name="Edit Profile" />
            <Menu name="Watch List" />
          </>
        ) : (
          <View style={styles.wrapperLogin}>
            <Text style={styles.textLogin}>
              Please login to personalize your account
            </Text>
            <Text style={styles.label}>Email</Text>
            <View style={styles.input}>
              <Input
                placeholder="Please input your email"
                keyboardType="email-address"
              />
            </View>
            <Text style={styles.label}>Password</Text>
            <View style={styles.input}>
              <Input
                placeholder="Please input your password"
                secureTextEntry={true}
              />
            </View>
            <TouchableOpacity style={styles.login}>
              <Text style={styles.loginTitle}>Login</Text>
            </TouchableOpacity>
          </View>
        )}
        <Menu name="Share" onPress={() => this.share()} />
        <Menu name="Rate Us" />
        {isLogin && (
          <TouchableOpacity style={styles.logout}>
            <Text style={styles.logoutTitle}>Logout</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 16,
  },
  wrapperUser: {
    alignItems: 'center',
    marginTop: responsiveHeight(60),
    marginBottom: 50,
  },
  wrapperLogin: {
    marginTop: responsiveHeight(60),
    marginBottom: 50,
  },
  label: {
    fontFamily: fonts.sora.regular,
    fontSize: 14,
    color: colors.onBackground,
    textAlign: 'left',
  },
  input: {
    backgroundColor: colors.onPrimary,
    paddingHorizontal: 10,
    marginVertical: 12,
    borderRadius: 10,
  },
  textLogin: {
    fontFamily: fonts.sora.medium,
    fontSize: 16,
    color: colors.onBackground,
    marginBottom: 16,
  },
  login: {
    width: '100%',
    backgroundColor: colors.primary,
    padding: 12,
    borderRadius: 30,
    marginTop: 16,
  },
  loginTitle: {
    fontFamily: fonts.sora.semiBold,
    fontSize: 16,
    color: colors.onPrimary,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  wrapperImage: {
    width: responsiveWidth(70),
    height: responsiveHeight(70),
  },
  image: {
    flex: 1,
    opacity: 0.5,
    width: null,
    height: null,
    resizeMode: 'contain',
  },
  title: {
    fontFamily: fonts.sora.bold,
    fontSize: 20,
    color: colors.onBackground,
  },
  email: {
    fontFamily: fonts.sora.regular,
    fontSize: 12,
    color: colors.onBackground,
  },
  wrapperMenu: {
    backgroundColor: colors.onPrimary,
    padding: 16,
    marginTop: 10,
  },
  menu: {
    fontFamily: fonts.sora.medium,
    fontSize: 14,
    color: colors.onBackground,
  },
  logout: {
    position: 'absolute',
    bottom: responsiveHeight(80),
    left: 16,
    borderWidth: 2,
    borderColor: colors.onPrimary,
    borderRadius: 30,
    padding: 16,
    width: '100%',
  },
  logoutTitle: {
    fontFamily: fonts.sora.medium,
    fontSize: 14,
    color: colors.onPrimary,
    textAlign: 'center',
  },
});
