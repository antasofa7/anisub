import {useNavigation} from '@react-navigation/native';
import moment from 'moment';
import React from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {IconBack, IconPlayCircle} from '../../../assets';
import {colors, fonts, responsiveHeight, responsiveWidth} from '../../../utils';
import {IMG_ANIME_URL} from '../../../utils/constan';

const leftPlayIcon = Dimensions.get('window').width / 2 - 30;

const VideoDetail = ({animeDetail}) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.iconBack}>
        <IconBack onPress={() => navigation.goBack()} />
      </View>

      <View style={styles.iconPlay}>
        <IconPlayCircle />
      </View>
      <FastImage
        source={{
          uri:
            `${IMG_ANIME_URL}/${animeDetail.sub_banner}` ||
            '../../../assets/images/image-default.jpg',
          priority: FastImage.priority.normal,
        }}
        style={styles.imageDetail}
      />
      <View style={styles.wrapperTitle}>
        <Text style={styles.title}>{animeDetail.sub_name}</Text>
        <Text style={styles.episode}>
          Episode 09 -{moment(animeDetail.rilis).format('DD MMMM YYYY')}
        </Text>
      </View>
    </View>
  );
};

export default VideoDetail;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.onBackground,
  },
  imageDetail: {
    width: responsiveWidth(360),
    height: responsiveHeight(270),
    resizeMode: 'cover',
  },
  linearGradient: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    width: responsiveWidth(360),
    height: responsiveHeight(270),
  },
  iconBookmark: {
    position: 'absolute',
    top: 16,
    right: 16,
    opacity: 0.5,
    backgroundColor: colors.onPrimary,
    padding: 10,
    borderRadius: 5,
  },
  iconBack: {
    position: 'absolute',
    top: 16,
    left: 16,
    opacity: 0.5,
    backgroundColor: colors.onPrimary,
    padding: 10,
    borderRadius: 5,
  },
  iconPlay: {
    position: 'absolute',
    top: 105,
    left: leftPlayIcon,
    opacity: 0.5,
    backgroundColor: colors.onPrimary,
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
