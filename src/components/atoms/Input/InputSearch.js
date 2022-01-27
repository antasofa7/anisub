import React, {useCallback, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Input from '.';
import {IconClose, IconSearchMenu} from '../../../assets';
import {getSearch} from '../../../config';
import {colors, fonts, responsiveHeight} from '../../../utils';

const InputSearch = ({data, navigation, close, onPress}) => {
  const [filterdData, setFilteredData] = useState([]);
  const [isLoading, setLoading] = useState(false);

  const getMovieList = useCallback(async ({dataSearch}) => {
    setLoading(true);
    const allAnime = await getSearch(dataSearch);
    setFilteredData(allAnime.data);
    setLoading(false);
  }, []);

  console.log('allanime', filterdData);
  const handleInput = text => {
    if (!text) {
      setFilteredData('');
    } else {
      getMovieList({dataSearch: text.toLowerCase()});
    }
  };

  return (
    <View style={styles.container}>
      {close ? (
        <IconClose style={styles.icon} onPress={onPress} />
      ) : (
        <IconSearchMenu style={styles.icon} />
      )}
      <Input
        placeholder="Search anime..."
        onChangeText={text => handleInput(text)}
      />
      <View style={styles.viewSearch}>
        {isLoading ? (
          <View style={styles.loading}>
            {filterdData === null ? (
              <Text style={styles.text}>Anime not found!</Text>
            ) : (
              <ActivityIndicator size="large" color={colors.secondary} />
            )}
          </View>
        ) : (
          <SafeAreaView>
            <FlatList
              data={filterdData ? filterdData.animes : null}
              renderItem={({item}) => (
                <TouchableOpacity
                  key={item.sub_id}
                  onPress={() =>
                    navigation.navigate('Detail', {animeId: item.sub_id})
                  }>
                  <Text style={styles.dataSearch}>{item.sub_name}</Text>
                </TouchableOpacity>
              )}
              scrollToEnd={() => ({animated: true})}
            />
          </SafeAreaView>
        )}
      </View>
    </View>
  );
};

export default InputSearch;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    backgroundColor: colors.onPrimary,
    borderRadius: 10,
    height: responsiveHeight(40),
  },
  icon: {
    marginRight: 5,
  },
  viewSearch: {
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
    backgroundColor: colors.background,
  },
  dataSearch: {
    fontFamily: fonts.sora.regular,
    fontSize: 16,
    color: colors.onBackground,
    padding: 16,
  },
  loading: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    padding: 40,
    backgroundColor: colors.background,
    alignItems: 'center',
  },
  text: {
    color: colors.onBackground,
  },
});
