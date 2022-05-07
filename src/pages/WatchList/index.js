import {useNavigation} from '@react-navigation/native';
import React, {useCallback, useEffect, useState} from 'react';
import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {connect} from 'react-redux';
import {getWatchLists} from '../../actions/WatchListAction';
import {IconBack} from '../../assets';
import {LoadingPage} from '../../components/atoms/Loading';
import Spacing from '../../components/atoms/Spacing';
import {MainCardFilm} from '../../components/molecules';
import {
  colors,
  fonts,
  getDataFromStorage,
  IMG_ANIME_URL,
  responsiveHeight,
  responsiveWidth,
} from '../../utils';

const WatchList = props => {
  const {dispatch, getWatchListResults, getWatchListLoading} = props;
  const navigation = useNavigation();
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    _getData();
  }, [_getData]);

  const _getData = useCallback(
    async _ => {
      const userData = await getDataFromStorage('user');
      await dispatch(getWatchLists(userData.uid));
      if (getWatchListResults !== null) {
        setMovies(Object.values(getWatchListResults));
      }
    },
    [dispatch, getWatchListResults],
  );

  const numColumns = 2;
  const size = Dimensions.get('window').width / numColumns - 24;

  const _renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('Detail', {animeId: item.animeId})}>
        <MainCardFilm
          key={item.animeId}
          title={item.title}
          rating={item.rating}
          thumbnail={`${IMG_ANIME_URL}/${item.thumbnail}`}
          width={size}
          margin={0}
        />
      </TouchableOpacity>
    );
  };

  const _itemSeparator = () => {
    return <View style={styles.separator} />;
  };

  return (
    <SafeAreaView style={styles.container}>
      {getWatchListLoading ? (
        <LoadingPage />
      ) : (
        <View style={styles.wrapper}>
          <View style={styles.header}>
            <View style={styles.iconBack}>
              <IconBack onPress={() => navigation.goBack()} />
            </View>
            <Spacing width={16} />
            <Text numberOfLines={1} style={styles.title}>
              Watch List
            </Text>
          </View>
          <FlatList
            data={movies}
            renderItem={_renderItem}
            onRefresh={_getData}
            refreshing={getWatchListLoading}
            ItemSeparatorComponent={_itemSeparator}
            keyExtractor={(item, index) => String(index)}
            numColumns={numColumns}
            ListHeaderComponent={() => <Spacing height={16} />}
            removeClippedSubviews={true} // Unmount components when outside of window
            initialNumToRender={4} // Reduce initial render amount
            maxToRenderPerBatch={1} // Reduce number in each render batch
            ListFooterComponent={<Spacing height={responsiveHeight(70)} />}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

const mapStateToProps = state => ({
  getWatchListLoading: state.WatchListReducer.getWatchListLoading,
  getWatchListResults: state.WatchListReducer.getWatchListResults,
  getWatchListError: state.WatchListReducer.getWatchListError,
});

export default connect(mapStateToProps, null)(WatchList);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  wrapper: {
    margin: 16,
  },
  header: {
    width: responsiveWidth(360),
    height: responsiveHeight(40),
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  iconBack: {
    opacity: 0.5,
  },
  title: {
    fontFamily: fonts.sora.medium,
    fontSize: 18,
    color: colors.secondary,
    textAlign: 'center',
    marginTop: -3,
  },
  subTitle: {
    fontFamily: fonts.sora.regular,
    fontSize: 18,
    color: colors.onBackground,
    marginTop: -3,
  },
  separator: {
    height: 14,
    width: '100%',
    backgroundColor: 'transparent',
  },
});
