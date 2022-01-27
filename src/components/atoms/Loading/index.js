import React from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import {colors, fonts, responsiveHeight, responsiveWidth} from '../../../utils';

export const LoadingPage = ({allDataDisplayed, width, margin, small}) => {
  const size = small ? 'small' : 'large';
  return (
    <View style={styles.loading(margin, width)}>
      {allDataDisplayed ? (
        <Text style={styles.TextDisplayed}>All data is displayed.</Text>
      ) : (
        <ActivityIndicator size={size} color={colors.secondary} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  loading: (margin, width) => ({
    marginTop: margin ? responsiveHeight(260) : 0,
    flex: 1,
    width: width ? responsiveWidth(110) : '100%',
    justifyContent: 'center',
    alignItems: 'center',
  }),
  TextDisplayed: {
    color: colors.onBackground,
    fontFamily: fonts.sora.regular,
    fontSize: 10,
  },
});
