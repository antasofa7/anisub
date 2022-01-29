import React, {useCallback, useEffect, useState} from 'react';
import {
  Dimensions,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {getMorePlaylistyByGenre, getPlaylistyByGenre} from '../../../config';
import {IMG_ANIME_URL} from '../../../utils';
import {LoadingPage} from '../../atoms/Loading';
import {ListFooterComponent} from '../../atoms/Loading/ListFooterComponent';
import {MainCardFilm} from '../../molecules';

const PlaylistByGenre = ({genreID, navigation}) => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [isMoreLoading, setMoreLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [isPage, setIsPage] = useState(false);
  const [stopLoadMore, setStopLoadMore] = useState(false);
  const [allDataDisplayed, setAllDataDisplayed] = useState(false);

  const getMovieList = useCallback(async () => {
    setLoading(true);
    const res = await getPlaylistyByGenre(genreID);
    setMovies(res.data.getAnime);
    setIsPage(res.data.pages);
    setLoading(false);

    if (!res.data.pages) {
      setAllDataDisplayed(true);
      setMoreLoading(false);
    }
  }, [genreID]);

  useEffect(() => {
    getMovieList();
  }, [getMovieList]);

  const numColumns = 3;
  const size = Dimensions.get('window').width / numColumns - 20;

  const _itemSeparator = () => {
    return <View style={styles.separator} />;
  };

  const _renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('Detail', {animeId: item.sid_new})}>
        <MainCardFilm
          key={item.sub_id}
          title={item.sub_name}
          rating={item.rate}
          thumbnail={`${IMG_ANIME_URL}/${item.sub_banner}`}
          width={size}
          margin={0}
        />
      </TouchableOpacity>
    );
  };

  const loadMoreMovies = async () => {
    try {
      if (!stopLoadMore) {
        if (isPage) {
          setMoreLoading(true);
          const res = await getMorePlaylistyByGenre(genreID, page);
          setMovies([...movies, ...res.data.getAnime]);
          setIsPage(res.data.pages);
          setPage(page + 1);
          setStopLoadMore(true);

          setMoreLoading(false);
        } else {
          setAllDataDisplayed(true);
          setMoreLoading(false);
        }
      }
      setMoreLoading(false);
    } catch (error) {
      console.log('error >> ', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {isLoading ? (
        <LoadingPage />
      ) : (
        <>
          <FlatList
            data={movies}
            renderItem={_renderItem}
            ItemSeparatorComponent={_itemSeparator}
            keyExtractor={(item, index) => String(index)}
            numColumns={numColumns}
            onEndReached={loadMoreMovies}
            onEndReachedThreshold={0.1}
            onMomentumScrollBegin={() => setStopLoadMore(false)}
            ListFooterComponent={
              <ListFooterComponent
                isMoreLoading={isMoreLoading}
                allDataDisplayed={allDataDisplayed}
              />
            }
            removeClippedSubviews={true} // Unmount components when outside of window
            initialNumToRender={4} // Reduce initial render amount
            maxToRenderPerBatch={1} // Reduce number in each render batch
          />
        </>
      )}
    </SafeAreaView>
  );
};

export default PlaylistByGenre;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 16,
    zIndex: -1,
  },
  separator: {
    height: 12,
    width: '100%',
    backgroundColor: 'transparent',
  },
});
