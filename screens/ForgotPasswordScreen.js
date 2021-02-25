import React, { useState, useContext,  } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform, StatusBar } from 'react-native';


import Colors from '../components/utils/colors';
import SafeView from '../components/SafeView';
import FormInput from '../components/FormInput';
import Form from '../components/Forms/Form';
import FormField from '../components/Forms/FormField';
import FormButton from '../components/Forms/FormButton';
import IconButton from '../components/IconButton';
import {passwordReset} from '../components/Firebase/firebase';
import FormErrorMessage from '../components/Forms/FormErrorMessage';
import useStatusBar from '../hooks/useStatusBar';

// import firebase from 'react-native-firebase/app';

import { AuthContext } from '../navigation/AuthProvider';

// const validationSchema = Yup.object().shape({
//   email: Yup.string()
//     .label('Email')
//     .email('Enter a valid email')
//     .required('Please enter a registered email')
// });


export default function ForgotPasswordScreen({ navigation }) {
  useStatusBar('light-content');
  const [email, setEmail] = useState('');
  const [customError, setCustomError] = useState('');
  const { passwordReset } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <View style ={styles.header}>
        <Text style={styles.text_header}>Forgot Password?</Text>
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
          <FormButton buttonTitle="Forgot Password" onPress={() => passwordReset(email)} />
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
    fontFamily: 'FuturaPTDemi',
    fontWeight: 'bold',
    fontSize: 30
},
action: {
  flexDirection: 'row',
 
  paddingBottom: 10
},

  });