import React from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {colors, fonts, IMG_ANIME_URL, responsiveHeight} from '../../../utils';
import {CardNewAllMovie} from '../../molecules';

const WatchList = props => {
  const {navigation, watchlist, loading} = props;

  const _renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() => navigation('Detail', {animeId: item.animeId})}>
        <CardNewAllMovie
          key={item.animeId}
          title={item.title}
          rating={item.rating}
          thumbnail={`${IMG_ANIME_URL}/${item.thumbnail}`}
          isLoading={loading}
        />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Watch List</Text>
      <View horizontal={true} style={styles.wrapper}>
        <FlatList
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={watchlist}
          renderItem={_renderItem}
          initialNumToRender={4}
          maxToRenderPerBatch={8}
          keyExtractor={(item, index) => String(index)}
          scrollToEnd={() => ({animated: true})}
          getItemLayout={(data, index) => ({
            length: responsiveHeight(110),
            offset: responsiveHeight(110) * index,
            index,
          })}
        />
      </View>
    </View>
  );
};

export default WatchList;

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
  },
  wrapper: {
    flexDirection: 'row',
    height: responsiveHeight(130),
    marginTop: 16,
  },
  label: {
    fontSize: 16,
    fontFamily: fonts.sora.medium,
    color: colors.onBackground,
  },
});
