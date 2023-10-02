import 'react-native-gesture-handler';
import * as React from 'react';
import {Text, View, Dimensions, StyleSheet, Image, TouchableOpacity, StatusBar} from 'react-native';
import * as Animatable from 'react-native-animatable';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';


const SplashScreen = ({navigation}) => {
    return (
      <View style={styles.container}>
            <StatusBar backgroundColor='#fff' barStyle="dark-content"/>
          <View style={styles.header}>
              <Animatable.Image
                animation="bounceIn"
                // duration="1500"
              source={require('../assets/logo.png')}
              style={styles.logo}
              resizeMode="stretch"
              />
          </View>
          <Animatable.View 
            style={styles.footer}
            animation="fadeInUpBig"
            >
              <Text style={styles.title}>Welcome!</Text>
              <Text style={styles.text}>Sign in with an account</Text>
              <View style={styles.button}>
              <TouchableOpacity onPress={()=>navigation.navigate('OnboardingScreen')}>
                  <View style={styles.signIn}>
                      <Text style={styles.textSign}>Get Started</Text>
                      <MaterialIcons
                        name="navigate-next"
                        color="#fff"
                        size={20}
                        />
                  </View>
              </TouchableOpacity>
              </View>
          </Animatable.View>
      </View>
    );
  };

  export default SplashScreen;

  const {height}= Dimensions.get("screen");

  const styles = StyleSheet.create({
    container: {
      flex: 1, 
      backgroundColor: '#fff'
    },
    header: {
        flex: 3,
        justifyContent: 'center',
        alignItems: 'center'
    },
    footer: {
        flex: 1,
        backgroundColor: '#747a21',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingVertical: 50,
        paddingHorizontal: 30,
        
    },
    
    logo: {
        width: 96,
        height: 200
    },
    title: {
        color: '#343A3F',
        fontSize: 40,
        fontWeight: 'bold'
    },
    text: {
        color: 'white',
        marginTop:5
    },
    button: {
        alignItems: 'flex-end',
        marginTop: 30
    },
    signIn: {
        backgroundColor: '#cc8a05',
        width: 150,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        flexDirection: 'row'
    },
    textSign: {
        color: 'white',
        fontWeight: 'bold'
    }
  });