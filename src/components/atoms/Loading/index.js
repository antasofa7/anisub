import React from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import {colors, fonts, responsiveHeight, responsiveWidth} from '../../../utils';

export const LoadingPage = ({allDataDisplayed, width, margin, small}) => {
  const size = small ? 'small' : 'large';
  return (
    <View style={styles.loading(margin, width)}>
      {allDataDisplayed ? (
        <Text style={styles.TextDisplayed} numberOfLines={2}>
          All data is displayed.
        </Text>
      ) : (
        <ActivityIndicator size={size} color={colors.secondary} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  loading: (margin, width) => ({
    marginTop: margin ? responsiveHeight(260) : 0,
    paddingHorizontal: 16,
    flex: 1,
    width: width ? responsiveWidth(110) : '100%',
    justifyContent: 'center',
    alignItems: 'center',
  }),
  TextDisplayed: {
    color: colors.secondary,
    fontFamily: fonts.sora.regular,
    fontSize: 10,
  },
});
