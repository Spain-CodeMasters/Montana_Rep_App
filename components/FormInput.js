import React from 'react';
import { StyleSheet, TextInput } from 'react-native';
import { windowHeight, windowWidth } from './utils/Dimensions';
export default function FormInput({ labelValue, placeholderText, ...rest }) {
  return (
    <TextInput
      value={labelValue}
      style={styles.input}
      numberOfLines={1}
      placeholder={placeholderText}
      placeholderTextColor='#666'
      {...rest}
    />
  );
}
const styles = StyleSheet.create({
  input: {
    flex: 1,
    // marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#A49F9F',
    // marginBottom: 20,
    width: windowWidth / 1.5,
    height: windowHeight / 15,
    fontSize: 18,
    fontFamily: 'FuturaPTBook',
    borderBottomWidth: 2, 
    borderBottomColor: '#AFAFAF'
  }
});