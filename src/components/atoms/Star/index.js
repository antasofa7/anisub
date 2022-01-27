import React from 'react';
import {View} from 'react-native';
import {Rating} from 'react-native-rating-element';

const Star = ({rating, size}) => {
  const ratings = rating / 2;
  return (
    <View>
      <Rating
        rated={ratings}
        totalCount={5}
        size={size}
        type="custom"
        selectedIconImage={require('../../../assets/icons/icon_star_active.png')}
        emptyIconImage={require('../../../assets/icons/icon_star.png')}
      />
    </View>
  );
};

export default Star;
