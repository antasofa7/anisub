import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {BannerCarousel, Header, NewAllAnime, UpcomingAnime} from '..';
import {responsiveHeight} from '../../../utils';
import {Spacing} from '../../atoms';
import HotSeason from '../Hot Season';

const HomeComponent = ({navigation}) => {
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
      component: <HotSeason navigation={navigation} />,
    },
    {
      id: 4,
      component: <NewAllAnime navigation={navigation} />,
    },
    {
      id: 5,
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
