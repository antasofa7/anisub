import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  Linking,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import Share from 'react-native-share';
import {connect} from 'react-redux';
import {UserCircle} from '../../assets';
import Menu from '../../components/atoms/Menu';
import NativeAds from '../../components/organism/NativeAds';
import {
  clearStorage,
  colors,
  fonts,
  getDataFromStorage,
  responsiveHeight,
  responsiveWidth,
} from '../../utils';

const optionsShare = {
  title: 'Share this app',
  message: '',
  url: 'https://play.google.com/store/apps/details?id=com.anisub',
};

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLogedIn: false,
      profile: {
        email: '',
      },
    };
  }

  componentDidMount() {
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
        this.setState({isLogedIn: false});
      } else {
        this.setState({profile: {email: res.email}});
        this.setState({isLogedIn: true});
      }
    });
  };

  _logout = () => {
    Alert.alert(
      'Logout',
      'You want to log out?',
      [
        {text: 'Sure', onPress: () => action()},
        {
          text: 'No',
          onPress: () => console.log('No Thanks Pressed'),
          style: 'cancel',
        },
      ],
      {cancelable: false},
    );

    const action = () => {
      clearStorage();
      this.setState({isLogedIn: false});
      this.props.navigation.navigate('Home');
    };
  };

  _share = async (customOptions = optionsShare) => {
    try {
      const result = await Share.open(customOptions);
      console.log(result);
    } catch (err) {
      console.log(err);
    }
  };

  _rate = () => {
    const GOOGLE_PACKAGE = 'com.anisub';
    Linking.openURL(`market://details?id=${GOOGLE_PACKAGE}`);
  };

  render() {
    const {isLogedIn, profile} = this.state;
    const {navigation, loginLoading} = this.props;

    return (
      <View style={styles.container} refreshing={loginLoading}>
        {isLogedIn ? (
          <>
            <View style={styles.wrapperUser}>
              <View style={styles.wrapperImage}>
                <FastImage source={UserCircle} style={styles.image} />
              </View>
              <Text style={styles.title}> {profile.email} </Text>
            </View>
            <Menu
              name="Watch List"
              onPress={() => navigation.navigate('WatchList')}
            />
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
        <Menu name="Share" onPress={() => this._share()} />
        <Menu name="Rate Us" onPress={() => this._rate()} />
        {isLogedIn && <Menu name="Logout" onPress={() => this._logout()} />}
        <NativeAds
          headlineView
          taglineView
          storeView
          imageView
          callToActionView
        />
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
});
