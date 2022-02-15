import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {LANDSCAPE, OrientationLocker} from 'react-native-orientation-locker';
import WebView from 'react-native-webview';
import {IconCloseSmall} from '../../assets';

const PlayVideo = ({route}) => {
  const {animeDetail} = route.params;
  const navigation = useNavigation();

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
          uri: animeDetail.post_video,
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
