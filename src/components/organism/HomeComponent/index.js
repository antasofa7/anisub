import React, {useEffect, useState} from 'react';
import {
  Alert,
  BackHandler,
  FlatList,
  StyleSheet,
  ToastAndroid,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  BannerCarousel,
  Header,
  NewAllAnime,
  Recommendation,
  UpcomingAnime,
} from '..';
import {responsiveHeight} from '../../../utils';
import Spacing from '../../atoms/Spacing';

const HomeComponent = props => {
  const {navigation, dataAnime} = props;

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
      component: (
        <NewAllAnime navigation={navigation} newAllAnime={newAllAnime} />
      ),
    },
    {
      component: (
        <UpcomingAnime navigation={navigation} upcomingAnime={upcomingAnime} />
      ),
      id: 4,
    },
    {
      id: 5,
      component: (
        <Recommendation
          recommendation={recommendation}
          title="Anime Recommendations"
        />
      ),
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
      <FlatList
        data={_itemComponents}
        renderItem={_renderItem}
        initialNumToRender={3}
        keyExtractor={(item, index) => index.toString()}
        scrollToEnd={() => ({animated: true})}
        ListFooterComponent={() => <Spacing height={responsiveHeight(80)} />}
      />
    </SafeAreaView>
  );
};

export default HomeComponent;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
  },
});
