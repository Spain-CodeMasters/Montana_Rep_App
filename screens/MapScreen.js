import 'react-native-gesture-handler';
import React, { Component, useState, useEffect } from 'react';
import { Text, View, Image, StyleSheet, TouchableOpacity, Dimensions, PermissionsAndroid } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps';
import * as Animatable from 'react-native-animatable';
// import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
//tooltip
import Navigation from '../components/navigation/navigation';
import Cog from '../components/Cog';
// import Settings from '../components/Cog';
import PlayingBanner from '../components/playingBanner';

import Geolocation from 'react-native-geolocation-service';

import { db } from '../components/Firebase/firebase';

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

  const locationPermission = PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
  //const [devicePosition, setDevicePosition] = useState();
  const [deviceLatitude, setDeviceLatitude] = useState();
  const [deviceLongitude, setDeviceLongitude] = useState();

  const [contentData, setContentData] = useState(null);

  const [isLoading, setIsLoading] = useState(true);
  // const [dataLoaded, setDataLoaded] = useState(false);

  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: "Montana Repertory Theatre Location Permission",
          message:
            "We need access to your location " +
            "to use the community map",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("Location Permission Granted");
        currentPosition();
      } else {
        console.log("Location Permission Denied");
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const currentPosition = () => {
    if (locationPermission) {
      Geolocation.getCurrentPosition(
        (position) => {
          //setDevicePosition(position);
          setDeviceLatitude(position.coords.latitude);
          setDeviceLongitude(position.coords.longitude);
          setIsLoading(false);
          //console.log(position);
        },
        (error) => {
          // See error code charts below.
          console.log(error.code, error.message);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
      );
    } else {
      requestLocationPermission();
    }

  }

  useEffect(() => {
    currentPosition();
  }, [deviceLatitude, deviceLongitude, locationPermission])


  useEffect(() => {
    db.collection("content").orderBy("startDate", "desc").onSnapshot((snapshot) => {
      setContentData(snapshot.docs.map((doc) => ({ id: doc.id, content: doc.data() })));
      //console.log(playData.length);

    })
  }, []);



  return (
    <View style={{
      flex: 1,
      //paddingTop: safeAreaInsets.top,
      paddingBottom: safeAreaInsets.bottom,
      paddingLeft: safeAreaInsets.left,
      paddingRight: safeAreaInsets.right,
    }}>
      <Cog onPress={() => navigation.navigate('Settings')} />

      {!isLoading ? (
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}

          region={{
            latitude: deviceLatitude,
            longitude: deviceLongitude,
            latitudeDelta: 0.00220,
            longitudeDelta: 0.00220,
          }}
        >



          {(function () {

            if (contentData !== null) {

              const contents = contentData.map(({ id, content }) => content.geopoints.map((geopoint, pointId) => {
                if (geopoint.latitude !== '' && geopoint.longitude !== '') {
                  if (content.category == "goplay") {
                    //console.log(play);
                    return <Marker
                      key={pointId}
                      coordinate={{
                        latitude: geopoint.latitude * 1,
                        longitude: geopoint.longitude *1,
                      }}
                      image={require('../assets/GoPlay_PinGold.png')}
                    >
                      <Callout tooltip>
                        <View>
                          <View style={styles.bubble}>
                            <Text style={styles.name}>{content.playTitle}</Text>
                          </View>
                          <View style={styles.arrowBorder} />
                          <View style={styles.arrow} />
                        </View>
                      </Callout>
                    </Marker>
                  } else if (content.category == "mtrep") {
                    return <Marker
                      key={pointId}
                      coordinate={{
                        latitude: geopoint.latitude * 1,
                        longitude: geopoint.longitude *1,
                      }}
                      image={require('../assets/GoPlay_PinGreen.png')}
                    >
                      <Callout tooltip>
                        <View>
                          <View style={styles.bubble}>
                            <Text style={styles.name}>{content.eventTitle}</Text>
                          </View>
                          <View style={styles.arrowBorder} />
                          <View style={styles.arrow} />
                        </View>
                      </Callout>
                    </Marker>

                  } else {
                    return <Marker
                      key={pointId}
                      coordinate={{
                        latitude: geopoint.latitude * 1,
                        longitude: geopoint.longitude * 1,
                      }}
                      image={require('../assets/GoPlay_PinCopper.png')}
                    >
                      <Callout tooltip>
                        <View>
                          <View style={styles.bubble}>
                            <Text style={styles.name}>{content.eventTitle}</Text>
                          </View>
                          <View style={styles.arrowBorder} />
                          <View style={styles.arrow} />
                        </View>
                      </Callout>
                    </Marker>
                  }
                }
              }))

              return (
                <>
                  {contents}

                </>
              );
            }
            
          })()}

          
          {/* Device Location Marker */}
          <Marker
            coordinate={{
              latitude: deviceLatitude,
              longitude: deviceLongitude,
            }}
            image={require('../assets/map_marker.png')}
          >
          </Marker>
         

        </MapView>
      ) : (null)}
      {/* <Settings /> */}
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