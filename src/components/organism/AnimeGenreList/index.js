import React, {useCallback, useEffect, useState} from 'react';
import {
  Dimensions,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {getAllNew, getMoreAllNew} from '../../../config';
import {colors, fonts, IMG_EPISODE_URL, responsiveWidth} from '../../../utils';
import {LoadingPage} from '../../atoms/Loading';
import {ListFooterComponent} from '../../atoms/Loading/ListFooterComponent';
import Spacing from '../../atoms/Spacing';
import {MainCardFilm} from '../../molecules';

const AnimeGenreList = ({navigation}) => {
  // const navigation = useNavigation();
  const [movies, setMovies] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [isMoreLoading, setMoreLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [isPage, setIsPage] = useState(false);
  const [stopLoadMore, setStopLoadMore] = useState(false);
  const [allDataDisplayed, setAllDataDisplayed] = useState(false);

  const getMovieList = useCallback(async () => {
    setLoading(true);
    const allAnime = await getAllNew();
    setMovies(allAnime.data.episodes);
    setIsPage(allAnime.data.pages);
    setLoading(false);
  }, []);

  useEffect(() => {
    getMovieList();
  }, [getMovieList]);

  const numColumns = 3;
  const size = Dimensions.get('window').width / numColumns - 20;

  const _itemSeparator = () => {
    return <View style={styles.separator} />;
  };

  const loadMoreMovies = async () => {
    try {
      if (!stopLoadMore) {
        if (isPage) {
          setMoreLoading(true);
          const res = await getMoreAllNew(page);
          setMovies([...movies, ...res.data.episodes]);
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

  const _renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('Detail', {animeId: item.sub_id})}>
        <MainCardFilm
          key={index}
          title={item.post_name}
          rating={item.rate}
          thumbnail={`${IMG_EPISODE_URL}/${item.post_image}`}
          width={size}
          margin={0}
          isLoading={isLoading}
        />
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {isLoading ? (
        <LoadingPage />
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
          ListHeaderComponent={() => <Spacing height={16} />}
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
      )}
    </SafeAreaView>
  );
};

export default AnimeGenreList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 16,
    zIndex: -1,
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
    bottom: 90,
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
