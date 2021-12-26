import React, {useCallback, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {getAllNew, getMoreAllNew} from '../../../config';
import {colors, fonts, responsiveHeight, responsiveWidth} from '../../../utils';
import {IMG_EPISODE_URL} from '../../../utils/constan';
import {CardNewAllMovie} from '../../molecules';

let stopLoadMore = true;

const NewAllAnime = ({loading, isPages}) => {
  const [movies, setMovies] = useState([]);
  const [moreMovies, setMoreMovies] = useState([]);
  const [isLoading, setLoading] = useState(loading);
  const [page, setPage] = useState(0);
  const [isPage, setIsPage] = useState(isPages);

  const getMovieList = useCallback(async () => {
    setLoading(true);
    const res = await getAllNew();
    setMovies(res.data.episodes);
    setLoading(false);
  }, []);

  useEffect(() => {
    getMovieList();
  }, [getMovieList, setLoading]);

  const loadMoreEpisodes = async () => {
    if (!stopLoadMore) {
      setLoading(true);
      setPage(page + 1);
      const res = await getMoreAllNew(page);
      setMoreMovies(res.data.episodes);
      stopLoadMore = true;
      setIsPage(true);
    }
    setLoading(false);
  };

  const _renderItem = ({item, index}) => {
    return (
      <CardNewAllMovie
        key={item.post_id}
        title={item.post_name}
        rating={item.rate}
        thumbnail={`${IMG_EPISODE_URL}/${item.post_image}`}
        isLoading={isLoading}
      />
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>New Movie</Text>
      <View horizontal={true} style={styles.wrapper}>
        <FlatList
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={!isPage ? movies : moreMovies}
          renderItem={_renderItem}
          initialNumToRender={4}
          // ItemSeparatorComponent={_itemSeparator}
          keyExtractor={item => item.sub_id.toString()}
          // numColumns={numColumns}
          // scrollToIndex={() => ({animated: true, index: 0})}
          scrollToEnd={() => ({animated: true})}
          onEndReached={loadMoreEpisodes}
          onEndReachedThreshold={1}
          onMomentumScrollBegin={() => {
            stopLoadMore = false;
          }}
          ListFooterComponent={() =>
            isLoading && (
              <View style={styles.loading}>
                <ActivityIndicator />
              </View>
            )
          }
        />
      </View>
    </View>
  );
};

export default NewAllAnime;

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    marginHorizontal: 16,
  },
  wrapper: {
    flexDirection: 'row',
    height: responsiveHeight(110),
    marginTop: 8,
  },
  label: {
    fontSize: 14,
    fontFamily: fonts.sora.medium,
    color: colors.onBackground,
  },
  wrapperImageLoading: {
    flexDirection: 'row',
    marginTop: 8,
  },
  loading: {
    flex: 1,
    width: responsiveWidth(100),
    justifyContent: 'center',
    alignItems: 'center',
  },
});
