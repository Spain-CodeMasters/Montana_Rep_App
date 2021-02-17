  
import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import {windowHeight, windowWidth} from './utils/Dimensions';

import Colors from './utils/colors';

export default function AppButton({ title, onPress, color = 'Secondary_Copper' }) {
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: Colors[color] }]}
      onPress={onPress}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    marginTop: 10,
    width: windowWidth/1.3,
    height: windowHeight /15,
    padding: 10,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  }
});