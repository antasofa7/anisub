import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Rating} from 'react-native-rating-element';

const Star = ({rating}) => {
  const ratings = rating / 2;
  return (
    <View>
      <Rating
        rated={ratings}
        totalCount={5}
        size={12}
        type="custom"
        selectedIconImage={require('../../../assets/icons/icon_star_active.png')}
        emptyIconImage={require('../../../assets/icons/icon_star.png')}
      />
    </View>
  );
};

export default Star;

const styles = StyleSheet.create({});
