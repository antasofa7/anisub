import React from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import {Spacing} from '..';
import {colors, fonts, responsiveHeight} from '../../../utils';

export const ListFooterComponent = ({isMoreLoading, allDataDisplayed}) => {
  try {
    // Check If Loading
    if (isMoreLoading) {
      return (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color={colors.secondary} />
          <Spacing height={responsiveHeight(170)} />
        </View>
      );
    } else {
      if (!allDataDisplayed) {
        return <Spacing height={responsiveHeight(170)} />;
      } else {
        return (
          <View style={styles.dataDisplayed}>
            <Text style={styles.TextDisplayed}>All data is displayed.</Text>
          </View>
        );
      }
    }
  } catch (error) {
    console.log(error);
  }
};

const styles = StyleSheet.create({
  loading: {
    marginTop: 50,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dataDisplayed: {
    alignItems: 'center',
    height: 170,
  },
  TextDisplayed: {
    marginTop: 24,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 20,
    backgroundColor: colors.secondary,
    color: colors.onPrimary,
    fontFamily: fonts.sora.regular,
    fontSize: 12,
  },
});
