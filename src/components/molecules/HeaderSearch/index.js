import {useNavigation} from '@react-navigation/native';
import React, {useCallback, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {connect} from 'react-redux';
import {
  getRecentSearch,
  saveSearchResults,
} from '../../../actions/searchResultsAction';
import {IconClose, IconCloseSmall, IconSearchMenu} from '../../../assets';
import {getSearch} from '../../../config';
import {
  colors,
  fonts,
  IMG_ANIME_URL,
  responsiveHeight,
  responsiveWidth,
} from '../../../utils';
import Input from '../../atoms/Input';
import Spacing from '../../atoms/Spacing';

const tabItem = [
  {
    id: 1,
    name: 'TV Series',
  },
  {
    id: 2,
    name: 'Movies',
  },
];

const HeaderSearch = props => {
  const {dispatch, user, getRecentSearchLoading, getRecentSearchResults} =
    props;
  console.log('user', user);

  const navigation = useNavigation();
  const [filterdData, setFilteredData] = useState([]);
  const [recentSearchResult, setRecentSearchResult] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [visibleSearchbar, setVisibleSearchbar] = useState(false);
  const [visibleSearchArea, setVisibleSearchArea] = useState(false);
  const [text, setText] = useState('');
  const [activeBar, setActiveBar] = useState('TV Series');

  console.log('recentSearchLoading', getRecentSearchLoading);
  console.log('recentSearchResult', recentSearchResult);
  console.log('filterdData', filterdData);

  useEffect(() => {
    _getRecentSearch();
  }, [_getRecentSearch]);

  const _getRecentSearch = useCallback(
    async _ => {
      await dispatch(getRecentSearch(user.uid));
    },
    [dispatch, user],
  );

  const onPressTab = value => {
    props.handleProps(value);
    setActiveBar(value);
  };

  const getMovieList = useCallback(async ({dataSearch}) => {
    setLoading(true);
    const allAnime = await getSearch(dataSearch);
    if (allAnime.error) {
      setFilteredData(allAnime.message);
    }
    setFilteredData(allAnime.data.splice(0, allAnime.data.length - 1));
    setLoading(false);
  }, []);

  const handleInput = value => {
    setVisibleSearchbar(true);
    if (!value) {
      setText(value);
      setFilteredData('');
    } else {
      setText(value);
    }
  };

  const handleSubmit = () => {
    if (!text) {
      setFilteredData('');
    } else {
      getMovieList({dataSearch: text.toLowerCase()});
    }
  };

  const recentSearch = async () => {
    setRecentSearchResult(
      getRecentSearchResults ? Object.values(getRecentSearchResults) : [],
    );
    setVisibleSearchbar(true);
    setVisibleSearchArea(true);
  };

  const closeSearchBar = () => {
    setVisibleSearchbar(false);
    setVisibleSearchArea(false);
    setText('');
    setFilteredData('');
  };

  const clearText = () => {
    setText('');
    setFilteredData('');
  };

  const _renderItem = ({index, item}) => {
    console.log('item', item);

    const onPressAnime = _ => {
      if (user) {
        const searchResult = {
          uid: user.uid,
          animeId: item.sub_id,
          name: item.sub_name,
          image: item.sub_banner,
        };
        dispatch(saveSearchResults(searchResult));
      }
      const type = item.type;
      const detailPage = type === 'Movie' ? 'DetailMovies' : 'Detail';
      navigation.navigate(detailPage, {animeId: item.sub_id});
    };
    return (
      <View>
        <TouchableOpacity
          key={item.sub_id}
          onPress={onPressAnime}
          style={styles.wrapperSearch}>
          <FastImage
            key={index}
            source={{
              uri: `${IMG_ANIME_URL}/${item.sub_banner}` || 'search image',
            }}
            style={styles.image}
          />
          <Text style={styles.dataSearch} numberOfLines={2}>
            {item.sub_name}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.wrapperHeader(visibleSearchbar)}>
        {visibleSearchbar ? (
          <>
            <IconClose onPress={() => closeSearchBar()} />
            <Input
              value={text}
              onFocus={() => setVisibleSearchArea(true)}
              placeholder="Search your favorite anime..."
              onChangeText={value => handleInput(value)}
              onSubmitEditing={handleSubmit}
              returnKeyType="done"
              keyboardType="default"
            />
            {text !== '' && (
              <IconCloseSmall style={styles.iconClose} onPress={clearText} />
            )}
          </>
        ) : (
          <IconSearchMenu onPress={() => recentSearch()} />
        )}
      </View>
      <View style={styles.wrapperTitle}>
        {tabItem.map(item => {
          const active = item.name === activeBar ? true : false;
          return (
            <TouchableOpacity
              onPress={() => onPressTab(item.name)}
              key={item.id}>
              <View style={styles.series}>
                <Text style={styles.title(active)}>{item.name}</Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
      {visibleSearchArea && (
        <View style={styles.viewSearch}>
          {filterdData !== '' ? (
            <>
              {isLoading ? (
                <View style={styles.loading}>
                  <ActivityIndicator size="large" color={colors.secondary} />
                </View>
              ) : (
                <>
                  {!filterdData ? (
                    <Text style={styles.notFound}>Anime not found!</Text>
                  ) : (
                    <>
                      <Text style={styles.recentSearh}>Search result</Text>
                      <FlatList
                        data={filterdData}
                        renderItem={_renderItem}
                        ListFooterComponent={() => <Spacing height={50} />}
                      />
                    </>
                  )}
                </>
              )}
            </>
          ) : (
            <>
              <Text style={styles.recentSearh}>Recent search</Text>
              <FlatList
                data={recentSearchResult}
                renderItem={_renderItem}
                ListFooterComponent={() => <Spacing height={50} />}
              />
            </>
          )}
        </View>
      )}
    </View>
  );
};

const mapStateToProps = state => ({
  searchResultsListLoading: state.SearchResultReducer.searchResultsListLoading,
  searchResultsListResults: state.SearchResultReducer.searchResultsListResults,
  searchResultsListError: state.SearchResultReducer.searchResultsListError,

  getRecentSearchLoading: state.SearchResultReducer.getRecentSearchLoading,
  getRecentSearchResults: state.SearchResultReducer.getRecentSearchResults,
  getRecentSearchError: state.SearchResultReducer.getRecentSearchError,
});

export default connect(mapStateToProps, null)(HeaderSearch);

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flexDirection: 'row',
  },
  wrapperHeader: visibleSearchbar => ({
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    backgroundColor: colors.onPrimary,
    borderRadius: 10,
    width: visibleSearchbar ? '100%' : responsiveWidth(60),
    height: responsiveHeight(40),
  }),
  iconClose: {
    position: 'absolute',
    top: 9,
    right: 20,
    opacity: 0.5,
  },
  wrapperTitle: {
    flexDirection: 'row',
  },
  series: {
    height: responsiveHeight(40),
    justifyContent: 'center',
  },
  title: active => ({
    paddingLeft: responsiveWidth(45),
    width: responsiveWidth(132),
    fontFamily: fonts.sora.medium,
    fontSize: 16,
    color: active ? colors.primary : colors.onBackground,
    opacity: active ? 1 : 0.7,
  }),
  viewSearch: {
    position: 'absolute',
    top: 70,
    left: 0,
    right: 0,
    zIndex: 1,
    flex: 1,
    backgroundColor: colors.background,
    height: responsiveHeight(640),
    width: responsiveWidth(360),
  },
  wrapperSearch: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    marginBottom: 8,
    width: responsiveWidth(320),
    height: responsiveHeight(65),
  },
  image: {
    width: responsiveWidth(50),
    height: responsiveHeight(60),
    borderRadius: 5,
    resizeMode: 'cover',
  },
  dataSearch: {
    fontFamily: fonts.sora.regular,
    marginLeft: 10,
    color: colors.onBackground,
    fontSize: 16,
  },
  notFound: {
    fontFamily: fonts.sora.regular,
    marginLeft: responsiveWidth(100),
    color: colors.onBackground,
    fontSize: 16,
  },
  recentSearh: {
    margin: 16,
    fontFamily: fonts.sora.regular,
    color: colors.onPrimary,
    fontSize: 16,
    textTransform: 'uppercase',
  },
});
