import {useNavigation} from '@react-navigation/native';
import React, {useCallback, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {colors, fonts, IMG_EPISODE_URL, responsiveHeight} from '../../../utils';
import {MainCardFilm} from '../../molecules';

const OtherEpisodes = ({animeDetail}) => {
  const navigation = useNavigation();

  const _renderItem = ({item, index}) => {
    return (
      <View key={item.post_id} style={styles.wrapperItem}>
        <MainCardFilm
          key={item.post_id}
          title={item.post_name}
          thumbnail={`${IMG_EPISODE_URL}/${item.post_image}`}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.wrapperLabel}>
        <Text style={styles.label}>Other Episodes</Text>
        {animeDetail.pages ? (
          <TouchableOpacity
            onPress={() => navigation.navigate('Episodes', {animeDetail})}>
            <Text style={styles.more}>See more</Text>
          </TouchableOpacity>
        ) : null}
      </View>
      <View style={styles.wrapper}>
        <FlatList
          data={animeDetail.episodes.reverse()}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          renderItem={_renderItem}
          initialNumToRender={3}
          keyExtractor={item => item.post_id.toString()}
          scrollToEnd={() => ({animated: true})}
          getItemLayout={(data, index) => ({
            length: responsiveHeight(100),
            offset: responsiveHeight(100) * index,
            index,
          })}
        />
      </View>
    </View>
  );
};

export default OtherEpisodes;

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    marginHorizontal: 16,
  },
  wrapper: {
    flexDirection: 'row',
    marginTop: 12,
  },
  wrapperLabel: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    fontSize: 14,
    fontFamily: fonts.sora.medium,
    color: colors.onBackground,
  },
  more: {
    fontSize: 12,
    fontFamily: fonts.sora.regular,
    color: colors.primary,
  },
});
