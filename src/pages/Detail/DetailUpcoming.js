import {useNavigation} from '@react-navigation/native';
import moment from 'moment';
import React, {useCallback, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {OrientationLocker, PORTRAIT} from 'react-native-orientation-locker';
import Star from '../../components/atoms/Star';
import CardAnime from '../../components/molecules/CardAnime';
import {ImageDetail} from '../../components/organism';
import Recomendation from '../../components/organism/Recommendation';
import {getAnimeById, getRecommendation} from '../../config';
import {colors, fonts, IMG_EPISODE_URL, responsiveHeight} from '../../utils';
import DetailEpisode from './DetailEpisode';

const DetailUpcoming = ({route}) => {
  const navigation = useNavigation();
  const {animeId} = route.params;
  const [animeDetail, setAnimeDetail] = useState([]);
  const [episode, setEpisode] = useState([]);
  const [recommendation, setRecommendation] = useState([]);
  const [genres, setGenres] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [textShown, setTextShown] = useState(false);
  const [lengthMore, setLengthMore] = useState(false);
  const [isEpisode, setIsEpisode] = useState(false);

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
    setIsEpisode(false);
  }, [getAnimeDetail]);

  const onTextLayout = useCallback(e => {
    setLengthMore(e.nativeEvent.lines.length >= 5);
    //to check the text is more than 4 lines or not
  }, []);

  const toggleNumberOfLines = () => {
    //To toggle the show text or hide it
    setTextShown(!textShown);
  };

  const _renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          setIsEpisode(true);
          setEpisode(animeDetail.episodes[index]);
        }}>
        <View key={item.post_id} style={styles.wrapperItem}>
          <CardAnime
            key={item.post_id}
            title={item.post_name}
            episode={item.post_episodes}
            thumbnail={`${IMG_EPISODE_URL}/${item.post_image}`}
          />
        </View>
      </TouchableOpacity>
    );
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
            {isEpisode ? (
              <DetailEpisode animeDetail={episode} />
            ) : (
              <ImageDetail
                animeDetail={animeDetail}
                upcoming="Upcoming"
                onPress={() => {
                  setIsEpisode(true);
                  setEpisode(animeDetail.episodes[0]);
                }}
              />
            )}
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
            </View>
            <View style={styles.wrapperRating}>
              <Star rating={animeDetail.rate} size={32} />
            </View>
            <View style={styles.sinopsis}>
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
            {animeDetail.type !== 'Movie' && (
              <View style={styles.otherEpisodes}>
                <View style={styles.wrapperLabel}>
                  <Text style={styles.label}>Other Episodes</Text>
                  {animeDetail.pages && (
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate('Episodes', {animeDetail})
                      }>
                      <Text style={styles.more}>See more</Text>
                    </TouchableOpacity>
                  )}
                </View>
                <View style={styles.wrapperEpisodes}>
                  <FlatList
                    data={animeDetail.episodes}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    renderItem={_renderItem}
                    initialNumToRender={3}
                    keyExtractor={item => item.post_id.toString()}
                    scrollToEnd={() => ({animated: true})}
                    getItemLayout={(data, index) => ({
                      length: responsiveHeight(100),
                      offset: responsiveHeight(100) * index,
                      index,
                    })}
                  />
                </View>
              </View>
            )}
            <View style={styles.recomendation}>
              <Text style={styles.label}>Anime Recommendations</Text>
              <Recomendation recommendation={recommendation} />
            </View>
          </ScrollView>
        </>
      )}
    </View>
  );
};

export default DetailUpcoming;

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
  sinopsisDetail: {
    marginTop: 8,
    fontFamily: fonts.sora.regular,
    fontSize: 11,
    lineHeight: 16,
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
  otherEpisodes: {
    marginTop: 24,
  },
  wrapperEpisodes: {
    flexDirection: 'row',
    marginTop: 16,
  },
  wrapperLabel: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    fontSize: 14,
    fontFamily: fonts.sora.medium,
    color: colors.onBackground,
  },
  more: {
    fontSize: 12,
    fontFamily: fonts.sora.regular,
    color: colors.primary,
  },
  recomendation: {
    paddingVertical: 24,
  },
});
