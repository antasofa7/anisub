import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Input from '.';
import {IconSearch, IconSearchMenu} from '../../../assets';
import {colors, fonts, responsiveHeight} from '../../../utils';

const InputSearch = ({data, navigation}) => {
  const [filterdData, setFilteredData] = useState([]);

  const handleInput = text => {
    let searchText = text.toLowerCase();
    let filteredName = data.filter(item => {
      if (searchText !== '') {
        if (item.post_name.toLowerCase().includes(searchText)) {
          return item.post_name;
        }
      }
    });
    setFilteredData(filteredName);
  };

  return (
    <View style={styles.container}>
      <IconSearchMenu style={styles.icon} />
      <Input
        placeholder="Search anime..."
        onChangeText={text => handleInput(text)}
      />
      <View style={styles.viewSearch}>
        <FlatList
          data={filterdData}
          renderItem={({item}) => (
            <TouchableOpacity
              key={item.sub_id}
              onPress={() =>
                navigation.navigate('Detail', {animeId: item.sub_id})
              }>
              <Text style={styles.dataSearch}>{item.post_name}</Text>
            </TouchableOpacity>
          )}
        />
        {/* {filterdData.map(item => {
          return (
            <Text style={styles.dataSearch} key={item.post_id}>
              {item.post_name}
            </Text>
          );
        })} */}
      </View>
    </View>
  );
};

export default InputSearch;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    backgroundColor: colors.onPrimary,
    borderRadius: 10,
    height: responsiveHeight(40),
  },
  icon: {
    marginRight: 5,
  },
  viewSearch: {
    zIndex: 1,
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
    backgroundColor: colors.background,
  },
  dataSearch: {
    fontFamily: fonts.sora.regular,
    fontSize: 16,
    color: colors.onBackground,
    padding: 16,
  },
});
