import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {colors, fonts, IMG_ANIME_URL, responsiveHeight} from '../../../utils';
import {LoadingPage} from '../../atoms/Loading';
import CardAnime from '../../molecules/CardAnime';

const Recomendation = ({recommendation, title}) => {
  const navigation = useNavigation();
  const [movies, setMovies] = useState([]);
  const [allDataDisplayed, setAllDataDisplayed] = useState(false);

  useEffect(() => {
    setAllDataDisplayed(true);
    setMovies(recommendation);
  }, [recommendation]);

  const _renderItem = ({item, index}) => {
    const type = item.type;
    const detailPage = type === 'Movie' ? 'DetailMovies' : 'Detail';
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate(detailPage, {animeId: item.sub_id})}>
        <CardAnime
          key={item.post_id}
          title={item.sub_name}
          rating={item.rate}
          thumbnail={`${IMG_ANIME_URL}/${item.sub_banner}`}
        />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container(title)}>
      {title && <Text style={styles.label}>{title}</Text>}
      <View horizontal={true} style={styles.wrapper}>
        <FlatList
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={movies}
          renderItem={_renderItem}
          initialNumToRender={4}
          maxToRenderPerBatch={8}
          ListFooterComponent={
            <LoadingPage allDataDisplayed={allDataDisplayed} width small />
          }
        />
      </View>
    </View>
  );
};

export default Recomendation;

const styles = StyleSheet.create({
  container: title => ({
    marginTop: title && 24,
  }),
  wrapper: {
    flexDirection: 'row',
    height: responsiveHeight(130),
    marginTop: 16,
  },
  label: {
    fontSize: 16,
    fontFamily: fonts.sora.medium,
    color: colors.onBackground,
  },
});
