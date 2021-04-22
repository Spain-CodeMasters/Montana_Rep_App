import React from 'react';
import 'react-native-gesture-handler';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import home from './assets/homeIcon.png'
import map from './assets/mapIcon.png'
import cal from './assets/upcomingIcon.png'
import { SafeAreaView } from 'react-native';

function Navigation({ navigation }) {
  return (
    <SafeAreaView>
      <View style={styles.navBar}>
        <TouchableOpacity style={{ alignSelf: 'center', margin: 25}} onPress={() => navigation.navigate('Home')}>
          <FontAwesome5
            name="home"
            solid
            color="#747A21"
            size={30}
          />
        </TouchableOpacity>
        <TouchableOpacity style={{ alignSelf: 'flex-end', margin: 5, }} onPress={() => navigation.navigate('Map')}>
          <View style={styles.circle}>
            <FontAwesome5
              name="map-marker-alt"
              solid
              color="white"
              size={40}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={{ alignSelf: 'center', margin: 25, marginLeft: 30 }} onPress={() => navigation.navigate('Schedule')}>
          <FontAwesome5
            name="calendar-alt"
            solid
            color="#747A21"
            size={30}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
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
    backgroundColor: 'rgba(255, 255, 255, 1)',

    // alignSelf: 'flex-end',
    position: 'absolute',
    width: '100%',
    maxHeight: 55,
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  circle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#747A21",
    padding: 10,
    alignItems: 'center',

  }
});

export default Navigation;