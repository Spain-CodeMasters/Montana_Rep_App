import React, { useState, useContext, useRef } from "react";
import 'react-native-gesture-handler';
// import { AuthContext } from '../../navigation/AuthProvider';
import { Image, TouchableOpacity, View, StyleSheet} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';



// import FormButton from '../Forms/FormButton';

export default function Cog({onPress}) {
 return (
  
  <TouchableOpacity style={styles.button} 
    onPress={onPress}>
        <View style={{ margin: 20 }}>
      <FontAwesome5
          name = "cog"
          solid
          color="#747A21"
          size={33}
        />
        </View>
      </TouchableOpacity>
     
 );

}

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    alignSelf: 'flex-end',
    zIndex: 3, 
    elevation: 3
  }
});

