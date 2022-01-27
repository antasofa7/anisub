import React from 'react';
import {StyleSheet, View} from 'react-native';
import {responsiveHeight} from '../../../utils';
import {InputSearch} from '../../atoms';

const HeaderSearch = ({navigation, onPress, close}) => {
  return (
    <View style={styles.container}>
      <InputSearch close={close} navigation={navigation} onPress={onPress} />
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
