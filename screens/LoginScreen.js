import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform, StatusBar } from 'react-native';
import FormButton from '../components/Forms/FormButton';
import FormInput from '../components/FormInput';
import SafeView from '../components/SafeView';
import * as Animatable from 'react-native-animatable';

import { AuthContext } from '../navigation/AuthProvider';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, error, setError } = useContext(AuthContext);


  useEffect(() => {
    setError('');
  }, [])

  function navigate() {
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
        </View>
        <Text style={{ color: "red", fontSize: 16, fontFamily: 'FuturaPT-Book', }}>{error}</Text>
        <View styles={styles.button} >
          <FormButton buttonTitle='Sign In' onPress={() => handleLogin(email, password)} />
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('ForgotPasswordScreen')}>
          <Text style={styles.text_footer}>Forgot your password?</Text>
        </TouchableOpacity>
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
    paddingLeft: 50,
    paddingRight: 50
  },
  text_header: {
    color: '#343A3F',
    fontFamily: 'FuturaPT-Demi',
    fontSize: 40
  },
  text_subheader: {
    color: '#343a3f',
    fontFamily: 'FuturaPT-Book',
    fontSize: 20
  },
  text_linkheader: {
    color: '#747A21',
    fontFamily: 'FuturaPT-Book',
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