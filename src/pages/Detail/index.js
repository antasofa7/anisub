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
import Star from '../../components/atoms/Star';
import {MainCardFilm} from '../../components/molecules';
import {ImageDetail} from '../../components/organism';
import Recomendation from '../../components/organism/Recommendation';
import {getAnimeById} from '../../config';
import {colors, fonts, IMG_EPISODE_URL, responsiveHeight} from '../../utils';
import PlayVideo from './PlayVideo';

const Detail = ({route}) => {
  const navigation = useNavigation();
  const {animeId} = route.params;
  const [animeDetail, setAnimeDetail] = useState([]);
  const [episode, setEpisode] = useState([]);
  const [genres, setGenres] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [textShown, setTextShown] = useState(false);
  const [lengthMore, setLengthMore] = useState(false);
  const [isVideoPlay, setVideoPlay] = useState(false);

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
          setVideoPlay(true), setEpisode(animeDetail.episodes[index]);
        }}>
        <View key={item.post_id} style={styles.wrapperItem}>
          <MainCardFilm
            key={item.post_id}
            title={item.post_name}
            thumbnail={`${IMG_EPISODE_URL}/${item.post_image}`}
          />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color={colors.secondary} />
        </View>
      ) : (
        <ScrollView>
          {isVideoPlay ? (
            <View style={styles.video}>
              <PlayVideo animeDetail={episode} />
              <View style={styles.wrapperTitle}>
                <Text style={styles.title} numberOfLines={1}>
                  {episode.post_name}
                </Text>
                <Text style={styles.episode}>
                  Episode {episode.post_episodes} -{' '}
                  {moment(episode.updated_at).format('DD MMMM YYYY')}
                </Text>
              </View>
            </View>
          ) : (
            <ImageDetail
              animeDetail={animeDetail}
              onPress={() => {
                setVideoPlay(true), setEpisode(animeDetail.episodes[0]);
              }}
            />
          )}
          <View style={styles.wrapper}>
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
          </View>
          <View style={styles.sinopsis}>
            <Text style={styles.sinopsisTitle}>Synopsis</Text>
            <Text
              style={styles.sinopsisDetail}
              numberOfLines={textShown ? undefined : 5}
              onTextLayout={onTextLayout}>
              {animeDetail.sub_description}
            </Text>
            {lengthMore ? (
              <Text onPress={toggleNumberOfLines} style={styles.readMore}>
                {textShown ? 'read less' : 'read more'}
              </Text>
            ) : null}
          </View>
          {animeDetail.type === 'TV' ? (
            <View style={styles.otherEpisodes}>
              <View style={styles.wrapperLabel}>
                <Text style={styles.label}>Other Episodes</Text>
                {animeDetail.pages ? (
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('Episodes', {animeDetail})
                    }>
                    <Text style={styles.more}>See more</Text>
                  </TouchableOpacity>
                ) : null}
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
          ) : (
            <View style={styles.recomendation}>
              <Recomendation />
            </View>
          )}
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
    marginTop: 16,
    marginHorizontal: 16,
  },
  genreWrapper: {
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
  video: {
    height: responsiveHeight(320),
  },
  wrapperTitle: {
    marginTop: 12,
    marginHorizontal: 16,
  },
  episode: {
    fontFamily: fonts.sora.regular,
    fontSize: 10,
    color: colors.onBackground,
    marginBottom: 8,
  },
  title: {
    fontFamily: fonts.nunito.bold,
    fontSize: 22,
    color: colors.onBackground,
  },
  otherEpisodes: {
    margin: 16,
  },
  recomendation: {
    marginTop: -20,
    padding: 16,
  },
  wrapperEpisodes: {
    flexDirection: 'row',
    marginTop: 12,
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
});
