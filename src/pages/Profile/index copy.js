import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';
import Share from 'react-native-share';
import {connect} from 'react-redux';
import {UserCircle} from '../../assets';
import Menu from '../../components/atoms/Menu';
import Login from '../../components/organism/Login';
import Register from '../../components/organism/Register';
import {
  clearStorage,
  colors,
  fonts,
  getDataFromStorage,
  responsiveHeight,
  responsiveWidth,
} from '../../utils';

const options = {
  title: 'Share this app',
  message: '',
  url: 'https://play.google.com/store/apps/details?id=com.anisub',
};

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLogin: false,
      titleForm: '',
      profile: {
        email: '',
      },
    };
  }

  componentDidMount() {
    console.log('user');
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      this._getUser();
    });
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  _getUser = () => {
    getDataFromStorage('user').then(res => {
      if (!res) {
        this.setState({isLogin: false});
      }

      this.setState({profile: {email: res.email}});
      this.setState({isLogin: true});
    });
  };

  _logout = () => {
    setTimeout(() => {
      clearStorage();
    }, 3000);
    this.setState({isLogin: false});
  };

  getProps = value => {
    this.setState({titleForm: value});
  };

  share = async (customOptions = options) => {
    try {
      const result = await Share.open(customOptions);
      console.log(result);
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    const {isLogin, titleForm, profile} = this.state;
    const {navigation, loginLoading} = this.props;

    console.log('loading', loginLoading);

    return (
      <View style={styles.container} refreshing={loginLoading}>
        {isLogin ? (
          <>
            <View style={styles.wrapperUser}>
              <View style={styles.wrapperImage}>
                <FastImage source={UserCircle} style={styles.image} />
              </View>
              <Text style={styles.title}> Salahudin </Text>
              <Text style={styles.emailText}> {profile.email} </Text>
            </View>
            <Menu name="Update Profile" />
            <Menu name="Watch List" />
          </>
        ) : (
          <View style={styles.wrapperUser}>
            <Text style={styles.text}>
              Please login to personalize this app
            </Text>
            <TouchableOpacity
              style={styles.btn}
              onPress={() => navigation.navigate('Login')}>
              <Text style={styles.btnTitle}>Login</Text>
            </TouchableOpacity>
          </View>
        )}
        <Menu name="Share" onPress={() => this.share()} />
        <Menu name="Rate Us" />
        {isLogin && (
          <TouchableOpacity
            style={styles.logout}
            onPress={() => this._logout()}>
            <Text style={styles.logoutTitle}>Logout</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  loginLoading: state.AuthReducer.loginLoading,
  loginResults: state.AuthReducer.loginResults,
});

export default connect(mapStateToProps, null)(Profile);

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
  text: {
    fontFamily: fonts.sora.medium,
    fontSize: 16,
    color: colors.onBackground,
    marginBottom: 16,
  },
  btn: {
    width: '100%',
    backgroundColor: colors.primary,
    padding: 12,
    borderRadius: 30,
    marginTop: 16,
  },
  btnTitle: {
    fontFamily: fonts.sora.semiBold,
    fontSize: 16,
    color: colors.onPrimary,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  title: {
    fontFamily: fonts.sora.bold,
    fontSize: 20,
    color: colors.onBackground,
  },
  emailText: {
    fontFamily: fonts.sora.regular,
    fontSize: 12,
    color: colors.onBackground,
  },
  logout: {
    position: 'absolute',
    bottom: responsiveHeight(80),
    left: 16,
    borderWidth: 2,
    borderColor: colors.onBackground,
    borderRadius: 30,
    padding: 16,
    width: '100%',
  },
  logoutTitle: {
    fontFamily: fonts.sora.medium,
    fontSize: 14,
    color: colors.onBackground,
    textAlign: 'center',
  },
});
