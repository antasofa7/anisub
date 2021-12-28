import React, {useCallback, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  VirtualizedList,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {BannerCarousel, Header, NewAllAnime, UpcomingAnime} from '..';
import {getAnimeByGenre} from '../../../config';
import {colors, fonts, IMG_ANIME_URL, responsiveHeight} from '../../../utils';
import {Spacing} from '../../atoms';
import {MainCardFilm} from '../../molecules';

const AnimeByGenre = ({navigation, loading, isPage}) => {
  // const [genres, setGenres] = useState([]);
  const [movies, setMovies] = useState([]);
  const [isLoading, setLoading] = useState(true);
  // const [isLoadingGenre, setLoadingGenre] = useState(true);

  // const getGenreList = useCallback(async () => {
  //   setLoadingGenre(true);
  //   const res = await getGenres();
  //   res.data.map(item => {
  //     console.log(item.genre_name);
  //   });
  //   setGenres(res.data);
  //   setLoadingGenre(false);
  // }, []);

  // console.log(genres);
  const getMovieList = useCallback(async () => {
    setLoading(true);
    const res = await getAnimeByGenre();
    setMovies(res.data);
    setLoading(false);
  }, []);

  useEffect(() => {
    // getGenreList();
    getMovieList();
  }, [getMovieList]);

  const _listHeader = () => {
    return (
      <View>
        <Header home />
        <BannerCarousel navigation={navigation} isPages={isPage} />
        {/* <ContinueWatching animes={animes} />
        <WatchList animes={animes} /> */}
        <NewAllAnime loading={isLoading} isPages={isPage} />
        <UpcomingAnime loading={isLoading} isPages={isPage} />
      </View>
    );
  };

  // const getItem = (data, index) => {
  //   return {
  //     id: index,
  //     genre: 'test',
  //   };
  // };
  // const getItemCount = data => {
  //   return 12;
  // };

  const _renderAllItem = ({item}) => {
    return (
      <View style={styles.wrapper}>
        <Text style={styles.label}>{item.genre_name}</Text>
        <FlatList
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={item.animes}
          renderItem={_renderItem}
          initialNumToRender={3}
          // ItemSeparatorComponent={_itemSeparator}
          // keyExtractor={() => item.sub_id.toString()}
          // numColumns={numColumns}
          // scrollToIndex={() => ({animated: true, index: 0})}
          scrollToEnd={() => ({animated: true})}
        />
      </View>
    );
  };

  const _renderItem = ({item}) => {
    return (
      <View key={item.sub_id} style={styles.wrapperItem}>
        <TouchableOpacity
          onPress={() => navigation('Detail', {animeId: item.sub_id})}>
          <MainCardFilm
            key={item.sub_id}
            title={item.sub_name}
            //   rating={item.rate}
            thumbnail={`${IMG_ANIME_URL}/${item.sub_banner}`}
            isLoading={isLoading}
            // onPress={() => navigation.navigate("movie", { movieId: item.id })}
          />
          {/* //     );
        //   })}
        // </ScrollView> */}
        </TouchableOpacity>
      </View>
    );
  };
  // console.log('movies ', movies);
  [
    {
      duration: '24 min.',
      post_episodes: '9',
      post_id: '2866',
      post_image: '1638522766_66875f62722c13188c47.jpg',
      post_name: 'Platinum End Episode 9',
      rate: '7.61',
      sid_new: '254',
      sub_id: '254',
      type: 'TV',
      updated_at: '2021-12-03 03:12:47',
    },
    {
      duration: '23 min.',
      post_episodes: '8',
      post_id: '2865',
      post_image: '1638522604_2b18d5687681913e145c.jpg',
      post_name: 'Ousama Ranking Episode 8',
      rate: '8.25',
      sid_new: '264',
      sub_id: '264',
      type: 'TV',
      updated_at: '2021-12-03 03:10:04',
    },
    {
      duration: '23 min.',
      post_episodes: '9',
      post_id: '2864',
      post_image: '1638522461_1f6ba4d44c63dd31dfd9.jpg',
      post_name: 'Sakugan Episode 9',
      rate: '7.55',
      sid_new: '253',
      sub_id: '253',
      type: 'TV',
      updated_at: '2021-12-03 03:07:41',
    },
    {
      duration: '22 min.',
      post_episodes: '23',
      post_id: '2863',
      post_image: '1638522297_2b56e078b8d4b882e5d7.jpg',
      post_name: 'Scarlet Nexus Episode 23',
      rate: '6.70',
      sid_new: '195',
      sub_id: '195',
      type: 'TV',
      updated_at: '2021-12-03 03:04:58',
    },
    {
      duration: '23 min.',
      post_episodes: '34',
      post_id: '2862',
      post_image: '1638522153_9ef8d7c2c5533f06b6a6.jpg',
      post_name: 'Shaman King (2021) Episode 34',
      rate: '7.45',
      sid_new: '147',
      sub_id: '147',
      type: 'TV',
      updated_at: '2021-12-03 03:02:34',
    },
    {
      duration: '22 min.',
      post_episodes: '9',
      post_id: '2861',
      post_image: '1638522009_83466914c21a7f0da432.jpg',
      post_name: 'Muv-Luv Alternative Episode 9',
      rate: '6.61',
      sid_new: '251',
      sub_id: '251',
      type: 'TV',
      updated_at: '2021-12-03 03:00:09',
    },
    {
      duration: '23 min.',
      post_episodes: '9',
      post_id: '2860',
      post_image: '1638521845_d68c99e20567c9e04223.jpg',
      post_name: 'Komi-san wa, Comyushou desu. Episode 9',
      rate: '8.55',
      sid_new: '247',
      sub_id: '247',
      type: 'TV',
      updated_at: '2021-12-03 02:57:25',
    },
    {
      duration: '23 min.',
      post_episodes: '9',
      post_id: '2859',
      post_image: '1638521688_4b8ffd216617d9047491.jpg',
      post_name:
        'Sekai Saikou no Ansatsusha, Isekai Kizoku ni Tensei suru Episode 9',
      rate: '7.61',
      sid_new: '250',
      sub_id: '250',
      type: 'TV',
      updated_at: '2021-12-03 02:54:49',
    },
    {
      duration: '23 min.',
      post_episodes: '9',
      post_id: '2858',
      post_image: '1638521531_f0ec29895a6a3c3414f9.jpg',
      post_name: 'Puraore! Pride of Orange Episode 9',
      rate: '6.44',
      sid_new: '249',
      sub_id: '249',
      type: 'TV',
      updated_at: '2021-12-03 02:52:11',
    },
    {
      duration: '23 min.',
      post_episodes: '9',
      post_id: '2857',
      post_image: '1638521356_ca340737e993aada7f4a.jpg',
      post_name:
        'Shin no Nakama ja Nai to Yuusha no Party wo Oidasareta node, Henkyou de Slow Life suru Koto ni Shimashita Episode 9',
      rate: '7.15',
      sid_new: '248',
      sub_id: '248',
      type: 'TV',
      updated_at: '2021-12-03 02:49:17',
    },
    {
      duration: '-',
      post_episodes: '8',
      post_id: '2856',
      post_image: '1638360965_6f871460347e57541bfc.jpg',
      post_name: 'Deep Insanity: The Lost Child Episode 8',
      rate: '5.44',
      sid_new: '266',
      sub_id: '266',
      type: 'TV',
      updated_at: '2021-12-01 06:16:06',
    },
    {
      duration: '23 min.',
      post_episodes: '9',
      post_id: '2855',
      post_image: '1638360792_589e7ad08b692559d096.jpg',
      post_name: 'Takt Op. Destiny Episode 9',
      rate: '8.15',
      sid_new: '245',
      sub_id: '245',
      type: 'TV',
      updated_at: '2021-12-01 06:13:13',
    },
    {
      duration: '-',
      post_episodes: '8',
      post_id: '2854',
      post_image: '1638349479_49522e526ae08e6ba57d.jpg',
      post_name: 'Megaton-kyuu Musashi Episode 8',
      rate: '5.77',
      sid_new: '265',
      sub_id: '265',
      type: 'TV',
      updated_at: '2021-12-01 03:04:40',
    },
    {
      duration: '24 min.',
      post_episodes: '9',
      post_id: '2853',
      post_image: '1638349261_53bedcbe118a7926252d.jpg',
      post_name: 'Kyoukai Senki Episode 9',
      rate: '6.78',
      sid_new: '243',
      sub_id: '243',
      type: 'TV',
      updated_at: '2021-12-01 03:01:02',
    },
    {
      duration: '24 min.',
      post_episodes: '9',
      post_id: '2866',
      post_image: '1638522766_66875f62722c13188c47.jpg',
      post_name: 'Platinum End Episode 9',
      rate: '7.61',
      sid_new: '254',
      sub_id: '254',
      type: 'TV',
      updated_at: '2021-12-03 03:12:47',
    },
    {
      duration: '23 min.',
      post_episodes: '8',
      post_id: '2865',
      post_image: '1638522604_2b18d5687681913e145c.jpg',
      post_name: 'Ousama Ranking Episode 8',
      rate: '8.25',
      sid_new: '264',
      sub_id: '264',
      type: 'TV',
      updated_at: '2021-12-03 03:10:04',
    },
    {
      duration: '23 min.',
      post_episodes: '9',
      post_id: '2864',
      post_image: '1638522461_1f6ba4d44c63dd31dfd9.jpg',
      post_name: 'Sakugan Episode 9',
      rate: '7.55',
      sid_new: '253',
      sub_id: '253',
      type: 'TV',
      updated_at: '2021-12-03 03:07:41',
    },
    {
      duration: '22 min.',
      post_episodes: '23',
      post_id: '2863',
      post_image: '1638522297_2b56e078b8d4b882e5d7.jpg',
      post_name: 'Scarlet Nexus Episode 23',
      rate: '6.70',
      sid_new: '195',
      sub_id: '195',
      type: 'TV',
      updated_at: '2021-12-03 03:04:58',
    },
    {
      duration: '23 min.',
      post_episodes: '34',
      post_id: '2862',
      post_image: '1638522153_9ef8d7c2c5533f06b6a6.jpg',
      post_name: 'Shaman King (2021) Episode 34',
      rate: '7.45',
      sid_new: '147',
      sub_id: '147',
      type: 'TV',
      updated_at: '2021-12-03 03:02:34',
    },
    {
      duration: '22 min.',
      post_episodes: '9',
      post_id: '2861',
      post_image: '1638522009_83466914c21a7f0da432.jpg',
      post_name: 'Muv-Luv Alternative Episode 9',
      rate: '6.61',
      sid_new: '251',
      sub_id: '251',
      type: 'TV',
      updated_at: '2021-12-03 03:00:09',
    },
    {
      duration: '23 min.',
      post_episodes: '9',
      post_id: '2860',
      post_image: '1638521845_d68c99e20567c9e04223.jpg',
      post_name: 'Komi-san wa, Comyushou desu. Episode 9',
      rate: '8.55',
      sid_new: '247',
      sub_id: '247',
      type: 'TV',
      updated_at: '2021-12-03 02:57:25',
    },
    {
      duration: '23 min.',
      post_episodes: '9',
      post_id: '2859',
      post_image: '1638521688_4b8ffd216617d9047491.jpg',
      post_name:
        'Sekai Saikou no Ansatsusha, Isekai Kizoku ni Tensei suru Episode 9',
      rate: '7.61',
      sid_new: '250',
      sub_id: '250',
      type: 'TV',
      updated_at: '2021-12-03 02:54:49',
    },
    {
      duration: '23 min.',
      post_episodes: '9',
      post_id: '2858',
      post_image: '1638521531_f0ec29895a6a3c3414f9.jpg',
      post_name: 'Puraore! Pride of Orange Episode 9',
      rate: '6.44',
      sid_new: '249',
      sub_id: '249',
      type: 'TV',
      updated_at: '2021-12-03 02:52:11',
    },
    {
      duration: '23 min.',
      post_episodes: '9',
      post_id: '2857',
      post_image: '1638521356_ca340737e993aada7f4a.jpg',
      post_name:
        'Shin no Nakama ja Nai to Yuusha no Party wo Oidasareta node, Henkyou de Slow Life suru Koto ni Shimashita Episode 9',
      rate: '7.15',
      sid_new: '248',
      sub_id: '248',
      type: 'TV',
      updated_at: '2021-12-03 02:49:17',
    },
    {
      duration: '-',
      post_episodes: '8',
      post_id: '2856',
      post_image: '1638360965_6f871460347e57541bfc.jpg',
      post_name: 'Deep Insanity: The Lost Child Episode 8',
      rate: '5.44',
      sid_new: '266',
      sub_id: '266',
      type: 'TV',
      updated_at: '2021-12-01 06:16:06',
    },
    {
      duration: '23 min.',
      post_episodes: '9',
      post_id: '2855',
      post_image: '1638360792_589e7ad08b692559d096.jpg',
      post_name: 'Takt Op. Destiny Episode 9',
      rate: '8.15',
      sid_new: '245',
      sub_id: '245',
      type: 'TV',
      updated_at: '2021-12-01 06:13:13',
    },
    {
      duration: '-',
      post_episodes: '8',
      post_id: '2854',
      post_image: '1638349479_49522e526ae08e6ba57d.jpg',
      post_name: 'Megaton-kyuu Musashi Episode 8',
      rate: '5.77',
      sid_new: '265',
      sub_id: '265',
      type: 'TV',
      updated_at: '2021-12-01 03:04:40',
    },
    {
      duration: '24 min.',
      post_episodes: '9',
      post_id: '2853',
      post_image: '1638349261_53bedcbe118a7926252d.jpg',
      post_name: 'Kyoukai Senki Episode 9',
      rate: '6.78',
      sid_new: '243',
      sub_id: '243',
      type: 'TV',
      updated_at: '2021-12-01 03:01:02',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {isLoading ? (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color={colors.onPrimary} />
        </View>
      ) : (
        <FlatList
          data={movies}
          renderItem={_renderAllItem}
          initialNumToRender={4}
          keyExtractor={item => item.genre_id.toString()}
          // getItemCount={getItemCount}
          // getItem={getItem}
          scrollToEnd={() => ({animated: true})}
          ListHeaderComponent={_listHeader}
          // ListFooterComponent={() => <Spacing height={responsiveHeight(10)} />}
        />
        // <View>
        //   {movies.map(genre => {
        //     return (
        //       <View key={genre.genre_id}>
        //         <Text style={styles.label}>{genre.genre_name}</Text>
        //         <FlatList
        //           horizontal={true}
        //           showsHorizontalScrollIndicator={false}
        //           data={genre.animes}
        //           renderItem={_renderItem}
        //           initialNumToRender={3}
        //           // ItemSeparatorComponent={_itemSeparator}
        //           keyExtractor={item => item.sub_id.toString()}
        //           // numColumns={numColumns}
        //           // scrollToIndex={() => ({animated: true, index: 0})}
        //           scrollToEnd={() => ({animated: true})}
        //         />
        //       </View>
        //     );
        //   })}
        // </View>
      )}
    </SafeAreaView>
  );
};

export default AnimeByGenre;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
  },
  wrapper: {
    marginTop: 16,
  },
  wrapperItem: {
    flexDirection: 'row',
    marginTop: 8,
  },
  label: {
    fontSize: 14,
    fontFamily: fonts.sora.medium,
    color: colors.onBackground,
  },
  wrapperImageLoading: {
    flexDirection: 'row',
    marginTop: 8,
  },
  loading: {
    marginTop: 16,
  },
});
