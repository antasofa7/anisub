import {useNavigation} from '@react-navigation/native';
import moment from 'moment';
import React, {useCallback, useEffect, useState} from 'react';
import {Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';
import {connect} from 'react-redux';
import {
  addToWatchList,
  deleteWatchList,
} from '../../../actions/WatchListAction';
import {
  IconBack,
  IconHeart,
  IconHeartActive,
  IconPlayCircle,
} from '../../../assets';
import {
  colors,
  fonts,
  getDataFromStorage,
  responsiveHeight,
  responsiveWidth,
  screenWidth,
} from '../../../utils';
import {IMG_ANIME_URL} from '../../../utils/constan';

const ImageDetail = props => {
  const {
    animeDetail,
    indexParams,
    onPress,
    upcoming,
    dispatch,
    getWatchListResults,
  } = props;
  const navigation = useNavigation();
  const [countDown, setCountDown] = useState({});
  const [isBookmark, setBookmark] = useState(false);
  const [user, setUser] = useState({});

  const index = indexParams || 0;
  const episodes = animeDetail.episodes[index];
  const postEpisode = index
    ? `Episode ${episodes.post_episodes}`
    : 'Last Episode';

  const calculateCountdown = useCallback(() => {
    let today = Date.now();
    let updatedAt = new Date(episodes.updated_at).getTime();
    let up_coming = updatedAt + 604800 * 1000;
    let difference = Number(up_coming - today);

    let days = Math.floor(difference / (1000 * 60 * 60 * 24));

    let divisor4hour = (difference / 1000) % (3600 * 24);
    let hours = Math.floor(divisor4hour / (60 * 60));

    let divisor4minutes = (difference / 1000) % (60 * 60);
    let minutes = Math.floor(divisor4minutes / 60);

    let divisor4second = divisor4minutes % 60;
    let seconds = Math.ceil(divisor4second);

    let countDowns = {};
    if (difference > 0) {
      countDowns = {
        days: days.toString().length < 2 ? `0${days}` : days,
        hours: hours.toString().length < 2 ? `0${hours}` : hours,
        minutes: minutes.toString().length < 2 ? `0${minutes}` : minutes,
        seconds: seconds.toString().length < 2 ? `0${seconds}` : seconds,
      };
    } else {
      countDowns = {
        days: '00',
        hours: '00',
        minutes: '00',
        seconds: '00',
      };
    }
    return countDowns;
  }, [episodes]);

  useEffect(() => {
    _getData();
    const timer = setInterval(() => {
      setCountDown(calculateCountdown());
    }, 1000);

    return () => clearInterval(timer);
  }, [calculateCountdown, _getData]);

  const countDownComponent = [];

  Object.keys(countDown).forEach(interval => {
    countDownComponent.push(
      <View style={styles.countDownWrap} key={interval}>
        <Text style={styles.countDownTitle}>{countDown[interval]} </Text>
        <Text style={styles.countDownLabel}>{interval}</Text>
      </View>,
    );
  });

  const _addToWatchList = async _ => {
    if (user) {
      const watchListData = {
        uid: user.uid,
        animeId: animeDetail.sub_id,
        episode: episodes.post_episodes,
        title: animeDetail.sub_name,
        rating: animeDetail.rate,
        thumbnail: animeDetail.sub_banner,
      };
      dispatch(addToWatchList(watchListData));
      setBookmark(true);
      Alert.alert('Success', 'Anime added to watchlist.');
    } else {
      Alert.alert('Error', 'Please login to save anime!');
      navigation.navigate('Login');
    }
  };

  const _getData = useCallback(
    async _ => {
      const userData = await getDataFromStorage('user');
      setUser(userData);
      if (getWatchListResults !== null) {
        const watchlist = Object.keys(getWatchListResults);
        watchlist.forEach(list => {
          if (list === animeDetail.sub_id) {
            setBookmark(true);
          }
        });
      }
    },
    [getWatchListResults, animeDetail],
  );

  const _deleteWatchList = () => {
    Alert.alert(
      'Delete',
      'Delete movie from watchlist?',
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
      if (user) {
        const watchListData = {
          uid: user.uid,
          animeId: animeDetail.sub_id,
        };
        dispatch(deleteWatchList(watchListData));
        setBookmark(false);
      }
    };
  };

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <FastImage
          source={{
            uri:
              `${IMG_ANIME_URL}/${animeDetail.sub_banner}` ||
              '../../../assets/images/image-default.jpg',
            priority: FastImage.priority.normal,
          }}
          style={styles.imageDetail}
        />
        <LinearGradient
          colors={['rgba(13, 9, 0, 0)', 'rgba(13, 9, 0, 1)']}
          style={styles.linearGradient}
        />
        <View style={styles.iconBack}>
          <IconBack onPress={() => navigation.goBack()} />
        </View>
        <View style={styles.iconBookmark}>
          {isBookmark ? (
            <IconHeartActive onPress={() => _deleteWatchList()} />
          ) : (
            <IconHeart onPress={() => _addToWatchList()} />
          )}
        </View>
        {upcoming ? (
          <>
            <View style={styles.countDown}>{countDownComponent}</View>
            <View style={styles.wrapperTitle}>
              <Text style={styles.title} numberOfLines={2}>
                {animeDetail.sub_name}
              </Text>
            </View>
          </>
        ) : (
          <>
            <TouchableOpacity style={styles.iconPlay} onPress={onPress}>
              <IconPlayCircle />
            </TouchableOpacity>
            <View style={styles.wrapperTitle}>
              <Text style={styles.episode}>
                {animeDetail.type !== 'Movie' && `${postEpisode} -`}
                {moment(episodes.updated_at).format('DD MMMM YYYY')}
              </Text>
              <Text style={styles.title} numberOfLines={2}>
                {animeDetail.sub_name}
              </Text>
            </View>
          </>
        )}
      </View>
    </View>
  );
};

