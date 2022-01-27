import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {HeaderSearch} from '..';
import {IconSearchMenu} from '../../../assets';
import {colors, fonts, responsiveHeight} from '../../../utils';

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

const HeaderLibrary = props => {
  const navigation = useNavigation();
  const [visibleSearchbar, setVisibleSearchbar] = useState(false);
  const [activeBar, setActiveBar] = useState('TV Series');

  const onPressTab = value => {
    props.handleProps(value);
    setActiveBar(value);
  };

  return (
    <>
      <View style={styles.container}>
        {visibleSearchbar ? (
          <HeaderSearch
            style={styles.searchBar}
            navigation={navigation}
            onPress={() => setVisibleSearchbar(false)}
            close
          />
        ) : (
          <View style={styles.wrapper}>
            <TouchableOpacity onPress={() => setVisibleSearchbar(true)}>
              <View style={styles.search}>
                <IconSearchMenu />
              </View>
            </TouchableOpacity>
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
        )}
      </View>
    </>
  );
};

export default HeaderLibrary;

const styles = StyleSheet.create({
  container: {
    height: responsiveHeight(50),
    justifyContent: 'center',
  },
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  series: active => ({
    backgroundColor: active ? colors.primary : colors.onPrimary,
  }),
  title: active => ({
    fontFamily: fonts.sora.medium,
    fontSize: 18,
    color: active ? colors.primary : colors.onBackground,
    opacity: active ? 1 : 0.8,
  }),
  search: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    opacity: 0.8,
  },
  searchBar: {
    flex: 1,
    position: 'absolute',
    left: 0,
    right: 0,
    zIndex: 1,
  },
});
