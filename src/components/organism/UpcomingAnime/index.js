import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {getMoreUpcomingAnimes} from '../../../config';
import {colors, fonts, IMG_ANIME_URL, responsiveHeight} from '../../../utils';
import {LoadingPage} from '../../atoms/Loading';
import {CardUpcomingAnime} from '../../molecules';

const UpcomingAnime = ({navigation, upcomingAnime}) => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [isPage, setIsPage] = useState(false);
  const [stopLoadMore, setStopLoadMore] = useState(false);
  const [allDataDisplayed, setAllDataDisplayed] = useState(false);

  useEffect(() => {
    setMovies(upcomingAnime.episodes);
    setIsPage(upcomingAnime.pages);
  }, [upcomingAnime]);

  const loadMoreMovies = async () => {
    try {
      if (!stopLoadMore) {
        if (isPage) {
          setLoading(true);
          const res = await getMoreUpcomingAnimes(page);
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
        onPress={() => navigation('DetailUpcoming', {animeId: item.sid_new})}>
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

export default UpcomingAnime;

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
  },
  wrapper: {
    flexDirection: 'row',
    height: responsiveHeight(130),
    marginTop: 16,
  },
  label: {
    fontSize: 16,
    fontFamily: fonts.sora.medium,
    color: colors.onBackground,
  },
});
