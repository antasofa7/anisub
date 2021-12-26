import React, {useCallback, useState} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {colors, fonts, IMG_EPISODE_URL} from '../../../utils';
import {MainCardFilm} from '../../molecules';

const OtherEpisodes = ({episodes, animeId, pages}) => {
  // console.log('episodes>> ', episodes);
  // const [moreEpisodes, setMoreEpisodes] = useState([]);
  // const [page, setPage] = useState(0);

  // const getMoreEpisodes = async ({page}) => {
  //   const res = await getMoreEpisodes(animeId, page);
  //   console.log('more episode >>', res.data);
  //   // setMoreEpisodes(res.)
  // };

  // const loadMoreEpisodes = () => {
  //   setPage(page + 1);
  //   getMoreEpisodes(page);
  // };

  const _renderItem = ({item, index}) => {
    return (
      <View key={item.post_id} style={styles.wrapperItem}>
        <MainCardFilm
          key={item.post_id}
          title={item.post_name}
          //   rating={item.rate}
          thumbnail={`${IMG_EPISODE_URL}/${item.post_image}`}
          // isLoading={isLoading}
          // onPress={() => navigation.navigate("movie", { movieId: item.id })}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Other Episodes</Text>
      <View style={styles.wrapper}>
        <FlatList
          data={episodes.reverse()}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          renderItem={_renderItem}
          initialNumToRender={3}
          keyExtractor={item => item.post_id.toString()}
          // scrollToEnd={() => ({animated: true})}
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
    marginTop: 8,
  },
  label: {
    fontSize: 14,
    fontFamily: fonts.sora.medium,
    color: colors.onBackground,
  },
});
