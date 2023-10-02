import React from 'react';
import { StyleSheet, TextInput } from 'react-native';
import { windowHeight, windowWidth } from './utils/Dimensions';
export default function FormInput({ labelValue, placeholderText, ...rest }) {
  return (
    <TextInput
      value={labelValue}
      numberOfLines={1}
      placeholder={placeholderText}
      placeholderTextColor='#666'
      {...rest}
      style={styles.input}
      ref={ref => ref && ref.setNativeProps({ style: { fontFamily: 'FuturaPT-Book', } })}
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
    fontFamily: 'FuturaPT-Book',
    borderBottomWidth: 2, 
    borderBottomColor: '#AFAFAF'
  }
});