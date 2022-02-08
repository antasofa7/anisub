import moment from 'moment';
import React, {useCallback, useEffect, useState} from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import WebView from 'react-native-webview';
import {colors, fonts, responsiveHeight, responsiveWidth} from '../../utils';

const PlayVideo = ({animeDetail, episode}) => {
  const [orientation, setOrientation] = useState('portrait');

  const getOrientation = useCallback(() => {
    if (Dimensions.get('window').width < Dimensions.get('window').height) {
      setOrientation('portrait');
    } else {
      setOrientation('landscape');
    }
  }, []);

  useEffect(() => {
    animeDetail;
    getOrientation();
  }, [animeDetail, getOrientation]);

  return (
    <View style={styles.container(orientation)}>
      <WebView
        allowsFullscreenVideo={true}
        source={{
          uri: animeDetail.post_video,
          // html: `<iframe mozallowfullscreen webkitallowfullscreen oallowfullscreen
          // msallowfullscreen width="100%" height="100%" src=${animeDetail.post_video} frameborder="0" allowfullscreen="true"></iframe>`,
        }}
      />
      <View style={styles.wrapperTitle}>
        <Text style={styles.title} numberOfLines={1}>
          {animeDetail.post_name}
        </Text>
        {episode && (
          <Text style={styles.episode}>
            Episode {animeDetail.post_episodes} -{' '}
            {moment(animeDetail.updated_at).format('DD MMMM YYYY')}
          </Text>
        )}
      </View>
    </View>
  );
};

export default PlayVideo;

const styles = StyleSheet.create({
  container: orientation => ({
    width: orientation === 'portrait' ? responsiveWidth(360) : '100%',
    height: responsiveHeight(270),
    backgroundColor: colors.background,
  }),
  wrapperTitle: {
    marginHorizontal: 16,
    marginBottom: 8,
  },
  episode: {
    fontFamily: fonts.sora.regular,
    fontSize: 10,
    color: colors.onBackground,
  },
  title: {
    fontFamily: fonts.nunito.bold,
    fontSize: 22,
    color: colors.onBackground,
  },
});
