import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

const TabItem = props => {
  const {index, label, isFocused, onPress, onLongPress} = props;
  return (
    <TouchableOpacity
      key={index}
      accessibilityRole="button"
      accessibilityState={isFocused ? {selected: true} : {}}
      onPress={onPress}
      onLongPress={onLongPress}
      style={{flex: 1}}>
      <Text style={{color: isFocused ? '#673ab7' : '#222'}}>{label}</Text>
    </TouchableOpacity>
  );
};

export default TabItem;

const styles = StyleSheet.create({});
