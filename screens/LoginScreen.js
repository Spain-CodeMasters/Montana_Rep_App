import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform, StatusBar } from 'react-native';
import FormButton from '../components/Forms/FormButton';
import FormInput from '../components/FormInput';
import SafeView from '../components/SafeView';
import * as Animatable from 'react-native-animatable';
import Feather from 'react-native-vector-icons/Feather';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { AuthContext } from '../navigation/AuthProvider';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, error, setError } = useContext(AuthContext);

  // const [data, setData] = React.useState({
  //   email: '',
  //   password: '',
  //   // check_textInputChange: false,
  //   // secureTextEntry: true,
  //   // isValidEmail: true, 
  //   // isValidPassword: true,

  // });

  // const textInputChange = (val) => {
  //   if( val.trim().length >= 4) {
  //     setData({
  //       ...data,
  //       email: val, 
  //       check_textInputChange: true,
  //       isValidEmail: true
  //     });
  //   } else {
  //     setData({
  //       ...data,
  //       email: val, 
  //       check_textInputChange: false,
  //       isValidEmail: false
  //     });
  //   }
  // }

  // const handlePasswordChange = (val) => {
  //   if( val.trim().length >= 6) {
  //   setData({
  //     ...data, 
  //     password: val,
  //     isValidPassword: true
  //   });
  // } else {
  //   setData({
  //     ...data, 
  //     password: val,
  //     isValidPassword: false
  //   });

  // }
  // }

  // const updateSecureTextEntry = () => {
  //   setData({
  //     ...data, 
  //     secureTextEntry: !data.secureTextEntry
  //   });
  // }

  // const handleValidEmail = (val) => {
  //     if( val.trim().length >= 4) {
  //       setData({
  //         ...data, 
  //         isValidEmail: true
  //       });

  //     } else {
  //       setData({
  //         ...data, 
  //         isValidEmail: false
  //       });
  //     }
  // }

  useEffect(() => {
    setError('');
  }, [])

  function navigate(){
    setError('');
    navigation.navigate('Signup');
  }

  function handleLogin(email, password) {
    if (email == "") {
      setError(' Please enter a valid email.')
    } else if (password == "") {
      setError(" Please enter a password.")
    } else {
      login(email, password)
    }
  }

  return (
    <SafeView style={styles.container}>
      {/* <Text style={styles.text}>Welcome to Firebase app</Text> */}
      <StatusBar backgroundColor='#fff' barStyle="dark-content" />
      <View style={styles.header}>
        <Text style={styles.text_header}>Sign In</Text>
        <View>
          <View style={{ display: "flex", flexDirection: "row", flex: 1, flexwrap: 'wrap', margin: 15 }}>
            <Text style={styles.text_subheader}>New User? </Text>
            <TouchableOpacity onPress={() => navigate()}>
              <Text style={styles.text_linkheader}>
                Create an Account
                  </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <Animatable.View
        animation="fadeInUpBig"
        style={styles.footer}>
        <View style={styles.action}>
          <FormInput
            value={email}
            placeholderText='Email'
            onChangeText={userEmail => setEmail(userEmail)}
            autoCapitalize='none'
            keyboardType='email-address'
            autoCorrect={false}
          />
          {/* {data.check_textInputChange ? */}
          {/* <Animatable.View
                animation="bounceIn"
            >
            <Feather
              name="check-circle"
              color="green"
              size={20}
            />
            </Animatable.View> */}
          {/* : null} */}
        </View>

        <View style={[styles.action, {
          marginTop: 20
        }]}>
          <FormInput
            value={password}
            placeholderText='Password'
            onChangeText={userPassword => setPassword(userPassword)}

            secureTextEntry={true}
          />
          {/* <TouchableOpacity
              onPress={updateSecureTextEntry}
            > */}
          {/* {data.secureTextEntry ?  */}
          {/* <Feather
                  name="eye-off"
                  color="grey"
                  size={20}
                /> */}
          {/* : */}
          {/* <Feather
                  name="eye"
                  color="grey"
                  size={20}
                /> */}
          {/* } */}
          {/* </TouchableOpacity> */}
        </View>
        <Text style={{color: "red", fontSize: 16, fontFamily: 'FuturaPT-Book',}}>{error}</Text>
        <View styles={styles.button} >
          <FormButton buttonTitle='Sign In' onPress={() => handleLogin(email, password)} />
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('ForgotPasswordScreen')}>
          <Text style={styles.text_footer}>Forgot your password?</Text>
        </TouchableOpacity>
        {/* </View> */}
      </Animatable.View>
    </SafeView>
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
    //fontWeight: 'bold',
    fontSize: 40
  },
  text_subheader: {
    color: '#343a3f',
    fontFamily: 'FuturaPT-Book',
    // marginTop: 10,
    fontSize: 20
  },
  text_linkheader: {
    color: '#747A21',
    fontFamily: 'FuturaPT-Book',
    // marginTop: 10,
    fontSize: 20
  },
  text_footer: {
    marginTop: 20,
    marginBottom: 20,
    color: 'grey',
    fontSize: 16,
    fontFamily: 'FuturaPT-Book',
  },
  action: {
    flexDirection: 'row',
    // marginTop: 10,
    paddingBottom: 10
  },
  actionError: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#FF0000',
    paddingBottom: 5
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#A49F9F',
  },
  errorMsg: {
    color: '#FF0000',
    fontSize: 14,
  },
  button: {
    // alignItems: 'center',
    paddingTop: 25,
    marginTop: 50
  },
  signIn: {
    backgroundColor: '#cc8a05',
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5
  },
  textSign: {
    fontSize: 18,
    fontWeight: 'bold'
  }
});