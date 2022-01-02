import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {getAllNew} from '../../../config';
import {responsiveHeight} from '../../../utils';
import {InputSearch} from '../../atoms';

const HeaderSearch = ({navigation}) => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setLoading] = useState(false);

  const getMovieList = useCallback(async () => {
    setLoading(true);
    const allAnime = await getAllNew();
    setMovies(allAnime.data.episodes);
    setLoading(false);
  }, []);

  useEffect(() => {
    getMovieList();
  }, [getMovieList]);

  return (
    <View style={styles.container}>
      <InputSearch data={movies} navigation={navigation} />
    </View>
  );
};

export default HeaderSearch;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginHorizontal: 16,
    justifyContent: 'space-between',
    alignItems: 'center',
    height: responsiveHeight(60),
  },
});
