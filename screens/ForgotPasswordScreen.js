import React, { useState, useContext,  } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform, StatusBar } from 'react-native';
import FormInput from '../components/FormInput';
import FormButton from '../components/Forms/FormButton';
import FormErrorMessage from '../components/Forms/FormErrorMessage';
import useStatusBar from '../hooks/useStatusBar';

import { AuthContext } from '../navigation/AuthProvider';


export default function ForgotPasswordScreen({ navigation }) {
  useStatusBar('light-content');
  const [email, setEmail] = useState('');
  const [customError, setCustomError] = useState('');
  const { passwordReset } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <View style ={styles.header}>
        <Text style={styles.text_header}>Forgot Your Password?</Text>
      </View>

      <View style={styles.footer}>
      <View style={styles.action}>
        <FormInput
          value={email}
          placeholderText='Enter your Email'
          onChangeText={userEmail => setEmail(userEmail)}
          autoCapitalize='none'
          keyboardType='email-address'
          autoCorrect={false}
        />
        </View>
          <FormButton buttonTitle="Send Me An Email" onPress={() => passwordReset(email)} />
          {<FormErrorMessage error={customError} visible={true} />}
          
      </View>
    </View>
  );
}


  const styles = StyleSheet.create({
    container: {
      flex: 1, 
      backgroundColor: '#fff'
    },
    inner: { 
      flex: 1, 
      justifyContent: "space-around"
    },
    header: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 0,
        paddingTop: 100,
        paddingBottom: 10
    },
    footer: {
      flex: 3,
      backgroundColor: '#fff',
      paddingHorizontal: 20,
      // paddingVertical: 30,
      // paddingTop: 20,
      paddingLeft: 50,
      paddingRight: 50
  },
  text_header: {
    color: '#343A3F',
    fontFamily: 'FuturaPT-Demi',
    fontWeight: 'bold',
    fontSize: 30
},
action: {
  flexDirection: 'row',
 
  paddingBottom: 10
},

  });