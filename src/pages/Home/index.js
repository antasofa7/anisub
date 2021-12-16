import React, {Component} from 'react';
import {Text, StyleSheet, View} from 'react-native';
import {color} from '../../utils/colors';

export default class Home extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text> Home page </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.backgroud,
  },
});
