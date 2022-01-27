import {useNavigation} from '@react-navigation/native';
import moment from 'moment';
import React, {useCallback, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';
import {IconPlayCircle, IconShare} from '../../assets';
import {Star} from '../../components/atoms';
import {MainCardFilm} from '../../components/molecules';
import {ImageDetail} from '../../components/organism';
import {getAnimeById} from '../../config';
import {
  colors,
  fonts,
  IMG_EPISODE_URL,
  responsiveHeight,
  responsiveWidth,
} from '../../utils';
import PlayVideo from './PlayVideo';

const DetailEpisode = ({route}) => {
  const {episode} = route.params;
  const [isVideoPlay, setVideoPlay] = useState(false);
  const [orientation, setOrientation] = useState('portrait');

  const getOrientation = useCallback(() => {
    if (Dimensions.get('window').width < Dimensions.get('window').height) {
      setOrientation('portrait');
    } else {
      setOrientation('landscape');
    }
  }, []);

  useEffect(() => {
    getOrientation();
  }, [getOrientation]);

  return (
    <View style={styles.container}>
      {isVideoPlay ? (
        <View style={styles.video}>
          <PlayVideo animeDetail={episode} />
        </View>
      ) : (
        <View style={styles.wrapper(orientation)}>
          <FastImage
            source={{
              uri:
                `${IMG_EPISODE_URL}/${episode.post_image}` ||
                '../../../assets/images/image-default.jpg',
              priority: FastImage.priority.normal,
            }}
            style={styles.imageDetail}
          />
          <LinearGradient
            colors={['rgba(13, 9, 0, 0)', 'rgba(13, 9, 0, 1)']}
            style={styles.linearGradient}
          />

          <TouchableOpacity
            style={styles.iconPlay}
            onPress={() => {
              setVideoPlay(true);
            }}>
            <IconPlayCircle />
          </TouchableOpacity>
          <View style={styles.wrapperTitle}>
            <Text style={styles.title} numberOfLines={1}>
              {episode.post_name}
            </Text>
            <Text style={styles.episode}>
              Episode {episode.post_episodes} -{' '}
              {moment(episode.updated_at).format('DD MMMM YYYY')}
            </Text>
          </View>
        </View>
      )}
    </View>
  );
};

export default DetailEpisode;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
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
  iconPlay: {
    position: 'absolute',
    top: 105,
    left: '40%',
    // opacity: 0.8,
    backgroundColor: colors.background,
    paddingLeft: 20,
    paddingRight: 15,
    paddingVertical: 15,
    borderRadius: 50,
  },
  video: {
    height: 320,
  },
  wrapperTitle: {
    position: 'absolute',
    left: 16,
    right: 16,
    bottom: 0,
  },
  episode: {
    fontFamily: fonts.sora.regular,
    fontSize: 12,
    color: colors.onBackground,
    marginBottom: 8,
  },
  title: {
    fontFamily: fonts.nunito.bold,
    fontSize: 22,
    color: colors.onBackground,
  },
});
