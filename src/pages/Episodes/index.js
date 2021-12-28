import {useNavigation, useRoute} from '@react-navigation/native';
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
import {IconBack} from '../../assets';
import {Spacing} from '../../components/atoms';
import {MainCardFilm} from '../../components/molecules';
import {getMoreEpisodes} from '../../config';
import {
  colors,
  fonts,
  IMG_EPISODE_URL,
  responsiveHeight,
  responsiveWidth,
} from '../../utils';

const Episodes = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const anime = route.params.animeDetail;
  const [movies, setMovies] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [stopLoadMore, setStopLoadMore] = useState(true);
  const [allDataDisplayed, setAllDataDisplayed] = useState(false);

  useEffect(() => {
    setMovies(anime.episodes);
  }, [anime]);

  const numColumns = 3;
  const size = Dimensions.get('window').width / numColumns - 20;

  const _itemSeparator = () => {
    return <View style={styles.separator} />;
  };

  const loadMoreMovies = async () => {
    setLoading(true);
    setPage(page + 1);
    if (!stopLoadMore) {
      const animeId = anime.sub_id;
      console.log('ID >>', anime.sub_id);
      console.log('page >>', page);
      const res = await getMoreEpisodes(animeId, page);
      // const pages = res.data.pages;
      console.log('moreMovies >>', res);
      if (res.error) {
        setAllDataDisplayed(true);
        return;
      }
      // setMoreMovies(res.data.episodes);
      setMovies([...movies, ...res.data.episodes]);
      setStopLoadMore(true);
      // setIsPage(true);
    }
    setLoading(false);
  };
  // console.log('page>>', anime.pages);
  // console.log('episodes>>', episodes);
  const _renderItem = ({item, index}) => {
    return (
      <MainCardFilm
        key={item.post_id}
        title={item.post_name}
        thumbnail={`${IMG_EPISODE_URL}/${item.post_image}`}
        width={size}
        margin={0}
        isLoading={isLoading}
      />
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      {/* {isLoading ? (
        <View style={styles.loading}>
          <ActivityIndicator
            size="large"
            color={colors.onPrimary}
          />
        </View>
      ) : ( */}
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
          // keyExtractor={item => item.post_id.toString()}
          numColumns={numColumns}
          // initialNumToRender={12}
          // scrollToEnd={() => ({animated: true})}
          onEndReached={loadMoreMovies}
          onEndReachedThreshold={0.5}
          onScroll={() => setStopLoadMore(false)}
          ListFooterComponent={() =>
            isLoading ? (
              <View style={styles.loading}>
                <ActivityIndicator size="large" color={colors.background} />
              </View>
            ) : (
              <Spacing height={responsiveHeight(40)} />
            )
          }
        />
      </View>
      {/* {allDataDisplayed && ( */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={allDataDisplayed}
        onRequestClose={() => {
          // Alert.alert('Modal has been closed.');
          setAllDataDisplayed(false);
        }}>
        {/* <View style={styles.allDataDisplayed}> */}
        <TouchableOpacity
          style={styles.allDataDisplayed}
          onPress={() => setAllDataDisplayed(false)}>
          <Text style={styles.TextDisplayed}>
            Semua data sudah ditampilkan.
          </Text>
        </TouchableOpacity>
        {/* </View> */}
      </Modal>
      {/* )} */}
      {/* )} */}
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
    // alignItems: 'center',
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
    // opacity: 0.5,
  },
  TextDisplayed: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    color: colors.onPrimary,
    fontFamily: fonts.sora.regular,
    fontSize: 10,
  },
});
