import {useNavigation} from '@react-navigation/native';
import moment from 'moment';
import React, {useCallback, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {OrientationLocker, PORTRAIT} from 'react-native-orientation-locker';
import Star from '../../components/atoms/Star';
import {ImageDetail} from '../../components/organism';
import NativeAds from '../../components/organism/NativeAds';
import Recomendation from '../../components/organism/Recommendation';
import {getAnimeById, getRecommendation} from '../../config';
import {colors, fonts, responsiveHeight} from '../../utils';

const DetailMovies = ({route}) => {
  const navigation = useNavigation();
  const {animeId} = route.params;
  const [animeDetail, setAnimeDetail] = useState([]);
  const [recommendation, setRecommendation] = useState([]);
  const [genres, setGenres] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [textShown, setTextShown] = useState(false);
  const [lengthMore, setLengthMore] = useState(false);

  const getAnimeDetail = useCallback(async () => {
    setLoading(true);
    const res = await getAnimeById(animeId);
    const recommend = await getRecommendation();
    setAnimeDetail(res.data.anime);
    setRecommendation(recommend.data.animes);
    setLoading(false);
    setGenres(res.data.anime.genres);
  }, [animeId]);

  useEffect(() => {
    getAnimeDetail();
  }, [getAnimeDetail]);

  const onTextLayout = useCallback(e => {
    setLengthMore(e.nativeEvent.lines.length >= 5);
    //to check the text is more than 4 lines or not
  }, []);

  const toggleNumberOfLines = () => {
    //To toggle the show text or hide it
    setTextShown(!textShown);
  };

  return (
    <View style={styles.container}>
      <OrientationLocker orientation={PORTRAIT} />
      {isLoading ? (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color={colors.secondary} />
        </View>
      ) : (
        <>
          <View style={styles.wrapperVideo}>
            <ImageDetail
              animeDetail={animeDetail}
              onPress={() => {
                navigation.navigate('PlayVideo', {
                  animeDetail: animeDetail.episodes[0],
                });
              }}
            />
          </View>
          <ScrollView style={styles.wrapper}>
            <View style={styles.genreWrapper}>
              <Text style={styles.rilis}>
                {moment(animeDetail.rilis).format('YYYY')} |{' '}
              </Text>
              {genres.map((genre, index) => {
                return (
                  <TouchableOpacity
                    key={genre.genre_id}
                    onPress={() =>
                      navigation.navigate('GenrePage', {
                        genre,
                      })
                    }>
                    <Text style={styles.genre}>
                      {(index ? ', ' : '') + genre.genre_name}
                    </Text>
                  </TouchableOpacity>
                );
              })}
              <Text style={styles.duration}> | {animeDetail.duration}</Text>
            </View>
            <View style={styles.wrapperRating}>
              <Star rating={animeDetail.rate} size={32} />
            </View>
            <View style={styles.sinopsis}>
              <Text style={styles.sinopsisTitle}>Synopsis</Text>
              <Text
                style={styles.sinopsisDetail}
                numberOfLines={textShown ? undefined : 5}
                onTextLayout={onTextLayout}>
                {animeDetail.sub_description}
              </Text>
              {lengthMore && (
                <Text onPress={toggleNumberOfLines} style={styles.readMore}>
                  {textShown ? 'read less' : 'read more'}
                </Text>
              )}
            </View>
            <View style={styles.recomendations}>
              <Text style={styles.label}>Anime Recommendations</Text>
              <Recomendation recommendation={recommendation} />
            </View>
            <NativeAds headlineView nativeMediaView />
          </ScrollView>
        </>
      )}
    </View>
  );
};

export default DetailMovies;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingBottom: 16,
  },
  video: {
    height: responsiveHeight(270),
  },
  wrapperVideo: {
    height: responsiveHeight(270),
  },
  wrapper: {
    marginHorizontal: 16,
  },
  genreWrapper: {
    marginTop: 8,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  rilis: {
    fontFamily: fonts.sora.regular,
    fontSize: 12,
    color: colors.onBackground,
  },
  duration: {
    fontFamily: fonts.sora.regular,
    fontSize: 12,
    color: colors.onBackground,
  },
  genre: {
    fontFamily: fonts.sora.regular,
    color: colors.primary,
    fontSize: 12,
  },
  wrapperRating: {
    marginTop: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  sinopsis: {
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
  wrapperTitle: {
    position: 'absolute',
    left: 16,
    right: 16,
    bottom: 0,
  },
  title: {
    fontFamily: fonts.nunito.bold,
    fontSize: 22,
    color: colors.onBackground,
  },
  recomendations: {
    paddingVertical: 16,
  },
  label: {
    fontSize: 14,
    fontFamily: fonts.sora.medium,
    color: colors.onBackground,
  },
});
