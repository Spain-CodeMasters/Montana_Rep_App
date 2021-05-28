import 'react-native-gesture-handler';
import React, { useState, useRef, useEffect } from 'react';
import { PERMISSIONS, RESULTS, check, request } from 'react-native-permissions';
import { Text, View, Image, StyleSheet, TouchableOpacity, Dimensions, PermissionsAndroid, Platform, Pressable, Alert } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker, Callout, Animated, AnimatedRegion, MapViewAnimated, Camera } from 'react-native-maps';
import * as Animatable from 'react-native-animatable';
import Cog from '../components/Cog';
import PlayingBanner from '../components/playingBanner';
import Geolocation from 'react-native-geolocation-service';
import * as geolib from 'geolib';
import { useFocusEffect } from '@react-navigation/native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';



import { db } from '../components/Firebase/firebase';
import { greaterThan } from 'react-native-reanimated';

let val;
let pitchVal;
let Markers;
export default ({ navigation }) => {
  const _map = useRef(null);
  const [locationPermission, setLocationPermission] = useState(false);
  // const iosLocationPermission = 
  const [currentPosition, setCurrentPosition] = useState({});
  const [currentRegion, setCurrentRegion] = useState();
  const [contentData, setContentData] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  //const [showsUserLocation, setShowsUserLocation] = useState(true);
  const [followsUserLocation, setFollowsUserLocation] = useState(true);
  const [mapWidth, setMapWidth] = useState('99%')
  //const [mapRegion, setMapRegion] = useState()

  //Update map styling to force a re-render to make sure the geolocation button appears
  const updateMapStyle = () => {
    setMapWidth('100%')
  }



  useEffect(() => {
    val = true;

  }, []);


  function setTrue() {
    val = true;
    pitchVal = 0;

  }
  function setFalse() {
    val = false;
  }

  function toggleChangeView() {
    pitchVal = 45;
  }

  /*   let mapRegion;
  
    if(followsUserLocation==true){
      mapRegion = {
        latitude: currentPosition.latitude,
        longitude: currentPosition.longitude,
        latitudeDelta: 0.00120,
        longitudeDelta: 0.00120,
    
      }} */


  // let statusBarHeight= "1 px";

  // useEffect(() => {
  //   if(_map.current) {
  //     _map.current.animateCamera(
  //       {
  //         center: {
  //           latitude: 50.1109221,
  //           longitude: 8.6821267
  //         },
  //         zoom: 15
  //       },
  //       5000
  //     );
  //   }
  // }, []);

  useEffect(() => {
    //requestLocationPermission();
    if (Platform.OS === "android") {
      checkPermissions(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
    } else if (Platform.OS === "ios") {
      checkPermissions(PERMISSIONS.IOS.LOCATION_ALWAYS);
    };
  }, []);

  useEffect(() => {
    db.collection("content").onSnapshot((snapshot) => {
      if (snapshot == null) {
        return null;
      } else {
        setContentData(snapshot.docs.map((doc) => ({ id: doc.id, content: doc.data() })));
      }

    })
  }, []);

  function checkPermissions(type) {
    check(type)
      .then((result) => {
        switch (result) {
          case RESULTS.UNAVAILABLE:
            console.log('This feature is not available (on this device / in this context)');
            break;
          case RESULTS.DENIED:
            if (Platform.OS === "android") {

              Alert.alert(
                "Montana Repertory Theatre Location Permission",
                "This app collects location data to " +
                "display your location on the map, & enable nearby audio/video content " +
                "even when the app is closed or not in use."
                ,
                [
                  {
                    text: "Continue", onPress: () => request(type,
                      {
                        title: "Enable Location Permission?",
                        message:
                          "This app collects location data to " +
                          "display your location on the map, & enable nearby audio/video content " +
                          "even when the app is closed or not in use."
                        ,
                        buttonNeutral: "Ask Me Later",
                        buttonNegative: "Cancel",
                        buttonPositive: "OK"
                      })
                      .then((result) => {
                        switch (result) {
                          case RESULTS.GRANTED:
                            setLocationPermission(true);
                            console.log('The permission is granted');
                            break;
                          case RESULTS.BLOCKED:
                            console.log('The permission is denied and not requestable anymore');
                            break;
                        }
                      })
                  }
                ]
              );
            } else {
              const requestPermission = request(type,
                {
                  title: "Montana Repertory Theatre Location Permission",
                  message:
                    "This app collects location data to enable" +
                    "the display your location on the map, & nearby audio/video content " +
                    "even when the app is closed or not in use."
                  ,
                  buttonNeutral: "Ask Me Later",
                  buttonNegative: "Cancel",
                  buttonPositive: "OK"
                })
                .then((result) => {
                  switch (result) {
                    case RESULTS.GRANTED:
                      setLocationPermission(true);
                      console.log('The permission is granted');
                      break;
                    case RESULTS.BLOCKED:
                      console.log('The permission is denied and not requestable anymore');
                      break;
                  }
                });
            }

            console.log('The permission has not been requested / is denied but requestable');
            break;
          case RESULTS.LIMITED:
            setLocationPermission(true);
            console.log('The permission is limited: some actions are possible');
            break;
          case RESULTS.GRANTED:
            setLocationPermission(true);
            console.log('The permission is granted');
            break;
          case RESULTS.BLOCKED:
            console.log('The permission is denied and not requestable anymore');
            break;
        }
      })
      .catch((error) => {
        // …
      });
  }

  function getCurrentLocation() {
    Geolocation.getCurrentPosition(
      (position) => {
        setCurrentPosition(position.coords);
        //setIsLoading(false);
        //console.log(position)
      },
      (error) => {
        console.log(error.code, error.message);
      },
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  }

  useEffect(() => {
    //React.useCallback(() => {
    if (locationPermission) {
      getCurrentLocation();

      const interval = setInterval(() => {
        getCurrentLocation();

        //console.log('This will run every second');
      }, 5000);

      return () => clearInterval(interval);

    }
    //}, [])
  }, [locationPermission]);

  renderTheCamera();


  function renderTheCamera() {
    try {
      if (val) {

        if (_map.current) {
          const newCamera = {
            center: {
              latitude: currentPosition.latitude,
              longitude: currentPosition.longitude,
            },
            pitch: pitchVal,
            //heading: currentPosition.heading,
            heading: 0,

            // Only when using Google Maps.
            zoom: 20
          }

          _map.current.animateCamera(newCamera, { duration: 1000 })
        }
      }
    } catch {
      console.log('he aint rendered yet')
    }

  }



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

  function onRegionChange(region) {
    setCurrentRegion(region);
  }

  renderMarkers();

  function renderMarkers() {

    Markers = () => {

      if (contentData !== null) {
        try {
          var contents = contentData.map(({ id, content }) => content.geopoints.map((geopoints, pointId) => {

            if (geopoints.latitude !== "" || geopoints.longitude !== "" && content.publish && new Date < content.end.toDate()) {

              if (content.type == "easterEgg") {
                var distance = (geolib.getDistance(currentPosition, geopoints));
                let reveal;
                if (distance < 30) {
                  reveal = true;
                }

                if (reveal) {
                  return <Marker.Animated
                    key={pointId}
                    coordinate={{
                      latitude: geopoints.latitude * 1,
                      longitude: geopoints.longitude * 1,
                    }}
                    image={require('../assets/GoPlay_PinGift.png')}
                    onPress={e => selectPlay(id, pointId)}
                    tracksViewChanges={true}
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
                  </Marker.Animated>

                }

              } else if (content.type == "play") {
                return <Marker.Animated
                  key={pointId}
                  coordinate={{
                    latitude: geopoints.latitude * 1,
                    longitude: geopoints.longitude * 1,
                  }}
                  image={require('../assets/GoPlay_PinGold.png')}
                  onPress={e => selectPlay(id, pointId)}
                  style={{ height: 10, }}
                  resizeMode="contain"
                  tracksViewChanges={true}
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
                </Marker.Animated>
              } else if (content.category == "mtrep") {
                return <Marker.Animated
                  key={pointId}
                  coordinate={{
                    latitude: geopoints.latitude * 1,
                    longitude: geopoints.longitude * 1,
                  }}
                  image={require('../assets/GoPlay_PinGreen.png')}
                  onPress={e => selectEvent(id, pointId)}
                  tracksViewChanges={true}
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
                </Marker.Animated>

              } else if (content.type == "sponsor") {
                return <Marker.Animated
                  key={pointId}
                  coordinate={{
                    latitude: geopoints.latitude * 1,
                    longitude: geopoints.longitude * 1,
                  }}
                  image={require('../assets/GoPlay_PinCopper.png')}
                  onPress={e => selectSponsor(id, pointId)}
                  tracksViewChanges={true}
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
                </Marker.Animated>
              } else {
                return <Marker.Animated
                  key={pointId}
                  coordinate={{
                    latitude: geopoints.latitude * 1,
                    longitude: geopoints.longitude * 1,
                  }}
                  image={require('../assets/GoPlay_PinCopper.png')}
                  onPress={e => selectEvent(id, pointId)}
                  tracksViewChanges={true}
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
                </Marker.Animated>
              }
            }
          }))

        } catch {
          console.log("I errored out")
        }

        return (
          <>
            {contents}

          </>
        );
      }
    }
  }



  let Camera = {
    center: {
      latitude: currentPosition.latitude,
      longitude: currentPosition.longitude,
    },
    pitch: 0,
    heading: 0,


    // Only when using Google Maps.
    zoom: 20
  }




  return (
    <View style={styles.container}>
      <Cog onPress={() => navigation.navigate('Settings')} />
      {/* {!isLoading ? ( */}
      <MapView.Animated
        ref={_map}
        provider={PROVIDER_GOOGLE}
        mapPadding={{ top: 50, left: 20, bottom: 50 }}
        mapType="standard"
        customMapStyle={googleMapStyle}

        style={[styles.map, { width: mapWidth }]}
        showsUserLocation
        showsBuildings
        //initialCamera={Camera}

        //region={mapRegion}
        animateCamera={Camera, 1000}
        // animateCamera = {{center: mapRegion,pitch: 2, heading: 20,altitude: 200, zoom: 40},500}
        //onPanDrag={(e)=> setFollowsUserLocation(false)}
        //onStartShouldSetResponder={(e)=> setFollowsUserLocation(false)}
        // onUserLocationChange= {event => console.log(event.nativeEvent)}
        followsUserLocation={followsUserLocation}
        //onStartShouldSetResponder={(e)=> setFollowsUserLocation(false)}
        onPanDrag={(e) => setFalse()}
        showsMyLocationButton={false}
        showsCompass={true}
        zoomEnabled={true}
        zoomControlEnabled={true}
        onMapReady={() => updateMapStyle()}
        //getCamera


        //region={currentRegion}
        //onRegionChangeComplete={onRegionChange}
        //scrollEnabled={require('react-native').Platform.OS === 'android' ? true : !followsUserLocation}
        scrollEnabled={true}
      >


        {/* <MyLocationButton
          
          /> */}


        {/* Device Location Marker
          <Marker.Animated
            coordinate={{
              latitude: deviceLatitude,
              longitude: deviceLongitude,
            }}
            image={require('../assets/map_marker.png')}
          /> */}
        <Markers
          zIndex={1}
          tracksViewChanges={true}
          tracksInfoWindowChanges={false} />

      </MapView.Animated>


      {/* ) : (null)} */}


      {locationPermission ?
        <TouchableOpacity style={styles.buttonContainer} onPress={() => { setTrue() }}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>
              <FontAwesome5
                name="location-arrow"
                solid
                color="#fff"
                size={20}
              />  Re-center</Text>
          </View>
        </TouchableOpacity>
        : null}
      {locationPermission ?
        <TouchableOpacity style={styles.buttonContainer2} onPress={() =>
          toggleChangeView()}>
          <View style={styles.buttonCircle}>

            <FontAwesome5
              name="dot-circle"
              solid
              color="#fff"
              size={25}
            />
          </View>
        </TouchableOpacity>
        : null}


    </View>
  );
};

const googleMapStyle = [{
  featureType: "administrative",
  elementType: "geometry",
  stylers: [{
    visibility: "off"
  }]
}]

const styles = StyleSheet.create({
  map: {
    height: '100%',
    // padding: 50
  },
  container: {
    flex: 1,
    alignItems: 'center',
    // justifyContent: 'center'
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
    fontFamily: 'FuturaPT-Book',
    flexDirection: 'row'
  },
  nameDescription: {
    fontSize: 18,
    marginBottom: 5,
    fontFamily: 'FuturaPT-Book',
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
  buttonContainer: {
    position: "absolute",
    bottom: '9%',
    alignSelf: "flex-start",
  },
  buttonContainer2: {
    position: "absolute",
    bottom: '17%',
    alignSelf: "flex-start",
  },
  button: {
    backgroundColor: '#cc8a05',
    minWidth: 150,
    maxWidth: 200,
    minHeight: 44,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    margin: 10,
    paddingLeft: 20,
    paddingRight: 20,
    zIndex: 2,
  },
  buttonCircle: {
    backgroundColor: '#cc8a05',
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    margin: 10,
    padding: 12,
  },
  buttonText: {
    fontFamily: 'FuturaPT-Book',
    fontSize: 24,
    color: "white",
  },
  marker: {
    width: 40,
    height: 40,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FFF',
  },

});

