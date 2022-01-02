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
  // const [movies, setMovies] = useState([]);
  // const [isLoading, setLoading] = useState(true);

  // const getMovieList = useCallback(async () => {
  //   setLoading(true);
  //   const res = await getAnimeByGenre();
  //   setMovies(res.data);
  //   setLoading(false);
  // }, []);

  // useEffect(() => {
  //   getMovieList();
  // }, [getMovieList]);

  // const _listHeader = () => {
  //   return (
  //     <View>
  //       <Header home />
  //       <BannerCarousel navigation={navigation} isPages={isPage} />
  //       <ContinueWatching animes={animes} />
  //       <WatchList animes={animes} />
  //       <NewAllAnime
  //         navigation={navigation}
  //         loading={isLoading}
  //         isPages={isPage}
  //       />
  //       <UpcomingAnime
  //         navigation={navigation}
  //         loading={isLoading}
  //         isPages={isPage}
  //       />
  //     </View>
  //   );
  // };

  // const _renderAllItem = ({item}) => {
  //   return (
  //     <View style={styles.wrapper}>
  //       <Text style={styles.label}>{item.genre_name}</Text>
  //       <FlatList
  //         horizontal={true}
  //         showsHorizontalScrollIndicator={false}
  //         data={item.animes}
  //         renderItem={_renderItem}
  //         initialNumToRender={3}
  //         ItemSeparatorComponent={_itemSeparator}
  //         keyExtractor={() => item.sub_id.toString()}
  //         numColumns={numColumns}
  //         scrollToIndex={() => ({animated: true, index: 0})}
  //         scrollToEnd={() => ({animated: true})}
  //       />
  //     </View>
  //   );
  // };

  const _itemComponents = [
    {
      id: 1,
      component: <Header />,
    },
    {
      id: 2,
      component: <BannerCarousel navigation={navigation} />,
    },
    {
      id: 3,
      component: <NewAllAnime navigation={navigation} />,
    },
    {
      id: 4,
      component: <UpcomingAnime navigation={navigation} />,
    },
  ];

  const _renderItem = ({item}) => {
    return (
      <View key={item.id} style={styles.wrapperItem}>
        {item.component}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* {isLoading ? (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color={colors.onPrimary} />
        </View>
      ) : ( */}
      <FlatList
        data={_itemComponents}
        renderItem={_renderItem}
        initialNumToRender={3}
        // keyExtractor={item => item.genre_id.toString()}
        scrollToEnd={() => ({animated: true})}
        // ListHeaderComponent={_listHeader}
        ListFooterComponent={() => <Spacing height={responsiveHeight(80)} />}
      />
      {/* )} */}
    </SafeAreaView>
  );
};

export default HomeComponent;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
  },
  wrapperItem: {
    flexDirection: 'row',
    marginTop: 8,
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
