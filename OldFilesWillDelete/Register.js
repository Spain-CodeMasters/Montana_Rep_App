import 'react-native-gesture-handler';
import React, {useContext, useState, Component} from 'react';
import {Text, View, Button, StyleSheet, TouchableOpacity, Dimensions, Platform, TextInput, StatusBar} from 'react-native';
import * as Animatable from 'react-native-animatable';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import { CheckBox } from 'react-native-elements'
import {AuthContext} from '../navigation/AuthProvider';

import auth from '@react-native-firebase/auth';
import { Alert } from 'react-native';


const SignUpScreen = ({navigation}) => {
  // const [name, setName] = useState();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fetching, setFetching] = useState(false);
  const [error, setError] = useState("");
  const [isValid, setValid] = useState(true);
  // const [confirmPassword, setConfirmPassword] = useState()

  const __doSignUp = () => {
    setError("Email required *")
    setValid(false)
    return
  } else if {(!password && password.trim() && password.length > 6); {
    setError("Weak password, minimum 5 characters")
    setValid(false)
    return
  }
    __doCreateUser(email, password)
};

  const __doCreateUser = async (email, password) => {
    try {
      let response = await auth().createUserWithEmailAndPassword(
        email, 
        password
      )
      if (response && response.user) {
        Alert.alert("Success ✅", "Account created successfully")
      }
    } catch (e) {
      console.error(e.message)
    }
  }


  // const {register} = useContext(AuthContext);

    const [data, setData] = React.useState({
      name: '',
      email: '',
      password: '',
      confirm_password: '',
      check_textInputChange: false,
      secureTextEntry: true,
      confirm_secureTextEntry: true

    });

    const textInputChange = (val) => {
      if( val.length !== 0) {
        setData({
          ...data,
          email: val, 
          check_textInputChange: true
        });
      } else {
        setData({
          ...data,
          email: val, 
          check_textInputChange: false
        });
      }
    }

    const handlePasswordChange = (val) => {
      setData({
        ...data, 
        password: val
      });
    }

    const handleConfirmPasswordChange = (val) => {
      setData({
        ...data, 
        confirm_password: val
      });
    }

    const updateSecureTextEntry = () => {
      setData({
        ...data, 
        secureTextEntry: !data.secureTextEntry
      });
    }

    const updateConfirmSecureTextEntry = () => {
      setData({
        ...data, 
        confirm_secureTextEntry: !data.confirm_secureTextEntry
      });
    }

    return (
      <View style={styles.container}>
        <View style={{ flex: 0.2 }}>
        {!!fetching && <ActivityIndicator color={blue} />}
      </View>
          <StatusBar backgroundColor='#fff' barStyle="dark-content"/>
        <View style={styles.header}>
          
          <Text style={styles.text_header}>Sign Up</Text>
          <View style={{display: "flex", flexDirection: "row", flex: 1, flexwrap: 'wrap', margin: 10}}>
            <Text style={styles.text_subheader}>Have an account? </Text>  
              <TouchableOpacity onPress={()=> navigation.goBack()}>
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

            <TextInput
              labelValue={name}
              placeholder= "Name"
              onChangeText={(userName)=> setName(userName)}
              style={styles.textInput}
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={(val)=>textInputChange(val)}
              />
              {data.check_textInputChange ?
            <Animatable.View
                animation="bounceIn"
            >
            <Feather
              name="check-circle"
              color="green"
              size={20}
            />
            </Animatable.View>
            : null}
          </View>

          <View style={styles.action}>
            <TextInput
              label={"Email"}
              onChangeText={(userEmail)=> setEmail(userEmail)}
              placeholder= "Email"
              style={styles.textInput}
              keyboardType="email-address"
              autoCapitalize={false}
              autoCorrect={false}
              onChangeText={text => {
                setError
                setEmail(text)
              }}
              error={isValid}
              />
              {/* {data.check_textInputChange ?
            <Animatable.View
                animation="bounceIn"
            >
            <Feather
              name="check-circle"
              color="green"
              size={20}
            />
            </Animatable.View>
            : null} */}
          </View>
          <View style={[styles.action, {
            marginTop: 20
          }]}>
            <TextInput
              label={"Password"}
              // onChangeText={(userPassword) => setPassword(userPassword)}
              onChangeText={text => setPassword(text)}
              placeholder= "Password"
              secureTextEntry={data.secureTextEntry ? true : false}
              style={styles.textInput}
              autoCapitalize={"false"}
              error={isValid}
              // onChangeText={(val)=>handlePasswordChange(val)}
            />
            <TouchableOpacity
              onPress={updateSecureTextEntry}
            >
              {data.secureTextEntry ? 
                <Feather
                  name="eye-off"
                  color="grey"
                  size={20}
                />
                :
                <Feather
                  name="eye"
                  color="grey"
                  size={20}
                />
              }
            </TouchableOpacity>
          </View>

          {error ? (
        <View style={styles.errorLabelContainerStyle}>
          <Text style={styles.errorTextStyle}>{error}</Text>
        </View>
      ) : null}
      <View style={styles.signInButtonContainerStyle}>
        <TouchableHighlight
          style={styles.signInButtonStyle}
          onPress={__doSignUp}
          underlayColor={blue}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
            }}
          >
            <Text style={styles.signInButtonTextStyle}>Continue</Text>
          </View>
        </TouchableHighlight>
      </View>

          <View style={[styles.action, {
            marginTop: 20
          }]}>
            <TextInput
              labelValue={confirmPassword}
              onChangeText={(userPassword)=> setPassword(userPassword)}
              placeholder= "Confirm Password"
              secureTextEntry={data.confirm_secureTextEntry ? true : false}
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={(val)=>handleConfirmPasswordChange(val)}
            />
            <TouchableOpacity
              onPress={updateConfirmSecureTextEntry}
            >
              {data.secureTextEntry ? 
                <Feather
                  name="eye-off"
                  color="grey"
                  size={20}
                />
                :
                <Feather
                  name="eye"
                  color="grey"
                  size={20}
                />
              }
            </TouchableOpacity>
          </View>
          
          {/* <CheckBox
            title='Subscribe to our Newsletter'
            // checked={this.state.checked}
          /> */}

          {/* <View>
            <Text>By registering, you confirm that you accept our Terms of service and Privacy Policy</Text>
          </View>

          <View style={styles.button}>
            <TouchableOpacity
              onPress={()=> register(email, password)}
              style={styles.signIn}
            >
              <Text style={[styles.textSign,
                {color:'#fff'
                }]}>Sign Up</Text>

            </TouchableOpacity>

          </View> */}

          
        </Animatable.View>
      </View>
    );
  };


  export default SignUpScreen;
  const {height}= Dimensions.get("screen");
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
        fontSize: 40
    },
    text_subheader: {
        color: '#343a3f',
        // marginTop: 10,
        fontSize: 20
    },
    text_linkheader: {
        color: '#747A21',
        // marginTop: 10,
        fontSize: 20
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

