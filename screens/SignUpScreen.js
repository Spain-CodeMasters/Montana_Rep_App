import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, StatusBar, TouchableOpacity } from 'react-native';
import CheckBox from '@react-native-community/checkbox';

import FormButton from '../components/Forms/FormButton';
import FormInput from '../components/FormInput';
import * as Animatable from 'react-native-animatable';
import { AuthContext } from '../navigation/AuthProvider';
import { NavigationEvents } from 'react-navigation';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { db } from '../components/Firebase/firebase';


const SignupScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUsername] = useState('');
  const [subscribed, setSubscribed] = useState(true);
  const { register, error, setError } = useContext(AuthContext);
  const safeAreaInsets = useSafeAreaInsets();

  // const handleChecked = ({ target }) => {
  //   setSubscribed(target.subscribed);
  // }

  // const handleUpload = () => {
  //   db.collection("users").add({
  //      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
  //     name: username,
  //     email: email,
  //     isAdmin: false,
  //     isPremium: false,
  //     isSubscribed: subscribed,
  //     isSponsorBasic: false,
  //     isSponsorPremium: false,
  //   });
  // }

  function navigate(){
    setError('');
    navigation.navigate('Login');
  }

  function handleRegister(username, email, password, confirmPassword, subscribed) {
    if(username == ""){
      setError(' Please enter a name.');
    }else if (email == "") {
      setError(' Please enter a valid email.');
    } else if (password == "") {
      setError(" Please enter a password.");
    } else if(confirmPassword == ""){
      setError(" Please confirm your password.");
    } else if(confirmPassword !== password){
      setError(" Passwords do not match.");
    } else {
      register(username, email, password, subscribed);
    }
  }

  return (
    <View style={{
      flex: 1,
      paddingTop: safeAreaInsets.top,
      paddingBottom: safeAreaInsets.bottom,
      paddingLeft: safeAreaInsets.left,
      paddingRight: safeAreaInsets.right,
    }}>
      <View style={{ flex: 0.2 }}>
        {/* {!!fetching && <ActivityIndicator color={blue} />} */}
      </View>
      <StatusBar backgroundColor='#fff' barStyle="dark-content" color="white" />
      <View style={styles.header}>

        <Text style={styles.text_header}>Sign Up</Text>
        <View style={{ display: "flex", flexDirection: "row", flex: 1, flexwrap: 'wrap', margin: 10 }}>
          <Text style={styles.text_subheader}>Have an Account? </Text>
          <TouchableOpacity onPress={() => navigate()}>
            <Text style={styles.text_linkheader}>
              Sign In
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <Animatable.View
        animation="fadeInUpBig"
        style={styles.footer}>

        <View style={styles.action}>
          <FormInput
            value={username}
            placeholderText='Name'
            onChangeText={username => setUsername(username)}
            autoCapitalize='none'
            keyboardType='email-address'
            autoCorrect={false}
          />
        </View>
        <View style={styles.action}>

          <FormInput
            value={email}
            placeholderText='Email'
            onChangeText={userEmail => setEmail(userEmail)}
            autoCapitalize='none'
            keyboardType='email-address'
            autoCorrect={true}
          />
        </View>
        <View style={styles.action}>
          <FormInput
            value={password}
            placeholderText='Password'
            onChangeText={userPassword => setPassword(userPassword)}

            secureTextEntry={true}
          />
        </View>

        <View style={styles.action}>
          <FormInput
            value={confirmPassword}
            placeholderText='Confirm Password'
            onChangeText={confirmUserPassword => setConfirmPassword(confirmUserPassword)}

            secureTextEntry={true}
          />
        </View>

        <View>
          <Text style={{ color: 'grey', fontSize: 16, fontFamily: 'FuturaPT-Book', }}>
            <CheckBox
              //disabled={false}
              value={subscribed}
              onValueChange={(e) => setSubscribed(!subscribed)}
            />Subscribe to our Newsletter</Text>
        </View>

        <View style={{ padding: 0, width: "100%" }}>
      <Text style={styles.text_footer}>
            By signing up, you agree that you are over the age of 13 and have read the
            <Text
              style={{ color: '#747A21', }}
              onPress={() => navigation.navigate('TermsScreen')}
            > Terms and Conditions</Text>
          </Text>

          <Text style={{ color: "red", fontSize: 16, fontFamily: 'FuturaPT-Book', }}>{error}</Text>

        </View>
        <FormButton
          buttonTitle='Sign Up'

          onPress={() => handleRegister(username, email, password, confirmPassword, subscribed)}
        />
        {/* </View> */}
      </Animatable.View>
    </View>
  );
}

export default SignupScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  header: {
    flex: 1,
    // backgroundColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 0,
    paddingTop: 10
    // paddingBottom: 50
  },
  footer: {
    flex: 4,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 20,
    paddingLeft: 50,
    paddingRight: 50
  },
  text_header: {
    color: '#343A3F',
    //fontWeight: 'bold',
    fontSize: 40,
    fontFamily: 'FuturaPT-Demi'
  },
  text_subheader: {
    color: '#343a3f',
    // marginTop: 10,
    fontSize: 20,
    fontFamily: 'FuturaPT-Book'
  },
  text_linkheader: {
    color: '#747A21',
    // marginTop: 10,
    fontSize: 20,
    fontFamily: 'FuturaPT-Book'
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
    marginTop: 15,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5
  },
  actionError: {
    flexDirection: 'row',
    marginTop: 10,
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
    alignItems: 'center',
    marginTop: 5
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