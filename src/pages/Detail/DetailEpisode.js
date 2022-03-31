import {useNavigation} from '@react-navigation/native';
import moment from 'moment';
import React, {useState} from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';
import {
  IconBack,
  IconBookmark,
  IconBookmarkActive,
  IconPlayCircle,
} from '../../assets';
import {colors, fonts, IMG_EPISODE_URL, responsiveHeight} from '../../utils';

const leftPlayIcon = Dimensions.get('window').width / 2 - 30;

const DetailEpisode = ({animeDetail}) => {
  const navigation = useNavigation();
  const [isBookmark, setBookmark] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <FastImage
          source={{
            uri:
              `${IMG_EPISODE_URL}/${animeDetail.post_image}` ||
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
            <IconBookmarkActive onPress={() => setBookmark(false)} />
          ) : (
            <IconBookmark onPress={() => setBookmark(true)} />
          )}
        </View>
        <TouchableOpacity
          style={styles.iconPlay}
          onPress={() =>
            navigation.navigate('PlayVideo', {
              animeDetail: animeDetail,
            })
          }>
          <IconPlayCircle />
        </TouchableOpacity>
        <View style={styles.wrapperTitle}>
          <Text style={styles.episode}>
            {`Episode ${animeDetail.post_episodes} - ${moment(
              animeDetail.updated_at,
            ).format('DD MMMM YYYY')}`}
          </Text>
          <Text style={styles.title} numberOfLines={1}>
            {animeDetail.post_name}
          </Text>
        </View>
      </View>
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
  iconBack: {
    position: 'absolute',
    top: 16,
    left: 16,
    padding: 10,
  },
  iconBookmark: {
    position: 'absolute',
    top: 16,
    right: 16,
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
