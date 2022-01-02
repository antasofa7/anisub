import React, {useCallback, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {getAllNew, getAnimeByGenre, getPlaylistyByGenre} from '../../../config';
import {
  colors,
  fonts,
  IMG_ANIME_URL,
  responsiveHeight,
  responsiveWidth,
} from '../../../utils';
import {Spacing} from '../../atoms';
import {MainCardFilm} from '../../molecules';

const PlaylistByGenre = ({genreID}) => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(0);
  const [isLoading, setLoading] = useState(false);
  const [stopLoadMore, setStopLoadMore] = useState(true);
  const [allDataDisplayed, setAllDataDisplayed] = useState(false);

  const getMovieList = useCallback(async () => {
    setLoading(true);
    const res = await getPlaylistyByGenre(genreID, page);
    setMovies(res.data.getAnime);
    setLoading(false);
  }, [genreID, page]);

  useEffect(() => {
    getMovieList();
  }, [getMovieList]);

  const numColumns = 3;
  const size = Dimensions.get('window').width / numColumns - 18;

  const _itemSeparator = () => {
    return <View style={styles.separator} />;
  };

  const _renderItem = ({item, index}) => {
    return (
      <MainCardFilm
        key={item.sub_id}
        title={item.sub_name}
        rating={item.rate}
        thumbnail={`${IMG_ANIME_URL}/${item.sub_banner}`}
        width={size}
        margin={0}
      />
    );
  };

  const loadMoreMovies = async () => {
    setLoading(true);
    if (!stopLoadMore) {
      setPage(page + 1);
      const res = await getPlaylistyByGenre(genreID, page);
      if (res.error) {
        setAllDataDisplayed(true);
        setLoading(false);
        return null;
      }
      setMovies([...movies, ...res.data.getAnime]);
      setStopLoadMore(true);
      return null;
    }
    setLoading(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={movies}
        renderItem={_renderItem}
        ItemSeparatorComponent={_itemSeparator}
        keyExtractor={item => item.post_id.toString()}
        numColumns={numColumns}
        onEndReached={loadMoreMovies}
        onEndReachedThreshold={0.5}
        onMomentumScrollBegin={() => setStopLoadMore(false)}
        ListFooterComponent={() =>
          isLoading ? (
            <View style={styles.loading}>
              <ActivityIndicator size="large" color={colors.onBackground} />
            </View>
          ) : (
            <Spacing height={responsiveHeight(140)} />
          )
        }
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={allDataDisplayed}
        onRequestClose={() => {
          setAllDataDisplayed(false);
        }}>
        <TouchableOpacity
          style={styles.allDataDisplayed}
          onPress={() => setAllDataDisplayed(false)}>
          <Text style={styles.TextDisplayed}>
            Semua data sudah ditampilkan.
          </Text>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
};

export default PlaylistByGenre;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 16,
  },
  separator: {
    height: 12,
    width: '100%',
    backgroundColor: 'transparent',
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  allDataDisplayed: {
    position: 'absolute',
    bottom: 16,
    left: responsiveWidth(95),
    backgroundColor: colors.primary,
    borderRadius: 10,
  },
  TextDisplayed: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    color: colors.onPrimary,
    fontFamily: fonts.sora.regular,
    fontSize: 10,
  },
});
