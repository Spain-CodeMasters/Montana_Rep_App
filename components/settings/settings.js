import React, { useState, useContext, useRef } from "react";
import 'react-native-gesture-handler';
import { AuthContext } from '../../navigation/AuthProvider';
import { SafeAreaView, StyleSheet, ScrollView, View, Text, StatusBar, Switch, Image, TouchableOpacity,} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {windowHeight, windowWidth} from '../utils/Dimensions';
import Feather from 'react-native-vector-icons/Feather';

import gear from './assets/gear.png'
import FormButton from '../Forms/FormButton';

export default function Settings({navigation}) {
  const [show, setShow] = useState(false)
  const { user, logout } = useContext(AuthContext);

  return (
    <View style={styles.settings}>
      {
        show ? <Animatable.View
        animation = "fadeInDownBig"
        style={styles.settingsOpen}
        >
          <View style={styles.container}>
          <Text style={styles.header_text}>Settings</Text>


         <View>
          <TouchableOpacity  onPress={()=> navigation.navigate('Account')}>
              <Text style={styles.subtext}><Feather name= "user" size= {20} color= '#747A21'  />  Account</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.horizontal_rule} />
         <View>
          <TouchableOpacity  onPress={() => logout()}>
              <Text style={styles.subtext}><Feather name= "bell" size= {20} color= '#747A21'  />  Notifications</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.horizontal_rule} />
         <View>
          <TouchableOpacity  onPress={() => logout()}>
              <Text style={styles.subtext}><Feather name= "lock" size= {20} color= '#747A21'  />  Privacy & Security</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.horizontal_rule} />
         <View>
          <TouchableOpacity  onPress={() => logout()}>
              <Text style={styles.subtext}><Feather name= "help-circle" size= {20} color= '#747A21'  />  About</Text>
          </TouchableOpacity>
        </View>
          <View style={styles.horizontal_rule} />
         <View>
          <TouchableOpacity  onPress={() => logout()}>
              <Text style={styles.subtext}><Feather name= "log-out" size= {20} color= 'red'  />  Logout</Text>
          </TouchableOpacity>
        </View>

          <Text style={{marginTop: 50}}>Version 0.1.0</Text>


          </View>

        

          {/* <Image style={{ margin: 15, }} source={gear} /> */}
        </Animatable.View> : null
      }
    
      <TouchableOpacity style={{ height: 50 }} onPress={() => { setShow(!show) }}>
        <Image style={{ margin: 15, }} source={gear} />
      </TouchableOpacity>

    </View>

  );

}

function settings() {
  console.log("test");
}



const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: '#fff',
    padding: 30,
  },
  
  header_text: {
    fontSize: 24, 
    fontFamily: 'FuturaPTDemi',
    textAlign: 'center',
    color: '#343A3F',
    marginBottom: 50,
  },

  horizontal_rule: {
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
    marginBottom: 30,
    marginTop: 30
  },
  settings: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: '100%',
    flexDirection: 'row-reverse',
  },
  settingsOpen: {
    position: 'absolute',
    top: 0,
    width: windowWidth,
    height: windowHeight,
    // flexDirection: 'column',
    // justifyContent: 'flex-end',
    // alignItems: 'center',
    // backgroundColor: 'white',
    // paddingBottom: 80,
  },
  subtext: {
    fontSize: 18,
    fontFamily: 'FuturaPTBook',
    // paddingHorizontal: 40,
    // marginTop: 20,
    // //marginBottom: 10,
    // lineHeight: 20
  },
});

//export default Settings;