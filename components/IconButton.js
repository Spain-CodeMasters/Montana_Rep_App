import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

export default function IconButton({ iconName, color, size, onPress, style }) {
  return (
    <TouchableOpacity style={[style]} onPress={onPress}>
      <Feather name={iconName} size={size} color={color} />
    </TouchableOpacity>
  );
}