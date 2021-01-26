import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image,
  TouchableOpacity,
} from 'react-native';

import home from './assets/homeIcon.png'
import map from './assets/mapIcon.png'
import cal from './assets/upcomingIcon.png'

class Navigation extends React.Component {

  render() {
    return (
      <View style={styles.navBar}>
        <TouchableOpacity style={{ alignSelf: 'center', margin: 25, marginTop: 30, }}>
          <Image  source={home} />
        </TouchableOpacity>
        <TouchableOpacity style={{ alignSelf: 'flex-end', margin: 5, }}>
          <Image  source={map} />
        </TouchableOpacity>
        <TouchableOpacity style={{ alignSelf: 'center', margin: 25, marginTop: 30, }}>
          <Image  source={cal} />
        </TouchableOpacity>
      </View>
    );
  }
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