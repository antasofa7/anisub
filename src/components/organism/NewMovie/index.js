import {useNavigation} from '@react-navigation/native';
import React, {useCallback, useEffect, useState} from 'react';
import {
  Dimensions,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {getMoreNewMovies, getNewMovies} from '../../../config';
import {IMG_ANIME_URL} from '../../../utils';
import {LoadingPage} from '../../atoms/Loading';
import {ListFooterComponent} from '../../atoms/Loading/ListFooterComponent';
import {MainCardFilm} from '../../molecules';

const NewMovie = () => {
  const navigation = useNavigation();
  const [movies, setMovies] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [isMoreLoading, setMoreLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [isPage, setIsPage] = useState(false);
  const [stopLoadMore, setStopLoadMore] = useState(false);
  const [allDataDisplayed, setAllDataDisplayed] = useState(false);

  const getMovieList = useCallback(async () => {
    setLoading(true);
    const allMovies = await getNewMovies();
    setMovies(allMovies.data.animes);
    setIsPage(allMovies.data.pages);
    setLoading(false);

    if (!allMovies.data.pages) {
      setAllDataDisplayed(true);
      setMoreLoading(false);
    }
  }, []);

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
        onPress={() =>
          navigation.navigate('DetailMovies', {animeId: item.sub_id})
        }>
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
          const res = await getMoreNewMovies(page);
          console.log('PAGES', res.data.pages);
          setIsPage(res.data.pages);
          // movies.push(...res.data.animes);
          setMovies([...movies, ...res.data.animes]);
          setPage(page + 1);
          setStopLoadMore(true);

          setMoreLoading(false);
        } else {
          setAllDataDisplayed(true);
          setMoreLoading(false);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {isLoading ? (
        <LoadingPage margin />
      ) : (
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
          // updateCellsBatchingPeriod={100} // Increase time between renders
          // windowSize={7} // Reduce the window size
        />
      )}
    </SafeAreaView>
  );
};

export default NewMovie;

const styles = StyleSheet.create({
  container: {
    margin: 16,
    zIndex: -1,
  },
  separator: {
    height: 12,
    width: '100%',
    backgroundColor: 'transparent',
  },
});
