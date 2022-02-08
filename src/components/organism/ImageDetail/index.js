import {useNavigation} from '@react-navigation/native';
import moment from 'moment';
import React, {useCallback, useEffect, useState} from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';
import {IconBack, IconPlayCircle} from '../../../assets';
import {colors, fonts, responsiveHeight, responsiveWidth} from '../../../utils';
import {IMG_ANIME_URL} from '../../../utils/constan';

const leftPlayIcon = Dimensions.get('window').width / 2 - 30;

const ImageDetail = ({animeDetail, indexParams, onPress, upcoming}) => {
  const navigation = useNavigation();
  const [countDown, setCountDown] = useState({});
  const [orientation, setOrientation] = useState('portrait');

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

  const getOrientation = useCallback(() => {
    if (Dimensions.get('window').width < Dimensions.get('window').height) {
      setOrientation('portrait');
    } else {
      setOrientation('landscape');
    }
  }, []);

  useEffect(() => {
    getOrientation();
    const timer = setInterval(() => {
      setCountDown(calculateCountdown());
    }, 1000);

    return () => clearInterval(timer);
  }, [getOrientation, calculateCountdown]);

  const countDownComponent = [];

  Object.keys(countDown).forEach(interval => {
    countDownComponent.push(
      <View style={styles.countDownWrap} key={interval}>
        <Text style={styles.countDownTitle}>{countDown[interval]} </Text>
        <Text style={styles.countDownLabel}>{interval}</Text>
      </View>,
    );
  });

  return (
    <View style={styles.container}>
      <View style={styles.wrapper(orientation)}>
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
                {animeDetail.type !== 'Movie' &&
                  `${postEpisode} - ${moment(episodes.updated_at).format(
                    'DD MMMM YYYY',
                  )}`}
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

export default ImageDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.onBackground,
  },
  wrapper: orientation => ({
    width: orientation === 'portrait' ? responsiveWidth(360) : '100%',
  }),
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
    position: 'absolute',
    top: 16,
    right: 16,
    opacity: 0.6,
    backgroundColor: colors.onPrimary,
    padding: 10,
    borderRadius: 5,
  },
  iconBack: {
    position: 'absolute',
    top: 16,
    left: 16,
    opacity: 0.8,
    backgroundColor: colors.onPrimary,
    padding: 10,
    borderRadius: 5,
  },
  iconPlay: {
    position: 'absolute',
    top: 105,
    left: leftPlayIcon,
    backgroundColor: colors.background,
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
