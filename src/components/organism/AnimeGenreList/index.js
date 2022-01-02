import {useNavigation} from '@react-navigation/native';
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
import {getAllNew, getMoreAllNew} from '../../../config';
import {
  colors,
  fonts,
  IMG_EPISODE_URL,
  responsiveHeight,
  responsiveWidth,
} from '../../../utils';
import {Spacing} from '../../atoms';
import {MainCardFilm} from '../../molecules';

const AnimeGenreList = () => {
  const navigation = useNavigation();
  const [movies, setMovies] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [stopLoadMore, setStopLoadMore] = useState(true);
  const [allDataDisplayed, setAllDataDisplayed] = useState(false);

  const getMovieList = useCallback(async () => {
    setLoading(true);
    const allAnime = await getAllNew();
    setMovies(allAnime.data.episodes);
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
    setLoading(true);
    if (!stopLoadMore) {
      setPage(page + 1);
      const res = await getMoreAllNew(page);
      if (res.error) {
        setAllDataDisplayed(true);
        return null;
      }
      setMovies([...movies, ...res.data.episodes]);
      setStopLoadMore(true);
      return null;
    }
    setLoading(false);
  };

  const _renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('Detail', {animeId: item.sub_id})}>
        <MainCardFilm
          key={item.post_id}
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

export default AnimeGenreList;

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
