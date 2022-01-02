import {useRoute} from '@react-navigation/native';
import moment from 'moment';
import React, {useCallback, useEffect, useState} from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import {IconShare} from '../../assets';
import {Star} from '../../components/atoms';
import {ImageDetail, OtherEpisodes} from '../../components/organism';
import {getAnimeById} from '../../config';
import {
  colors,
  fonts,
  IMG_EPISODE_URL,
  responsiveHeight,
  responsiveWidth,
} from '../../utils';
import FastImage from 'react-native-fast-image';
import {MainCardFilm} from '../../components/molecules';
import Video from 'react-native-video';

const PlayVideo = () => {
  const route = useRoute();
  const animeDetail = route.params.animeDetail;
  const episodes = animeDetail.episodes[0];
  // const episodes = episodes[0];
  console.log('episodes', episodes.post_image);
  // const {animeId} = route.params;
  // console.log('animeId>> ', animeId);
  // const [IdEpisode, setIdEpisode] = useState([]);
  // const [genres, setGenres] = useState([]);
  // const [isLoading, setLoading] = useState(true);
  const [textShown, setTextShown] = useState(false);
  const [lengthMore, setLengthMore] = useState(false);

  // const getAnimeDetail = useCallback(async () => {
  //   setLoading(true);
  //   const res = await getAnimeById(animeId);
  //   setAnimeDetail(res.data.anime);
  //   setLoading(false);
  //   setGenres(res.data.anime.genres);
  // }, [animeId]);

  // useEffect(() => {
  //   setIdEpisode(episodes.)
  // }, [getAnimeDetail]);

  const onTextLayout = useCallback(e => {
    setLengthMore(e.nativeEvent.lines.length >= 3); //to check the text is more than 4 lines or not
    // console.log(e.nativeEvent);
  }, []);

  const toggleNumberOfLines = () => {
    //To toggle the show text or hide it
    setTextShown(!textShown);
  };

  return (
    <View style={styles.container}>
      {/* {isLoading ? (
        <View style={styles.loading}>
          <ActivityIndicator
            size="large"
            color={colors.onPrimary}
            // style={styles.loading}
          />
        </View>
      ) : ( */}
      <View>
        <Video
          source={{
            uri: episodes.post_video,
          }}
          style={styles.imageDetail}
          controls={true}
          poster={`${IMG_EPISODE_URL}/${episodes.post_image}`}
          resizeMode="cover"
          // ref={(ref) => {
          // this.player = ref
          // }}
        />
        {/* <MainCardFilm thumbnail={`${IMG_EPISODE_URL}/${episodes.post_image}`} /> */}
        {/* <FastImage
          source={{uri: `${IMG_EPISODE_URL}/${episodes.post_image}`}}
        /> */}
        <View style={styles.wrapper}>
          <Text style={styles.title}>{episodes.post_name}</Text>
          <View style={styles.wrapperShare}>
            <View style={styles.sinopsis}>
              {/* <Text style={styles.sinopsisDetail} numberOfLines={2}>
                Episode {episodes.post_episodes}
              </Text> */}
              <Text style={styles.genre}>
                {moment(episodes.updated_at).format('dddd, d MMMM YYYY')}
              </Text>
            </View>
            <IconShare />
          </View>
        </View>
        <OtherEpisodes
          // episodes={animeDetail.episodes}
          animeId={animeDetail.sub_id}
          // pages={animeDetail.pages}
        />
      </View>
      {/* )} */}
    </View>
  );
};

export default PlayVideo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  imageDetail: {
    width: responsiveWidth(360),
    height: responsiveHeight(270),
  },
  wrapper: {
    marginVertical: 4,
    marginHorizontal: 16,
  },
  genre: {
    fontFamily: fonts.sora.regular,
    fontSize: 12,
    color: colors.onBackground,
  },
  wrapperShare: {
    marginTop: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    marginTop: 16,
    fontFamily: fonts.sora.semiBold,
    fontSize: 16,
    color: colors.onBackground,
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
