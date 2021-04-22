import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { Text, View, Image, StyleSheet, TouchableOpacity, Dimensions, PermissionsAndroid, } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker, Callout, Animated, AnimatedRegion } from 'react-native-maps';
import * as Animatable from 'react-native-animatable';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Navigation from '../components/navigation/navigation';
import Cog from '../components/Cog';
import PlayingBanner from '../components/playingBanner';
import Geolocation from 'react-native-geolocation-service';
import * as geolib from 'geolib';
import { useFocusEffect } from '@react-navigation/native';

import { db } from '../components/Firebase/firebase';


export default ({ navigation }) => {

  const safeAreaInsets = useSafeAreaInsets();

  const locationPermission = PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
  const [currentPosition, setCurrentPosition] = useState();
  const [contentData, setContentData] = useState(null);

  const [isLoading, setIsLoading] = useState(true);

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
      } else {
        console.log("Location Permission Denied");
      }
    } catch (err) {
      console.warn(err);
    }
  };

  function getCurrentLocation() {
    Geolocation.getCurrentPosition(
      (position) => {
        setCurrentPosition(position.coords);
        setIsLoading(false);
      },
      (error) => {
        console.log(error.code, error.message);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  }

  useFocusEffect(
    React.useCallback(() => {
      if (locationPermission) {
        getCurrentLocation();

        const interval = setInterval(() => {
          getCurrentLocation();
          //console.log('This will run every 5 seconds');
        }, 5000);
        
        return () => clearInterval(interval);

      } else {
        requestLocationPermission();
      }
    }, [])
  );


  useEffect(() => {
    db.collection("content").onSnapshot((snapshot) => {
      setContentData(snapshot.docs.map((doc) => ({ id: doc.id, content: doc.data() })));

    })
  }, []);


  function selectPlay(id, pointId) {
    navigation.navigate('Play', {
      id: id,
      pointId: pointId,
    });
  }

  function selectEvent(id, pointId) {
    navigation.navigate('Event', {
      id: id,
      pointId: pointId,
    });
  }

  function selectSponsor(id, pointId) {
    navigation.navigate('Sponsor', {
      id: id,
      pointId: pointId,
    });
  }

  const Markers = () => {

    if (contentData !== null) {

      var contents = contentData.map(({ id, content }) => content.geopoints.map((geopoints, pointId) => {
        if (geopoints.latitude !== '' && geopoints.longitude !== '') {

          if (content.type == "easterEgg") {
            var distance = (geolib.getDistance(currentPosition, geopoints));

            if (distance < 10) {
              return <Marker
                key={pointId}
                coordinate={{
                  latitude: geopoints.latitude * 1,
                  longitude: geopoints.longitude * 1,
                }}
                image={require('../assets/GoPlay_PinGold.png')}
                onPress={e => selectPlay(id, pointId)}
              >
                <Callout tooltip>
                  <View>
                    <View style={styles.bubble}>
                      <Text style={styles.name}>{content.title}</Text>
                    </View>
                    <View style={styles.arrowBorder} />
                    <View style={styles.arrow} />
                  </View>
                </Callout>
              </Marker>

            }

          } else if (content.type == "play") {
            return <Marker
              key={pointId}
              coordinate={{
                latitude: geopoints.latitude * 1,
                longitude: geopoints.longitude * 1,
              }}
              image={require('../assets/GoPlay_PinGold.png')}
              onPress={e => selectPlay(id, pointId)}
            >
              <Callout tooltip>
                <View>
                  <View style={styles.bubble}>
                    <Text style={styles.name}>{content.title}</Text>
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
                latitude: geopoints.latitude * 1,
                longitude: geopoints.longitude * 1,
              }}
              image={require('../assets/GoPlay_PinGreen.png')}
              onPress={e => selectEvent(id, pointId)}
            >
              <Callout tooltip>
                <View>
                  <View style={styles.bubble}>
                    <Text style={styles.name}>{content.title}</Text>
                  </View>
                  <View style={styles.arrowBorder} />
                  <View style={styles.arrow} />
                </View>
              </Callout>
            </Marker>

          } else if (content.type == "sponsor") {
            return <Marker
              key={pointId}
              coordinate={{
                latitude: geopoints.latitude * 1,
                longitude: geopoints.longitude * 1,
              }}
              image={require('../assets/GoPlay_PinCopper.png')}
              onPress={e => selectSponsor(id, pointId)}
            >
              <Callout tooltip>
                <View>
                  <View style={styles.bubble}>
                    <Text style={styles.name}>{content.title}</Text>
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
                latitude: geopoints.latitude * 1,
                longitude: geopoints.longitude * 1,
              }}
              image={require('../assets/GoPlay_PinCopper.png')}
              onPress={e => selectEvent(id, pointId)}
            >
              <Callout tooltip>
                <View>
                  <View style={styles.bubble}>
                    <Text style={styles.name}>{content.title}</Text>
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
  }


  return (
    <View style={{
      flex: 1,
      paddingBottom: safeAreaInsets.bottom,
      paddingLeft: safeAreaInsets.left,
      paddingRight: safeAreaInsets.right,
    }}>
      <Cog onPress={() => navigation.navigate('Settings')} />

      {!isLoading ? (
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          showsUserLocation={true}
          followsUserLocation={true}

          region={{
            latitude: currentPosition.latitude,
            longitude: currentPosition.longitude,
            latitudeDelta: 0.00220,
            longitudeDelta: 0.00220,
          }}
        >

          <Markers />

          {/* Device Location Marker
          <Marker.Animated
            coordinate={{
              latitude: deviceLatitude,
              longitude: deviceLongitude,
            }}
            image={require('../assets/map_marker.png')}
          /> */}


        </MapView>
      ) : (null)}

      <Navigation navigation={navigation} />
    </View>
  );
};


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
    width: 120,
    height: 80,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: -100,
  },
  modalView: {
    margin: 0,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 40,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: 300,
    height: 550,
  },

});

