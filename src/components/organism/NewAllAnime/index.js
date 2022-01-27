import React, {useCallback, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {getAllNew, getMoreAllNew} from '../../../config';
import {colors, fonts, responsiveHeight, responsiveWidth} from '../../../utils';
import {IMG_EPISODE_URL} from '../../../utils/constan';
import {LoadingPage} from '../../atoms/Loading';
import {CardNewAllMovie} from '../../molecules';

const NewAllAnime = ({navigation}) => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [isPage, setIsPage] = useState(false);
  const [stopLoadMore, setStopLoadMore] = useState(false);
  const [allDataDisplayed, setAllDataDisplayed] = useState(false);

  const getMovieList = useCallback(async () => {
    setLoading(true);
    const res = await getAllNew();
    setMovies(res.data.episodes);
    setIsPage(res.data.pages);
    setLoading(false);
  }, []);

  useEffect(() => {
    getMovieList();
  }, [getMovieList]);

  const loadMoreMovies = async () => {
    try {
      if (!stopLoadMore) {
        if (isPage) {
          setLoading(true);
          const res = await getMoreAllNew(page);
          console.log('pages', res.data.pages);
          setMovies([...movies, ...res.data.episodes]);
          setIsPage(res.data.pages);
          setPage(page + 1);
          setStopLoadMore(true);

          setLoading(false);
        } else {
          setAllDataDisplayed(true);
          setLoading(false);
        }
      }
      setLoading(false);
    } catch (error) {
      console.log('error >> ', error);
    }
  };

  const _renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() => navigation('Detail', {animeId: item.sub_id})}>
        <CardNewAllMovie
          key={item.post_id}
          title={item.post_name}
          rating={item.rate}
          thumbnail={`${IMG_EPISODE_URL}/${item.post_image}`}
          isLoading={isLoading}
        />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>New Anime</Text>
      <View horizontal={true} style={styles.wrapper}>
        <FlatList
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={movies}
          renderItem={_renderItem}
          initialNumToRender={4}
          maxToRenderPerBatch={8}
          keyExtractor={(item, index) => String(index)}
          scrollToEnd={() => ({animated: true})}
          getItemLayout={(data, index) => ({
            length: responsiveHeight(110),
            offset: responsiveHeight(110) * index,
            index,
          })}
          onEndReached={loadMoreMovies}
          onEndReachedThreshold={0.1}
          onMomentumScrollBegin={() => {
            setStopLoadMore(false);
          }}
          ListFooterComponent={
            <LoadingPage allDataDisplayed={allDataDisplayed} width small />
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
});
