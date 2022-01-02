import React, {useCallback, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {getMoreUpcomingAnimes, getUpcomingAnimes} from '../../../config';
import {
  colors,
  fonts,
  IMG_ANIME_URL,
  responsiveHeight,
  responsiveWidth,
} from '../../../utils';
import {CardUpcomingAnime} from '../../molecules';

let stopLoadMore = true;

const UpcomingAnime = ({loading, navigation}) => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [page, setPage] = useState(0);

  const getMovieList = useCallback(async () => {
    setLoading(true);
    const res = await getUpcomingAnimes();
    setMovies(res.data.episodes);
    setLoading(false);
  }, []);

  useEffect(() => {
    getMovieList();
  }, [getMovieList]);

  const loadMoreMovies = async () => {
    setLoading(true);
    if (!stopLoadMore) {
      setPage(page + 1);
      const res = await getMoreUpcomingAnimes(page);
      if (!res.data.pages) {
        return;
      } else {
        setMovies([...movies, ...res.data.episodes]);
        stopLoadMore = true;
      }
      setLoading(false);
    }
  };

  const _renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() => navigation('Detail', {animeId: item.sid_new})}>
        <CardUpcomingAnime
          key={item.post_id}
          title={item.sub_name}
          rating={item.rate}
          thumbnail={`${IMG_ANIME_URL}/${item.sub_banner}`}
          isLoading={isLoading}
        />
      </TouchableOpacity>
    );
  };

  const _itemSeparator = () => {
    return <View style={styles.separator} />;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Upcoming Anime</Text>
      <View horizontal={true} style={styles.wrapper}>
        <FlatList
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={movies}
          renderItem={_renderItem}
          initialNumToRender={4}
          maxToRenderPerBatch={8}
          // keyExtractor={item => item.post_id.toString()}
          scrollToEnd={() => ({animated: true})}
          getItemLayout={(data, index) => ({
            length: responsiveHeight(100),
            offset: responsiveHeight(100) * index,
            index,
          })}
          onEndReached={loadMoreMovies}
          onEndReachedThreshold={0.5}
          onMomentumScrollBegin={() => {
            stopLoadMore = false;
          }}
          ListFooterComponent={() =>
            isLoading && (
              <View style={styles.loading}>
                <ActivityIndicator color={colors.onPrimary} />
              </View>
            )
          }
        />
      </View>
    </View>
  );
};

export default UpcomingAnime;

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
  },
  wrapper: {
    flexDirection: 'row',
    height: responsiveHeight(110),
    marginTop: 12,
  },
  label: {
    fontSize: 16,
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
  separator: {
    height: 16,
    width: '100%',
    backgroundColor: 'transparent',
  },
});
