import 'react-native-gesture-handler';
import * as React from 'react';
import {Text, View, Button, KeyboardAvoidingView, StyleSheet, TouchableOpacity, Dimensions, Platform, TextInput, StatusBar, Keyboard, TouchableWithoutFeedback} from 'react-native';
import * as Animatable from 'react-native-animatable';

import Feather from 'react-native-vector-icons/Feather';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';



const SignInScreen = ({navigation}) => {

    const [data, setData] = React.useState({
      email: '',
      password: '',
      check_textInputChange: false,
      secureTextEntry: true,
      isValidEmail: true, 
      isValidPassword: true,

    });

    const textInputChange = (val) => {
      if( val.trim().length >= 4) {
        setData({
          ...data,
          email: val, 
          check_textInputChange: true,
          isValidEmail: true
        });
      } else {
        setData({
          ...data,
          email: val, 
          check_textInputChange: false,
          isValidEmail: false
        });
      }
    }

    const handlePasswordChange = (val) => {
      if( val.trim().length >= 8) {
      setData({
        ...data, 
        password: val,
        isValidPassword: true
      });
    } else {
      setData({
        ...data, 
        password: val,
        isValidPassword: false
      });

    }
    }

    const updateSecureTextEntry = () => {
      setData({
        ...data, 
        secureTextEntry: !data.secureTextEntry
      });
    }

    const handleValidEmail = (val) => {
        if( val.trim().length >= 4) {
          setData({
            ...data, 
            isValidEmail: true
          });

        } else {
          setData({
            ...data, 
            isValidEmail: false
          });
        }
    }

    const loginHandle = (email, password) => {
      signIn(email, password);
    }

    return (
      <KeyboardAwareScrollView
      style={{ backgroundColor: 'blue' }}
      resetScrollToCoords={{ x: 0, y: 0 }}
      contentContainerStyle={styles.container}
      scrollEnabled={false}
    >
      {/* <View style={styles.container}> */}
      
          <StatusBar backgroundColor='#fff' barStyle="dark-content"/>
        <View style={styles.header}>
          <Text style={styles.text_header}>Sign In</Text>
          <View>
          <View style={{display: "flex", flexDirection: "row", flex: 1, flexwrap: 'wrap', margin: 15}}>
            <Text style={styles.text_subheader}>New User? </Text>  
              <TouchableOpacity onPress={()=> navigation.navigate('SignUpScreen')}>
                  <Text style={styles.text_linkheader}> 
                    Create an account
                  </Text>
              </TouchableOpacity>
          </View>
          </View>
        </View>
        <Animatable.View 
          animation="fadeInUpBig"
          style={styles.footer}>
          <View style={styles.action}>
            <TextInput
              placeholder= "Email"
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={(val)=>textInputChange(val)}
              onEndEditing={(e)=> handleValidEmail(e.nativeEvent.text)}
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

          {data.isValidEmail ? null :
          <Animatable.View animation = "fadeInLeft" duration={500}>
          <Text style={styles.errorMsg}>Email must be 4 characters long.</Text>
          </Animatable.View>
          }

          <View style={[styles.action, {
            marginTop: 20
          }]}>
            <TextInput
              placeholder= "Password"
              secureTextEntry={data.secureTextEntry ? true : false}
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={(val)=>handlePasswordChange(val)}
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

          {data.isValidPassword ? null :
          <Animatable.View animation = "fadeInLeft" duration={500}>
          <Text style={styles.errorMsg}>Password must be 8 characters long.</Text>
          </Animatable.View>
          }

            <TouchableOpacity>
                <Text style={{color: '#009387', marginTop:15}}>Forgot password?</Text>
            </TouchableOpacity>

          <View style={styles.button}>
            <TouchableOpacity
              style={styles.signIn}
              // onPress={(alert)=}
            >
              <Text style={[styles.textSign,
                {color:'#fff'
                }]}>Sign In</Text>

            </TouchableOpacity>

          </View>

          
        </Animatable.View>
        
      </KeyboardAwareScrollView>
    );
  };


  export default SignInScreen;

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
        paddingTop: 125,
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
        marginTop: 10,
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