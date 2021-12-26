import React, {useCallback, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
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
const UpcomingAnime = ({loading, isPages}) => {
  const [movies, setMovies] = useState([]);
  const [moreMovies, setMoreMovies] = useState([]);
  const [isLoading, setLoading] = useState(loading);
  const [page, setPage] = useState(0);
  const [isPage, setIsPage] = useState(isPages);

  const getMovieList = useCallback(async () => {
    setLoading(true);
    const res = await getUpcomingAnimes();
    setMovies(res.data.episodes);
    setLoading(false);
    // setTimeout(() => {
    // }, 1000);
  }, []);

  useEffect(() => {
    getMovieList();
  }, [getMovieList]);

  const loadMoreMovies = async () => {
    if (!stopLoadMore) {
      setLoading(true);
      setPage(page + 1);
      const res = await getMoreUpcomingAnimes(page);
      if (res.data.pages) {
        setMoreMovies(res.data.episodes);
        stopLoadMore = true;
        setIsPage(true);
      } else {
        console.log('err>>', res.data.pages);
      }
      setLoading(false);
    }
  };
  console.log('pageUp>>', page);
  console.log('isPage>>', isPage);

  const _renderItem = ({item, index}) => {
    return (
      <CardUpcomingAnime
        key={item.post_id}
        title={item.sub_name}
        rating={item.rate}
        thumbnail={`${IMG_ANIME_URL}/${item.sub_banner}`}
        isLoading={isLoading}
      />
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Upcoming Anime</Text>
      <View horizontal={true} style={styles.wrapper}>
        <FlatList
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={!isPages ? movies : moreMovies}
          renderItem={_renderItem}
          keyExtractor={item => item.post_id.toString()}
          scrollToEnd={() => ({animated: true})}
          onEndReached={loadMoreMovies}
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

export default UpcomingAnime;

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
