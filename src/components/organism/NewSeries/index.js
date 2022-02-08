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
import {getMoreNewSeries} from '../../../config';
import {IMG_EPISODE_URL} from '../../../utils';
import {LoadingPage} from '../../atoms/Loading';
import {ListFooterComponent} from '../../atoms/Loading/ListFooterComponent';
import Spacing from '../../atoms/Spacing';
import {MainCardFilm} from '../../molecules';

const NewSeries = ({newSeries, loading}) => {
  const navigation = useNavigation();
  const [movies, setMovies] = useState([]);
  const [isMoreLoading, setMoreLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [isPage, setIsPage] = useState(false);
  const [stopLoadMore, setStopLoadMore] = useState(false);
  const [allDataDisplayed, setAllDataDisplayed] = useState(false);

  const getMovieList = useCallback(async () => {
    setMovies(newSeries.episodes);
    setIsPage(newSeries.pages);
  }, [newSeries]);

  useEffect(() => {
    getMovieList();
  }, [getMovieList]);

  const numColumns = 2;
  const size = Dimensions.get('window').width / numColumns - 24;

  const _itemSeparator = () => {
    return <View style={styles.separator} />;
  };

  const _renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('Detail', {animeId: item.sid_new})}>
        <MainCardFilm
          key={item.post_id}
          title={item.post_name}
          rating={item.rate}
          thumbnail={`${IMG_EPISODE_URL}/${item.post_image}`}
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
          const res = await getMoreNewSeries(page);
          setIsPage(res.data.pages);
          setMovies([...movies, ...res.data.episodes]);
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
      {loading ? (
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
          removeClippedSubviews={true} // Unmount components when outside of window
          initialNumToRender={4} // Reduce initial render amount
          maxToRenderPerBatch={1} // Reduce number in each render batch
          ListHeaderComponent={() => <Spacing height={16} />}
          ListFooterComponent={
            <ListFooterComponent
              isMoreLoading={isMoreLoading}
              allDataDisplayed={allDataDisplayed}
            />
          }
        />
      )}
    </SafeAreaView>
  );
};

export default NewSeries;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
  },
  separator: {
    height: 14,
    width: '100%',
    backgroundColor: 'transparent',
  },
});
