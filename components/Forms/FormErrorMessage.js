import React from 'react';
import { StyleSheet, Text } from 'react-native';


export default function FormErrorMessage({ error, visible }) {
  if (!error || !visible) {
    return null;
  }

  return <Text style={styles.errorText}>{error}</Text>;
}

const styles = StyleSheet.create({
  errorText: {
    marginLeft: 15,
    color: 'white',
    fontSize: 16,
    marginBottom: 5,
    fontWeight: '600'
  }
});