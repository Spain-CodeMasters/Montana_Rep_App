import 'react-native-gesture-handler';
import React, { Component } from 'react';
import {Text, View, Button, StyleSheet, TouchableOpacity, Dimensions, Platform, TextInput, StatusBar} from 'react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import * as Animatable from 'react-native-animatable';
// import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';

//tooltip
import Navigation from '../components/navigation/navigation';
import Settings from '../components/settings/settings';
import PlayingBanner from '../components/playingBanner';

const {width, height} = Dimensions.get('screen');

const ITEM_WIDTH = width;
const ITEM_HEIGHT = height;
const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    height: ITEM_HEIGHT,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    height: ITEM_HEIGHT
  }

});
export default class MapScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {

    };
  }
  render(){
    return(
      <View styles= {styles.container}>
        {/* <Navigation /> */}
        <StatusBar hidden/>
        {/* <PlayingBanner/> */}
        
       
        z
        <MapView
        provider = {PROVIDER_GOOGLE}
        style= {styles.map}
        region={{
          latitude: 37.78825,
          longitude: -122.4324,
           latitudeDelta: 0.0922,
           longitudeDelta: 0.0421,
        }}
        >
        </MapView>
        <Settings />
        {/* <Navigation /> */}
      </View>
    );
  }
}


