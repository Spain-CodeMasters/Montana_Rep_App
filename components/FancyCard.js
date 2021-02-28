import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import {windowHeight, windowWidth} from './utils/Dimensions';

// import Colors from './utils/colors';

export default function FancyCard({ title, onPress }) {
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: '#CD9A36' }]}
      onPress={onPress}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    marginTop: 10,
    width: windowWidth/1.2,
    height: windowHeight /8,
    padding: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  buttonText: {
    fontFamily: 'FuturaPTBook', 
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  }
});