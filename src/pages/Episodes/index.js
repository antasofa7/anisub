import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {IconBack} from '../../assets';
import {Spacing} from '../../components/atoms';
import {LoadingPage} from '../../components/atoms/Loading';
import {ListFooterComponent} from '../../components/atoms/Loading/ListFooterComponent';
import {MainCardFilm} from '../../components/molecules';
import {getMoreEpisodes} from '../../config';
import {colors, fonts, IMG_EPISODE_URL, responsiveHeight} from '../../utils';

const Episodes = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const anime = route.params.animeDetail;
  const [movies, setMovies] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [isMoreLoading, setMoreLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [isPage, setIsPage] = useState(false);
  const [stopLoadMore, setStopLoadMore] = useState(false);
  const [allDataDisplayed, setAllDataDisplayed] = useState(false);

  useEffect(() => {
    setLoading(true);
    setMovies(anime.episodes);
    setIsPage(anime.pages);
    setLoading(false);
  }, [anime]);

  const numColumns = 3;
  const size = Dimensions.get('window').width / numColumns - 20;

  console.log('page', page);
  console.log('loading', isLoading);
  console.log('pages', isPage);
  console.log('loadingMore', isMoreLoading);
  console.log('stopLoadMore', stopLoadMore);
  console.log('allDataDisplayed', allDataDisplayed);

  // console.log('moreMovies >>', movies);
  console.log('animeId>', anime.sub_id);

  const _renderItem = ({item, index}) => {
    // console.log('item>', item);
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('DetailEpisode', {
            episode: item,
          })
        }>
        <MainCardFilm
          key={item.post_id}
          title={item.post_name}
          thumbnail={`${IMG_EPISODE_URL}/${item.post_image}`}
          width={size}
          margin={0}
          isLoading={isLoading}
        />
      </TouchableOpacity>
    );
  };

  const _itemSeparator = () => {
    return <View style={styles.separator} />;
  };

  const loadMoreMovies = async () => {
    try {
      if (!stopLoadMore) {
        if (isPage) {
          setMoreLoading(true);
          const animeId = anime.sub_id;
          const res = await getMoreEpisodes(animeId, page);
          console.log('pages', res.data.pages);
          // movies.push(...res.data.animes);
          setMovies([...movies, ...res.data.episodes]);
          console.log('episodes>', res.data.episodes);
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
        <View style={styles.wrapper}>
          <View style={styles.header}>
            <View style={styles.iconBack}>
              <IconBack onPress={() => navigation.goBack()} />
            </View>
            <Spacing width={30} />
            <Text numberOfLines={1} style={styles.title}>
              {anime.sub_name}
            </Text>
          </View>
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
            ListFooterComponent={
              <ListFooterComponent
                isMoreLoading={isMoreLoading}
                allDataDisplayed={allDataDisplayed}
              />
            }
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default Episodes;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  wrapper: {
    margin: 16,
  },
  header: {
    height: responsiveHeight(40),
    flexDirection: 'row',
  },
  iconBack: {
    opacity: 0.5,
  },
  title: {
    fontFamily: fonts.sora.medium,
    fontSize: 20,
    color: colors.onBackground,
    marginTop: -5,
  },
  separator: {
    height: 12,
    width: '100%',
    backgroundColor: 'transparent',
  },
});