const mapStateToProps = state => ({
  addToWatchListLoading: state.WatchListReducer.addToWatchListLoading,
  addToWatchListResults: state.WatchListReducer.addToWatchListResults,
  addToWatchListError: state.WatchListReducer.addToWatchListError,

  getWatchListLoading: state.WatchListReducer.getWatchListLoading,
  getWatchListResults: state.WatchListReducer.getWatchListResults,
  getWatchListError: state.WatchListReducer.getWatchListError,
});

export default connect(mapStateToProps, null)(ImageDetail);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.onBackground,
  },
  wrapper: {
    width: '100%',
  },
  imageDetail: {
    width: '100%',
    height: responsiveHeight(270),
    resizeMode: 'cover',
  },
  linearGradient: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: responsiveHeight(270),
  },
  iconBookmark: {
    backgroundColor: colors.onPrimary,
    position: 'absolute',
    top: 16,
    right: 16,
    width: 50,
    height: 50,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
  },
  iconBack: {
    backgroundColor: colors.onPrimary,
    position: 'absolute',
    top: 16,
    left: 16,
    width: 50,
    height: 50,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
  },
  iconPlay: {
    position: 'absolute',
    top: responsiveHeight(80),
    left: screenWidth / 2 - 30,
    backgroundColor: colors.primary,
    paddingLeft: 20,
    paddingRight: 15,
    paddingVertical: 15,
    borderRadius: 50,
  },
  countDown: {
    position: 'absolute',
    flexDirection: 'row',
    top: 105,
    left: responsiveWidth(22),
    backgroundColor: colors.background,
    padding: 10,
    borderRadius: 20,
  },
  countDownWrap: {
    color: colors.onBackground,
    marginHorizontal: 3,
    alignItems: 'center',
  },
  countDownTitle: {
    backgroundColor: colors.onPrimary,
    padding: 16,
    borderRadius: 5,
    color: colors.onBackground,
    fontFamily: fonts.nunito.bold,
    fontSize: 24,
  },
  countDownLabel: {
    marginTop: 3,
    color: colors.onBackground,
    fontFamily: fonts.nunito.bold,
    fontSize: 12,
  },
  wrapperTitle: {
    position: 'absolute',
    left: 16,
    right: 16,
    bottom: 8,
  },
  episode: {
    fontFamily: fonts.sora.regular,
    fontSize: 10,
    color: colors.onBackground,
    marginBottom: 8,
  },
  title: {
    fontFamily: fonts.nunito.bold,
    fontSize: 22,
    color: colors.onBackground,
  },
});
