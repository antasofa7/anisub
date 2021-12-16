import {Dimensions} from 'react-native';
import {screenDesignHeight, screenDesignWidth} from '../constan';

export const screenWidth = Dimensions.get('screen').width;
export const screenHeight = Dimensions.get('screen').height;

const responsiveWidth = width => {
  return (screenWidth * width) / screenDesignWidth;
};

const responsiveHeight = height => {
  return (screenHeight * height) / screenDesignHeight;
};

export {responsiveWidth, responsiveHeight};
