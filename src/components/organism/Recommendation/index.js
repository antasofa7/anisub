import {useNavigation} from '@react-navigation/native';
import React, {useCallback, useEffect, useState} from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {getRecommendation} from '../../../config';
import {colors, fonts, IMG_ANIME_URL, responsiveHeight} from '../../../utils';
import {LoadingPage} from '../../atoms/Loading';
import {MainCardFilm} from '../../molecules';

const Recomendation = () => {
  const navigation = useNavigation();
  const [movies, setMovies] = useState([]);
  const [isLoading, setLoading] = useState(false);

  const getMovieList = useCallback(async () => {
    setLoading(true);
    const res = await getRecommendation();
    setMovies(res.data.animes);
    setLoading(false);
  }, []);

  useEffect(() => {
    getMovieList();
  }, [getMovieList]);

  const _renderItem = ({item, index}) => {
    const type = item.type;
    const detailPage = type === 'TV' ? 'Detail' : 'DetailMovies';
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate(detailPage, {animeId: item.sub_id})}>
        <MainCardFilm
          key={item.post_id}
          title={item.sub_name}
          rating={item.rate}
          thumbnail={`${IMG_ANIME_URL}/${item.sub_banner}`}
          isLoading={isLoading}
        />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Anime Recommendation</Text>
      <View horizontal={true} style={styles.wrapper}>
        <FlatList
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={movies}
          renderItem={_renderItem}
          initialNumToRender={4}
          maxToRenderPerBatch={8}
          ListFooterComponent={
            <LoadingPage allDataDisplayed={true} width small />
          }
        />
      </View>
    </View>
  );
};

export default Recomendation;

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    zIndex: -1,
  },
  wrapper: {
    flexDirection: 'row',
    height: responsiveHeight(110),
    marginTop: 12,
  },
  label: {
    fontSize: 16,
    fontFamily: fonts.sora.medium,
    color: colors.onBackground,
  },
});
