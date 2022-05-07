import React, {useCallback, useEffect, useState} from 'react';
import {Alert, FlatList, StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {connect} from 'react-redux';
import {
  BannerCarousel,
  Header,
  NewAllAnime,
  Recommendation,
  UpcomingAnime,
} from '..';
import {getWatchLists} from '../../../actions/WatchListAction';
import {responsiveHeight} from '../../../utils';
import Spacing from '../../atoms/Spacing';
import NativeAds from '../NativeAds';
import WatchList from '../WatchList';

const HomeComponent = props => {
  const {
    navigation,
    dataAnime,
    user,
    dispatch,
    getWatchListResults,
    getWatchListLoading,
  } = props;
  const [watchlist, setWatchlist] = useState([]);
  const [isLoading, setLoading] = useState([]);

  console.log('getWatchListResults', getWatchListResults);
  console.log('user', user);

  // useEffect(() => {
  //   _getDataMovie();
  // }, [_getDataMovie]);

  const _getDataMovie = useCallback(
    async _ => {
      if (user) {
        await dispatch(getWatchLists(user.uid));
      }
      return null;
    },
    [dispatch, user],
  );

  const hotMovies =
    dataAnime.hotMovies !== null
      ? dataAnime.hotMovies.animes
      : Alert.alert('Server error!');
  const season = hotMovies[0].season;
  const newAllAnime = dataAnime.allNew;
  const upcomingAnime = dataAnime.upcoming;
  const recommendation = dataAnime.recommendation.animes;

  const _itemComponents = [
    {
      id: 1,
      component: <Header season={season} />,
    },
    {
      id: 2,
      component: (
        <BannerCarousel navigation={navigation} hotMovies={hotMovies} />
      ),
    },
    {
      id: 3,
      component: user && (
        <WatchList
          navigation={navigation}
          watchlist={
            getWatchListResults ? Object.values(getWatchListResults) : []
          }
          loading={getWatchListLoading}
        />
      ),
    },
    {
      id: 4,
      component: (
        <NewAllAnime navigation={navigation} newAllAnime={newAllAnime} />
      ),
    },
    {
      id: 5,
      component: (
        <UpcomingAnime navigation={navigation} upcomingAnime={upcomingAnime} />
      ),
    },
    {
      id: 6,
      component: (
        <Recommendation
          recommendation={recommendation}
          title="Anime Recommendations"
        />
      ),
    },
    {
      id: 7,
      component: <NativeAds headlineView nativeMediaView callToActionView />,
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
      {/* {getWatchListResults && user ? (
        <FlatList
          data={_itemComponents}
          renderItem={_renderItem}
          refreshing={getWatchListLoading}
          onRefresh={_getDataMovie}
          initialNumToRender={3}
          keyExtractor={(item, index) => index.toString()}
          scrollToEnd={() => ({animated: true})}
          ListFooterComponent={() => <Spacing height={responsiveHeight(80)} />}
        />
      ) : ( */}
      <FlatList
        data={_itemComponents}
        renderItem={_renderItem}
        refreshing={getWatchListLoading}
        onRefresh={_getDataMovie}
        initialNumToRender={3}
        keyExtractor={(item, index) => index.toString()}
        scrollToEnd={() => ({animated: true})}
        ListFooterComponent={() => <Spacing height={responsiveHeight(80)} />}
      />
      {/* )} */}
    </SafeAreaView>
  );
};

const mapStateToProps = state => ({
  getWatchListLoading: state.WatchListReducer.getWatchListLoading,
  getWatchListResults: state.WatchListReducer.getWatchListResults,
  getWatchListError: state.WatchListReducer.getWatchListError,
});

export default connect(mapStateToProps, null)(HomeComponent);

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
  },
});
