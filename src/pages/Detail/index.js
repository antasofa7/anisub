import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {IconShare} from '../../assets';
import {ImageDetail, Star} from '../../components';
import {colors, fonts} from '../../utils';

const Detail = () => {
  return (
    <View style={styles.container}>
      <ImageDetail />
      <View style={styles.wrapper}>
        <Text style={styles.genre}>
          2020 | Isekai Action Sci-Fi | 24 minute
        </Text>
        <View style={styles.wrapperRating}>
          <Star rating={8.6} size={28} />
          <IconShare />
        </View>
      </View>
      <View style={styles.sinopsis}>
        <Text style={styles.sinopsisTitle}>Synopsis</Text>
        <Text style={styles.sinopsisDetail}>
          Tanta petere igitur, ne sineres memini fieri etiam aliquam
          inclinationem ad consequendum minima. Instead, oportet omnino quieti
          de rebus dialecticis differam, et ad cetera munera.
        </Text>
      </View>
    </View>
  );
};

export default Detail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  wrapper: {
    marginVertical: 4,
    marginHorizontal: 16,
  },
  genre: {
    fontFamily: fonts.sora.regular,
    fontSize: 10,
    color: colors.onBackground,
  },
  wrapperRating: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  sinopsis: {
    marginHorizontal: 16,
  },
  sinopsisTitle: {
    marginTop: 16,
    fontFamily: fonts.sora.semiBold,
    fontSize: 12,
    color: colors.onBackground,
  },
  sinopsisDetail: {
    marginTop: 8,
    fontFamily: fonts.sora.regular,
    fontSize: 10,
    color: colors.onBackground,
  },
});
