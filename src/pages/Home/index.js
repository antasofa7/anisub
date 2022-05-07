import React, {PureComponent} from 'react';
import {ActivityIndicator, Alert, Platform, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import SplashScreen from 'react-native-splash-screen';
import NetInfo from '@react-native-community/netinfo';
import Spacing from '../../components/atoms/Spacing';
import HomeComponent from '../../components/organism/HomeComponent';
import {
  getAllNew,
  getHotMovies,
  getRecommendation,
  getUpcomingAnimes,
} from '../../config';
import {colors, getDataFromStorage, responsiveHeight} from '../../utils';
import {getWatchLists} from '../../actions/WatchListAction';

export default class Home extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      user: {},
      dataAnime: {
        hotMovies: [],
        allNew: [],
        upcoming: [],
        recommendation: [],
      },
    };
  }

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

  _getMovieList = () => {
    Promise.all([
      getHotMovies(),
      getAllNew(),
      getUpcomingAnimes(),
      getRecommendation(),
    ])
      .then(([resHot, resAll, resUp, resRec]) => {
        this.setState({isLoading: true});
        setTimeout(() => {
          this.setState({
            dataAnime: {
              hotMovies: resHot.data,
              allNew: resAll.data,
              upcoming: resUp.data,
              recommendation: resRec.data,
            },
          });
          this.setState({isLoading: false});
        }, 3000);
      })
      .catch(err => {
        console.log('err >> ', err);
      });
  };

  _getData = async _ => {
    const userData = await getDataFromStorage('user');
    console.log('userData', userData);
    if (userData) {
      this.setState({user: userData});
      // await this.props.dispatch(getWatchLists(userData.uid));
    }
    return null;
  };

  componentDidMount() {
    this.unsubscribe();
    this._getMovieList();
    this._getData();
    setTimeout(() => {
      SplashScreen.hide();
    }, 1000);
  }

  render() {
    const {navigate} = this.props.navigation;
    const {dataAnime, isLoading, user} = this.state;
    return (
      <SafeAreaView style={styles.container}>
        {isLoading ? (
          <ActivityIndicator
            size="large"
            color={colors.secondary}
            style={styles.loading}
          />
        ) : (
          <HomeComponent
            navigation={navigate}
            dataAnime={dataAnime}
            user={user}
          />
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
  loading: {
    flex: 1,
    justifyContent: 'center',
  },
});
