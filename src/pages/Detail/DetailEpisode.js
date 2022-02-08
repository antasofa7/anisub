import React from 'react';
import {StyleSheet, View} from 'react-native';
import {colors, responsiveHeight} from '../../utils';
import PlayVideo from './PlayVideo';

const DetailEpisode = ({route}) => {
  const {episode} = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.video}>
        <PlayVideo animeDetail={episode} episode={true} />
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
  video: {
    height: responsiveHeight(320),
  },
});
