import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';

const TextButtons = ({onPress, text}) => {
  return (
    <TouchableOpacity
      style={{
        borderWidth: 1,
        borderColor: 'black',
        paddingHorizontal: 10,
        paddingVertical: 2,
        borderRadius: 5,
      }}
      onPress={onPress}>
      <Text>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({});

export default TextButtons;
