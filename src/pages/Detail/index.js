import moment from 'moment';
import React, {useCallback, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {IconShare} from '../../assets';
import {Star} from '../../components/atoms';
import {ImageDetail, OtherEpisodes} from '../../components/organism';
import {getAnimeById} from '../../config';
import {colors, fonts} from '../../utils';

const Detail = ({route}) => {
  const {animeId} = route.params;
  const [animeDetail, setAnimeDetail] = useState([]);
  const [genres, setGenres] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [textShown, setTextShown] = useState(false);
  const [lengthMore, setLengthMore] = useState(false);

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

  const onTextLayout = useCallback(e => {
    setLengthMore(e.nativeEvent.lines.length >= 3);
    //to check the text is more than 4 lines or not
  }, []);

  const toggleNumberOfLines = () => {
    //To toggle the show text or hide it
    setTextShown(!textShown);
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color={colors.onPrimary} />
        </View>
      ) : (
        <ScrollView>
          <ImageDetail animeDetail={animeDetail} />
          <View style={styles.wrapper}>
            <Text style={styles.genre}>
              {moment(animeDetail.rilis).format('YYYY')} |{' '}
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
            <Text
              style={styles.sinopsisDetail}
              numberOfLines={textShown ? undefined : 3}
              onTextLayout={onTextLayout}>
              {animeDetail.sub_description}
            </Text>
            {lengthMore ? (
              <Text onPress={toggleNumberOfLines} style={styles.readMore}>
                {textShown ? 'read less' : 'read more'}
              </Text>
            ) : null}
          </View>
          <OtherEpisodes animeDetail={animeDetail} />
        </ScrollView>
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
    marginTop: 4,
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
    marginTop: 8,
  },
  sinopsisTitle: {
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
  readMore: {
    fontFamily: fonts.sora.regular,
    fontSize: 12,
    color: colors.primary,
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
