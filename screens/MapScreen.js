import 'react-native-gesture-handler';
import React, { Component, useState, useEffect } from 'react';
import { Text, View, Image, StyleSheet, TouchableOpacity, Dimensions, PermissionsAndroid, Modal, } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker, Callout, Animated, AnimatedRegion } from 'react-native-maps';
import * as Animatable from 'react-native-animatable';
// import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
//tooltip
import Navigation from '../components/navigation/navigation';
import Cog from '../components/Cog';
import PlayingBanner from '../components/playingBanner';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Geolocation from 'react-native-geolocation-service';

import { db } from '../components/Firebase/firebase';


const Info = ({ item, selectedId, modalVisible, setModalVisible }) => {
  if (selectedId !== null) {
    const getIndex = item.findIndex(item => item.id == selectedId)
    //if (item[getIndex].post.type == 'event') {
    return <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <TouchableOpacity style={{ alignSelf: 'flex-end' }} onPress={() => { setModalVisible(!modalVisible); }}>
            <FontAwesome5 name='times' solid color="black" size={30} style={{}} />
          </TouchableOpacity>
          {/* <Image source={{ uri: item[getIndex].post.photoUrl }}></Image> */}
          <Text style={styles.postLabel}>{item[getIndex].content.title}</Text>
          <Text allowFontScaling style={styles.subtext}>{item[getIndex].content.body}</Text>
        </View>
      </View>
    </Modal>
  } else {
    return <></>
  }

}

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
      } else {
        console.log("Location Permission Denied");
      }
    } catch (err) {
      console.warn(err);
    }
  };



  useEffect(() => {
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

      const currentPosition = //() => {
        Geolocation.watchPosition(
          (position) => {
            //setDevicePosition(position);
            setDeviceLatitude(position.coords.latitude);
            setDeviceLongitude(position.coords.longitude);
            console.log(position);
          },
          (error) => {
            // See error code charts below.
            console.log(error.code, error.message);
          },
          { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000, distanceFilter: 1 }
        );
      return () => {
        if (currentPosition) {
          Geolocation.clearWatch(currentPosition);
        }
      };

    } else {
      requestLocationPermission();
    }
    //}
  }, [])


  useEffect(() => {
    db.collection("content").onSnapshot((snapshot) => {
      setContentData(snapshot.docs.map((doc) => ({ id: doc.id, content: doc.data() })));
      //console.log(playData.length);

    })
  }, []);

  const [selectedId, setSelectedId] = useState(null);
  //const [modalVisible, setModalVisible] = useState(false);

  function selectPlay(id) {
    //setSelectedId(id);
    navigation.navigate('Play', {
      id: id,
    })
  }

  function selectEvent(id) {
    setSelectedId(id);
    //setModalVisible(!modalVisible);
  }

  function selectSponsor(id) {
    //setSelectedId(id);
    navigation.navigate('Sponsor', {
      id: id,
    })
  }


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
          //showsUserLocation={true}

          region={{
            latitude: deviceLatitude,
            longitude: deviceLongitude,
            latitudeDelta: 0.00220,
            longitudeDelta: 0.00220,
          }}
        >
          {/* Device Location Marker */}
          <Marker.Animated
            coordinate={{
              latitude: deviceLatitude,
              longitude: deviceLongitude,
            }}
            image={require('../assets/map_marker.png')}
          />

          {(function () {

            if (contentData !== null) {

              const contents = contentData.map(({ id, content }) => content.geopoints.map((geopoints, pointId) => {
                if (geopoints.latitude !== '' && geopoints.longitude !== '') {
                  //console.log(geopoints);
                  if (content.category == "goplay") {
                    //console.log(play);
                    return <Marker
                      key={pointId}
                      coordinate={{
                        latitude: geopoints.latitude * 1,
                        longitude: geopoints.longitude * 1,
                      }}
                      image={require('../assets/GoPlay_PinGold.png')}
                      onPress={e => selectPlay(id)}
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
                      onPress={e => selectEvent(id)}

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
                      onPress={e => selectSponsor(id)}
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
                      onPress={e => selectEvent(id)}
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

          })()}





        </MapView>
      ) : (null)}
      {/* <Info item={contentData} selectedId={selectedId} modalVisible={modalVisible} setModalVisible={setModalVisible} /> */}

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