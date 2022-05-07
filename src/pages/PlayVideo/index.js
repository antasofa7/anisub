import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {LANDSCAPE, OrientationLocker} from 'react-native-orientation-locker';
import WebView from 'react-native-webview';
import {IconCloseSmall} from '../../assets';

const PlayVideo = ({route}) => {
  const {animeDetail} = route.params;
  const navigation = useNavigation();
  const [videoUrl, setVideoUrl] = useState('');
  useEffect(() => {
    if (
      animeDetail.post_video.substring(0, 29) ===
      'https://anisubid.fun/emb?url='
    ) {
      setVideoUrl(animeDetail.post_video.substring(29));
    } else {
      setVideoUrl(animeDetail.post_video);
    }
  }, [animeDetail]);

  return (
    <View style={styles.container}>
      <OrientationLocker orientation={LANDSCAPE} />
      <View style={styles.iconClose}>
        <IconCloseSmall onPress={() => navigation.goBack()} />
      </View>
      <WebView
        allowsInlineMediaPlayback={true}
        mediaPlaybackRequiresUserAction={true}
        source={{
          uri: videoUrl,
        }}
      />
    </View>
  );
};

export default PlayVideo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  iconClose: {
    position: 'absolute',
    zIndex: 2,
    top: 16,
    left: 16,
  },
});
