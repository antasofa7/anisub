import React, {useCallback, useEffect, useState} from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import {IconShare} from '../../assets';
import {Star} from '../../components/atoms';
import {ImageDetail, OtherEpisodes} from '../../components/organism';
import {getAnimeById} from '../../config';
import {colors, fonts} from '../../utils';

const Detail = ({route}) => {
  const {animeId} = route.params;
  // console.log('animeId>> ', animeId);
  const [animeDetail, setAnimeDetail] = useState([]);
  const [genres, setGenres] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const getAnimeDetail = useCallback(async () => {
    setLoading(true);
    const res = await getAnimeById(animeId);
    setAnimeDetail(res.data.anime);
    setLoading(false);
    setGenres(res.data.anime.genres);
  }, [animeId]);

  useEffect(() => {
    getAnimeDetail();
  }, [getAnimeDetail]);

  return (
    <View style={styles.container}>
      {isLoading ? (
        <View style={styles.loading}>
          <ActivityIndicator
            size="large"
            color={colors.onPrimary}
            // style={styles.loading}
          />
        </View>
      ) : (
        <View>
          <ImageDetail animeDetail={animeDetail} />
          <View style={styles.wrapper}>
            <Text style={styles.genre}>
              {/* 2020 |{' '} */}
              {genres.map(genre => {
                return <Text key={genre.genre_id}> {genre.genre_name}</Text>;
              })}{' '}
              | {animeDetail.duration}
            </Text>
            <View style={styles.wrapperRating}>
              <Star rating={animeDetail.rate} size={28} />
              <IconShare />
            </View>
          </View>
          <View style={styles.sinopsis}>
            <Text style={styles.sinopsisTitle}>Synopsis</Text>
            <Text style={styles.sinopsisDetail}>
              {animeDetail.sub_description}
            </Text>
          </View>
          <OtherEpisodes
            episodes={animeDetail.episodes}
            animeId={animeDetail.sub_id}
            pages={animeDetail.pages}
          />
        </View>
      )}
    </View>
  );
};

export default Detail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  wrapper: {
    marginVertical: 4,
    marginHorizontal: 16,
  },
  genre: {
    fontFamily: fonts.sora.regular,
    fontSize: 10,
    color: colors.onBackground,
  },
  wrapperRating: {
    marginTop: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  sinopsis: {
    marginHorizontal: 16,
  },
  sinopsisTitle: {
    marginTop: 16,
    fontFamily: fonts.sora.semiBold,
    fontSize: 12,
    color: colors.onBackground,
  },
  sinopsisDetail: {
    marginTop: 8,
    fontFamily: fonts.sora.regular,
    fontSize: 10,
    color: colors.onBackground,
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
