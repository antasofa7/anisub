import {BannerAd, BannerAdSize} from '@react-native-admob/admob';
import React, {useRef} from 'react';
import {StyleSheet, View} from 'react-native';

export default function BannerAds(marginTop, marginHorizontal) {
  const bannerRef = useRef(null);
  return (
    <View style={styles.container(marginTop, marginHorizontal)}>
      <BannerAd
        size={BannerAdSize.BANNER}
        unitId="ca-app-pub-8364630765022754/8823717473"
        ref={bannerRef}
      />
      {/* <Button title="Reload" onPress={() => bannerRef.current?.loadAd()} /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: (marginTop, marginHorizontal) => ({
    marginTop: marginTop ? 24 : 0,
    marginHorizontal: 16,
  }),
});
