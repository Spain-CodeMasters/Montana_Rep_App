import React, { useState, useContext } from "react";
import { AuthContext } from '../../navigation/AuthProvider';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Switch,
  Image,
  TouchableOpacity,
} from 'react-native';

import gear from './assets/gear.png'
import FormButton from '../Forms/FormButton';

export default function Settings() {
  const [show, setShow] = useState(false)
  const { user, logout } = useContext(AuthContext);

  return (
    <View style={styles.settings}>
      {
        show ? <View style={styles.settingsOpen}>

          <Text style={styles.subText}>User ID: {user.uid}</Text>
          <FormButton buttonTitle='Sign Out' onPress={() => logout()} />

          {/* <Image style={{ margin: 15, }} source={gear} /> */}
        </View> : null
      }
      <TouchableOpacity style={{ height: 50 }} onPress={() => { setShow(!show) }}>
        <Image style={{ margin: 15, }} source={gear} />
      </TouchableOpacity>

      {/* <DrawerItem 
                    icon={({color, size}) => (
                        <Icon 
                        name="exit-to-app" 
                        color={color}
                        size={size}
                        />
                    )}
                    label="Sign Out"
                    onPress={() => {signOut()}}
                /> */}
    </View>

  );

}

function settings() {
  console.log("test");
}



const styles = StyleSheet.create({
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
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingBottom: 80,
  },
  subtext: {
    fontSize: 16,
    fontFamily: 'FuturaPTBook',
    paddingHorizontal: 40,
    marginTop: 20,
    //marginBottom: 10,
    lineHeight: 20
  },
});

//export default Settings;