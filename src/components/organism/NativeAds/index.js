import React, {useRef} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import NativeAdView, {
  AdBadge,
  AdvertiserView,
  CallToActionView,
  HeadlineView,
  IconView,
  ImageView,
  NativeMediaView,
  PriceView,
  StarRatingView,
  StoreView,
  TaglineView,
} from 'react-native-admob-native-ads';

export default function NativeAds(props) {
  const {
    adBadge,
    headlineView,
    taglineView,
    advertiserView,
    priceView,
    storeView,
    starRatingView,
    nativeMediaView,
    imageView,
    iconView,
    callToActionView,
  } = props;
  const nativeAdViewRef = useRef();

  React.useEffect(() => {
    nativeAdViewRef.current?.loadAd();
  }, []);
  return (
    <View style={styles.container}>
      <NativeAdView
        ref={nativeAdViewRef}
        adUnitID="ca-app-pub-8364630765022754/3287298261">
        <View>
          <Text>
            {adBadge && (
              <AdBadge
                style={styles.adBadge}
                textStyle={styles.textStyleAdBadge}
              />
            )}
          </Text>
          {headlineView && <HeadlineView style={styles.headlineView} />}
          {taglineView && <TaglineView style={styles.taglineView} />}
          {advertiserView && <AdvertiserView style={styles.advertiserView} />}
          {priceView && <PriceView style={styles.priceView} />}
          {storeView && <StoreView style={styles.storeView} />}
          {starRatingView && <StarRatingView />}
          {nativeMediaView && (
            <NativeMediaView style={styles.nativeMediaView} />
          )}
          {imageView && <ImageView style={styles.imageView} />}
          {iconView && <IconView style={styles.iconView} />}
          {callToActionView && (
            <CallToActionView
              style={styles.callToActionView}
              textStyle={styles.textStyleCallToActionView}
            />
          )}
        </View>
      </NativeAdView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
  },
  adBadge: {
    width: 15,
    height: 15,
    borderWidth: 1,
    borderRadius: 2,
    borderColor: 'green',
  },
  textStyleAdBadge: {
    fontSize: 9,
    color: 'green',
  },
  headlineView: {
    fontWeight: 'bold',
    color: '#FFFFFF',
    fontSize: 13,
  },
  taglineView: {
    fontWeight: 'bold',
    color: '#FFFFFF',
    fontSize: 12,
  },
  advertiserView: {
    fontWeight: 'bold',
    color: '#FFFFFF',
    fontSize: 10,
  },
  priceView: {
    fontWeight: 'bold',
    color: '#FFFFFF',
    fontSize: 10,
  },
  storeView: {
    fontWeight: 'bold',
    color: '#FFFFFF',
    fontSize: 10,
  },
  nativeMediaView: {
    width: '100%',
    height: 250,
  },
  imageView: {
    width: '100%',
    height: 250,
  },
  iconView: {
    width: 60,
    height: 60,
  },
  callToActionView: {
    height: 45,
    width: '100%',
    paddingHorizontal: 12,
    backgroundColor: 'purple',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    elevation: 10,
  },
  textStyleCallToActionView: {color: 'white', fontSize: 14},
});
