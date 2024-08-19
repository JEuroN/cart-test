import React from 'react';
import {StyleSheet, View} from 'react-native';

export const CardSkeleton = () => {
  return (
    <View>
      <View style={style.skeleton} />
      <View style={style.skeleton} />
      <View style={style.skeleton} />
    </View>
  );
};

const style = StyleSheet.create({
  skeleton: {
    height: 220,
    backgroundColor: 'gray',
    borderColor: '#007299',
    borderWidth: 1,
    borderStyle: 'solid',
    marginTop: 10,
    paddingHorizontal: 5,
    paddingVertical: 5,
    borderRadius: 10,
  },
});
