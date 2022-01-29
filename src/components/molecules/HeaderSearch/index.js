import {useNavigation} from '@react-navigation/native';
import React, {useCallback, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {IconClose, IconSearchMenu} from '../../../assets';
import {getSearch} from '../../../config';
import {colors, fonts, responsiveHeight, responsiveWidth} from '../../../utils';
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
  const navigation = useNavigation();
  const [filterdData, setFilteredData] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [visibleSearchbar, setVisibleSearchbar] = useState(false);
  const [visibleSearchArea, setVisibleSearchArea] = useState(false);
  const [text, setText] = useState('');
  const [activeBar, setActiveBar] = useState('TV Series');

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
    setFilteredData(allAnime.data);
    setLoading(false);
  }, []);

  const handleInput = value => {
    setVisibleSearchbar(true);
    if (!value) {
      setText(value);
      setFilteredData('');
    } else {
      setText(value);
      getMovieList({dataSearch: value.toLowerCase()});
    }
  };

  const closeSearchBar = () => {
    setVisibleSearchbar(false);
    setVisibleSearchArea(false);
    setText('');
    setFilteredData('');
  };

  const _renderItem = ({index, item}) => {
    const type = item.type;
    const detailPage = type === 'TV' ? 'Detail' : 'DetailMovies';
    return (
      <View style={styles.wrapperSearch}>
        <TouchableOpacity
          key={item.sub_id}
          onPress={() =>
            navigation.navigate(detailPage, {animeId: item.sub_id})
          }>
          <Text style={styles.dataSearch}>{item.sub_name}</Text>
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
              placeholder="Search anime..."
              onChangeText={value => handleInput(value)}
            />
          </>
        ) : (
          <IconSearchMenu onPress={() => setVisibleSearchbar(true)} />
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
      {!visibleSearchArea ? null : (
        <View style={styles.viewSearch}>
          {filterdData !== '' && (
            <>
              {isLoading ? (
                <View style={styles.loading}>
                  <ActivityIndicator size="large" color={colors.secondary} />
                </View>
              ) : (
                <>
                  {!filterdData ? (
                    <Text style={styles.dataSearch}>Anime not found!</Text>
                  ) : (
                    <FlatList
                      data={filterdData?.animes}
                      renderItem={_renderItem}
                      ListFooterComponent={() => <Spacing height={50} />}
                    />
                  )}
                </>
              )}
            </>
          )}
        </View>
      )}
    </View>
  );
};

export default HeaderSearch;

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
  wrapperTitle: {
    flexDirection: 'row',
  },
  series: {
    height: responsiveHeight(40),
    width: responsiveWidth(132),
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: active => ({
    fontFamily: fonts.sora.medium,
    fontSize: 16,
    color: active ? colors.primary : colors.secondary,
    opacity: active ? 1 : 0.7,
  }),
  viewSearch: {
    position: 'absolute',
    top: 70,
    left: 0,
    right: 0,
    zIndex: 1,
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 11,
    backgroundColor: colors.background,
    alignItems: 'center',
    minHeight: responsiveHeight(280),
  },
  wrapperSearch: {
    paddingHorizontal: 16,
    height: 50,
    justifyContent: 'center',
  },
  dataSearch: {
    fontFamily: fonts.sora.regular,
    color: colors.onBackground,
    fontSize: 16,
  },
});
