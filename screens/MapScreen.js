import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { Text, View, Image, Button, StyleSheet, TouchableOpacity, Dimensions, Platform, TextInput, StatusBar } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps';
import * as Animatable from 'react-native-animatable';
// import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
//tooltip
import Navigation from '../components/navigation/navigation';
import Settings from '../components/settings/settings';
import PlayingBanner from '../components/playingBanner';

// onMarkerRecieved = (marker) => {
//   this.setState(prevState => ({
//     marker: prevState.marker = marker
//   }));
// }



// const {width, height} = Dimensions.get('screen');

// const ITEM_WIDTH = width;
// const ITEM_HEIGHT = height;

export default ({ navigation }) => {

  const safeAreaInsets = useSafeAreaInsets()
  return (
    <View style={{
      flex: 1,
      //paddingTop: safeAreaInsets.top,
      paddingBottom: safeAreaInsets.bottom,
      paddingLeft: safeAreaInsets.left,
      paddingRight: safeAreaInsets.right,
    }}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}

        region={{
          latitude: 46.87215,
          longitude: -113.994,
          latitudeDelta: 0.00922,
          longitudeDelta: 0.00921,
        }}
      >
        <Marker
          // coordinate={marker.coordinate}
          // title={marker.title}
          // description={marker.description}>
          coordinate={{
            latitude: 46.86006,
            longitude: -113.98523,
          }}
          image={require('../assets/map_marker.png')}
        // title="Test Title"
        // description= "This is the test description"
        >
          <Callout tooltip>
            <View>
              <View style={styles.bubble}>
                <Text style={styles.name}>Child's Play</Text>
                <Text style={styles.nameDescription}> A Short description</Text>
                {/* <Image
                  style={styles.image}
                  source={require('../assets/logo.png')}
                  /> */}
              </View>
              <View style={styles.arrowBorder} />
              <View style={styles.arrow} />
            </View>
          </Callout>
        </Marker>
      </MapView>
      <Settings />
      <Navigation navigation={navigation} />
    </View>
  );
};

//export default MapScreen;

const styles = StyleSheet.create({
  map: {
    height: '100%'
  },
  container: {
    flex: 1,
  },
  bubble: {
    elevation: 2,
    flexDirection: 'row',
    alignSelf: 'flex-start',
    backgroundColor: '#fff',
    borderRadius: 5,
    borderColor: '#ccc',
    shadowColor: '#000',
    shadowRadius: 5,
    shadowOpacity: 0.3,
    shadowOffset: { x: 2, y: -2 },
    paddingHorizontal: 20,
    marginHorizontal: 10,
    height: 35,
    shadowColor: '#ccc',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10,
  },
  name: {
    fontSize: 18,
    marginBottom: 5,
    fontFamily: 'FuturaPTBook',
    flexDirection: 'row'
  },
  nameDescription: {
    fontSize: 18,
    marginBottom: 5,
    fontFamily: 'FuturaPTBook',
    flexDirection: 'row'
  },
  arrow: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderTopColor: '#FFF',
    borderWidth: 16,
    alignSelf: 'center',
    marginTop: -32

  },
  arrowBorder: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderTopColor: '#007a87',
    borderWidth: 16,
    alignSelf: 'center',
    marginTop: -0.5
  },
  image: {
    flex: 3,
    // alignSelf: 'center',
    width: 120,
    height: 80,
  }

});


{/* <View style={{ flex: 1 }}>
                    <MapView 
                        provider={PROVIDER_GOOGLE} 
                        mapType='hybrid'   
                        showsUserLocation style={{flex: 1}}>
                    {this.state.marker.map(item     => (
                    <MapView.Marker        
                        coordinate={{latitude: item.geopoint.latitude,                         
                        longitude: item.geopoint.longitude}}
                        title={("Test")}
                        description={("Test")} 
                    /> 
                    )}
                    </MapView> */}