import React, {useCallback, useEffect, useState} from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import WebView from 'react-native-webview';
import {colors, responsiveHeight, responsiveWidth} from '../../utils';

const PlayVideo = ({animeDetail}) => {
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
});
