import React, {useCallback, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  VirtualizedList,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {BannerCarousel, Header, NewAllAnime, UpcomingAnime} from '..';
import {getAnimeByGenre} from '../../../config';
import {colors, fonts, IMG_ANIME_URL, responsiveHeight} from '../../../utils';
import {Spacing} from '../../atoms';
import {MainCardFilm} from '../../molecules';

const HomeComponent = ({navigation, loading, isPage}) => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const getMovieList = useCallback(async () => {
    setLoading(true);
    const res = await getAnimeByGenre();
    setMovies(res.data);
    setLoading(false);
  }, []);

  useEffect(() => {
    getMovieList();
  }, [getMovieList]);

  const _listHeader = () => {
    return (
      <View>
        <Header home />
        <BannerCarousel navigation={navigation} isPages={isPage} />
        {/* <ContinueWatching animes={animes} />
        <WatchList animes={animes} /> */}
        <NewAllAnime
          navigation={navigation}
          loading={isLoading}
          isPages={isPage}
        />
        <UpcomingAnime
          navigation={navigation}
          loading={isLoading}
          isPages={isPage}
        />
      </View>
    );
  };

  const _renderAllItem = ({item}) => {
    return (
      <View style={styles.wrapper}>
        <Text style={styles.label}>{item.genre_name}</Text>
        <FlatList
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={item.animes}
          renderItem={_renderItem}
          initialNumToRender={3}
          // ItemSeparatorComponent={_itemSeparator}
          // keyExtractor={() => item.sub_id.toString()}
          // numColumns={numColumns}
          // scrollToIndex={() => ({animated: true, index: 0})}
          scrollToEnd={() => ({animated: true})}
        />
      </View>
    );
  };

  const _renderItem = ({item}) => {
    return (
      <View key={item.sub_id} style={styles.wrapperItem}>
        <TouchableOpacity
          onPress={() => navigation('Detail', {animeId: item.sub_id})}>
          <MainCardFilm
            key={item.sub_id}
            title={item.sub_name}
            //   rating={item.rate}
            thumbnail={`${IMG_ANIME_URL}/${item.sub_banner}`}
            isLoading={isLoading}
          />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {isLoading ? (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color={colors.onPrimary} />
        </View>
      ) : (
        <FlatList
          data={movies}
          renderItem={_renderAllItem}
          initialNumToRender={4}
          keyExtractor={item => item.genre_id.toString()}
          scrollToEnd={() => ({animated: true})}
          ListHeaderComponent={_listHeader}
          // ListFooterComponent={() => <Spacing height={responsiveHeight(10)} />}
        />
      )}
    </SafeAreaView>
  );
};

export default HomeComponent;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
  },
  wrapper: {
    marginTop: 16,
  },
  wrapperItem: {
    flexDirection: 'row',
    marginTop: 8,
  },
  label: {
    fontSize: 14,
    fontFamily: fonts.sora.medium,
    color: colors.onBackground,
  },
  wrapperImageLoading: {
    flexDirection: 'row',
    marginTop: 8,
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
