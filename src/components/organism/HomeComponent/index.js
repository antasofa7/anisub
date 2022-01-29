import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
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
      component: <NewAllAnime navigation={navigation} />,
    },
    {
      component: <UpcomingAnime navigation={navigation} />,
      id: 4,
    },
    {
      id: 5,
      component: <Recommendation navigation={navigation} />,
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
