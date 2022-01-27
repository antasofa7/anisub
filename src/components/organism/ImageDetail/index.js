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

const ImageDetail = ({animeDetail, indexParams, onPress}) => {
  const navigation = useNavigation();
  const [orientation, setOrientation] = useState('portrait');
  const index = indexParams || 0;
  const episodes = animeDetail.episodes[index];
  const postEpisode = index
    ? `Episode ${episodes.post_episodes}`
    : 'Last Episode';

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
        <TouchableOpacity style={styles.iconPlay} onPress={onPress}>
          <IconPlayCircle />
        </TouchableOpacity>
        <View style={styles.wrapperTitle}>
          <Text style={styles.episode}>
            {animeDetail.type === 'TV'
              ? `${postEpisode} - ${moment(episodes.updated_at).format(
                  'DD MMMM YYYY',
                )}`
              : null}
          </Text>
          <Text style={styles.title} numberOfLines={2}>
            {episodes.post_name}
          </Text>
        </View>
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
    // opacity: 0.8,
    backgroundColor: colors.background,
    paddingLeft: 20,
    paddingRight: 15,
    paddingVertical: 15,
    borderRadius: 50,
  },
  wrapperTitle: {
    position: 'absolute',
    left: 16,
    right: 16,
    bottom: 0,
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
