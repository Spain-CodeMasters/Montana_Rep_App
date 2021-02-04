import React from 'react';
import 'react-native-gesture-handler';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';

import home from './assets/homeIcon.png'
import map from './assets/mapIcon.png'
import cal from './assets/upcomingIcon.png'

function Navigation ({navigation}) {
    return (
      <View style={styles.navBar}>
        <TouchableOpacity style={{ alignSelf: 'center', margin: 25, marginTop: 30, }} onPress={()=> navigation.navigate('HomeScreen')}>
          <Image  source={home} />
        </TouchableOpacity>
        <TouchableOpacity  style={{ alignSelf: 'flex-end', margin: 5, }} onPress={()=> navigation.navigate('MapScreen')}>
          <Image  source={map} />
        </TouchableOpacity>
        <TouchableOpacity style={{ alignSelf: 'center', margin: 25, marginTop: 30, }} onPress={()=> navigation.navigate('HomeScreen')}>
          <Image  source={cal} />
        </TouchableOpacity>
      </View>
    );
}

const styles = StyleSheet.create({
  navBar: {
    marginTop: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,

    elevation: 2,
    backgroundColor: 'rgba(255, 255, 255, .8)',
    
    // alignSelf: 'flex-end',
    position: 'absolute',
    width: '100%',
    maxHeight: 55,
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Navigation;