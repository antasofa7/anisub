import {useNavigation} from '@react-navigation/native';
import React, {useCallback, useEffect, useState} from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {getHotMovies, getMoreHotMovies} from '../../../config';
import {colors, fonts, IMG_ANIME_URL, responsiveHeight} from '../../../utils';
import {LoadingPage} from '../../atoms/Loading';
import {CardUpcomingAnime, MainCardFilm} from '../../molecules';

const HotSeason = () => {
  const navigation = useNavigation();
  const [movies, setMovies] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [isPage, setIsPage] = useState(false);
  const [stopLoadMore, setStopLoadMore] = useState(false);
  const [allDataDisplayed, setAllDataDisplayed] = useState(false);

  const getMovieList = useCallback(async () => {
    setLoading(true);
    const res = await getHotMovies();
    setMovies(res.data.animes);
    setIsPage(res.data.pages);
    setLoading(false);
  }, []);

  useEffect(() => {
    getMovieList();
  }, [getMovieList]);

  const _renderItem = ({item, index}) => {
    const type = item.type;
    const detailPage = type === 'TV' ? 'Detail' : 'DetailMovies';
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate(detailPage, {animeId: item.sub_id})}>
        <MainCardFilm
          key={item.post_id}
          title={item.sub_name}
          rating={item.rate}
          thumbnail={`${IMG_ANIME_URL}/${item.sub_banner}`}
          isLoading={isLoading}
        />
      </TouchableOpacity>
    );
  };

  const loadMoreMovies = async () => {
    try {
      if (!stopLoadMore) {
        if (isPage) {
          setLoading(true);
          const res = await getMoreHotMovies(page);
          console.log('pages', res.data.pages);
          setMovies([...movies, ...res.data.animes]);
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

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Hot Movies</Text>
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

export default HotSeason;

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    zIndex: -1,
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
