import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, StatusBar, TouchableOpacity } from 'react-native';
import FormButton from '../components/Forms/FormButton';
import FormInput from '../components/FormInput';
import * as Animatable from 'react-native-animatable';
import { AuthContext } from '../navigation/AuthProvider';
import { NavigationEvents } from 'react-navigation';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { db } from '../components/Firebase/firebase';


const SignupScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [subscribed, setSubscribed] = useState(true);
  const { register } = useContext(AuthContext);
  const safeAreaInsets = useSafeAreaInsets();

  const handleChecked = ({target}) => {
    setSubscribed(target.subscribed);
  }

 const handleUpload = ()=> {
   db.collection("users").add({
    // createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    name: username,
    email: email,
    isAdmin: false,
    isPremium: false,
    isSubscribed: subscribed,
    isSponsorBasic: false,
    isSponsorPremium: false,
  });
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
          <StatusBar backgroundColor='#fff' barStyle="dark-content"/>
        <View style={styles.header}>
          
          <Text style={styles.text_header}>Sign Up</Text>
          <View style={{display: "flex", flexDirection: "row", flex: 1, flexwrap: 'wrap', margin: 10}}>
            <Text style={styles.text_subheader}>Have an account? </Text>  
              <TouchableOpacity onPress={()=> navigation.navigate('Login')}>
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
        onChangeText={(setUserName) => setUsername(setUserName)}
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
        autoCorrect={false}
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
        {/* <BouncyCheckbox status={subscribed ? 'subscribed' : 'unsubscribed'} onPress={() => setSubscribed(!subscribed)} /><Text>Subscribe to our Newsletter</Text> */}
      </View>

      {/* subscribe */}
      <Text>By signing up you are over the age of 13 and you agree to our Terms & Conditions</Text>
      <FormButton
        buttonTitle='Sign Up'
        onPress={handleUpload}
        onPress={() => register(email, password)}
        
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
      fontWeight: 'bold',
      fontSize: 40, 
      fontFamily: 'FuturaPTDemi'
  },
  text_subheader: {
      color: '#343a3f',
      // marginTop: 10,
      fontSize: 20,
      fontFamily: 'FuturaPTBook'
  },
  text_linkheader: {
      color: '#747A21',
      // marginTop: 10,
      fontSize: 20,
      fontFamily: 'FuturaPTBook'
  },
  text_footer: {
      color: '#05375a',
      fontSize: 18
  },
  action: {
      flexDirection: 'row',
      marginTop: 15,
      borderBottomWidth: 1,
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