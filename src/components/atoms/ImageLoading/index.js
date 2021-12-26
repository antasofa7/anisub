import React from 'react';
import {ActivityIndicator, Image, StyleSheet, View} from 'react-native';
import {ImageDefault} from '../../../assets';
import {colors, responsiveHeight, responsiveWidth} from '../../../utils';

const ImageLoading = ({margin}) => {
  return (
    <View style={styles.wrapperimageDefault(margin)}>
      <ActivityIndicator
        size="small"
        color={colors.onPrimary}
        style={styles.loading}
      />
      <Image source={ImageDefault} style={styles.imageDefault} />
    </View>
  );
};

export default ImageLoading;

const styles = StyleSheet.create({
  wrapperimageDefault: margin => ({
    marginRight: margin ? responsiveWidth(12) : 0,
    opacity: 0.7,
  }),
  imageDefault: {
    width: responsiveWidth(100),
    height: responsiveHeight(110),
    borderRadius: 10,
  },
  loading: {
    position: 'absolute',
    zIndex: 1,
    top: '40%',
    left: '40%',
  },
});
