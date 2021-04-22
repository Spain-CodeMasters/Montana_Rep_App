import 'react-native-gesture-handler';
import React, { useState, useRef, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Dimensions, StatusBar, ScrollView, Image, ImageBackground, Linking, PermissionsAndroid, } from 'react-native';
import Navigation from '../components/navigation/navigation';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Geolocation from 'react-native-geolocation-service';
import * as geolib from 'geolib';

import { db } from '../components/Firebase/firebase';


const { width, height } = Dimensions.get('screen');
const ITEM_WIDTH = width;
const ITEM_HEIGHT = height * .88;

// const HEADER_MAX_HEIGHT = ITEM_HEIGHT;
// const HEADER_MIN_HEIGHT = 240;
// const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

export default ({ navigation: { goBack }, navigation, route }) => {
    // const [scrollY, setScrollY] = useState(new Animated.Value(0));
    // const headerHeight = scrollY.interpolate({
    //     inputRange: [0, HEADER_SCROLL_DISTANCE],
    //     outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
    //     extrapolate: 'clamp',
    // });
    const safeAreaInsets = useSafeAreaInsets();

    const locationPermission = PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);

    const [distance, setDistance] = useState('');
    const [event, setEvent] = useState(null);

    const requestLocationPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                    title: "Montana Repertory Theatre Location Permission",
                    message:
                        "We need access to your location " +
                        "to show your distance from this event",
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
                    checkPosition(position.coords);
                },
                (error) => {
                    console.log(error.code, error.message);
                },
                { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
            );

        } else {
            requestLocationPermission();
        }
    }, [event]);

    useEffect(() => {
        db.collection("content").doc(route.params.id).onSnapshot((snapshot) => {
            setEvent(snapshot._data);
        })
    }, []);

    function checkPosition(currentPosition) {
        if (event !== null && event.geopoints[0].latitude !== '') {
            let pointId = 0

            //CHECK for null
            if (route.params.pointId !== null) {
                pointId = route.params.pointId;

            } else { //If null, choose closest
                var arr = [];

                for (var i = 0; i < event.geopoints.length; i++) {
                    arr.push(geolib.getDistance(currentPosition, event.geopoints[i]))

                    for (var j = 1; j < arr.length; j++) {
                        if (arr[j] < arr[0]) {
                            pointId = j;
                            console.log(pointId);
                        }
                    }
                }

            }

            const distance = (geolib.getDistance(currentPosition, event.geopoints[pointId]));
            if (distance < 90) {
                const feet = Math.floor((geolib.convertDistance(distance, "ft")));
                if (feet == 1) {
                    setDistance(
                        feet + ' foot away'
                    );
                } else {
                    setDistance(
                        feet + ' feet away'
                    );
                }
            } else {
                const miles = Math.round((geolib.convertDistance(distance, "mi") + Number.EPSILON) * 100) / 100;
                if (miles == 1) {
                    setDistance(
                        miles + 'mile away'
                    );
                } else {
                    setDistance(
                        miles + ' miles away'
                    );
                }
            }
        }
    }



    return <View style={{
        flex: 1,
        paddingBottom: safeAreaInsets.bottom,
        paddingLeft: safeAreaInsets.left,
        paddingRight: safeAreaInsets.right,
    }}>


        {/* MAIN CONTENT */}
        {(function () {

            if (event !== null) {
                return <ScrollView
                // style={{ position: 'relative' }}
                // scrollEventThrottle={16}
                // onScroll={Animated.event(
                //     [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                //     { useNativeDriver: false }
                // )}
                >

                    <StatusBar translucent={true} hidden={true} />
                    {/* HEADER */}
                    <View style={styles.header} >
                        {/* <Animated.View style={[styles.header, { height: headerHeight }]} ></Animated.View> */}
                        <ImageBackground source={{ uri: event.photoUrl }} style={styles.image}>
                            <View style={styles.overlay}>


                                {/* title */}
                                <Text style={styles.title}>{event.title}</Text>

                            </View>
                        </ImageBackground>
                    </View>
        

                    {/* discription */}
                    <View style={styles.discription}>
                        <Text style={styles.text_title}>{event.title}</Text>
                        <Text allowFontScaling style={styles.subtext}>{distance}</Text>
                        <Text allowFontScaling style={styles.subtext}>{event.body}</Text>
                        {/* Check for Link */}
                        {(function () {
                            if (event.link == '' || event.link == null) {
                                return <></>
                            } else {
                                if (event.linkName == '' || event.linkName == null) {
                                    return (
                                        <TouchableOpacity onPress={() => {
                                            Linking.openURL(event.link)
                                                .catch(err => {
                                                    console.error("Failed opening page because: ", err);
                                                    alert('Failed to open page');
                                                })
                                        }}>

                                            <View style={[styles.subButton]}>

                                                <Text style={styles.subButtonText}>Learn More</Text>

                                            </View>
                                        </TouchableOpacity>
                                    )
                                } else {
                                    return (
                                        <TouchableOpacity onPress={() => {
                                            Linking.openURL(event.link)
                                                .catch(err => {
                                                    console.error("Failed opening page because: ", err);
                                                    alert('Failed to open page');
                                                })
                                        }}>
                                            <View style={[styles.subButton]}>

                                                <Text style={styles.subButtonText}>{event.linkName}</Text>

                                            </View>
                                        </TouchableOpacity>
                                    )
                                }
                            }
                        })()}

                    </View>

                    {/* footer */}
                    <View style={styles.footer}>
                        <Image source={require('../assets/1_MontanaRep_PrimaryLogo_GreenLandscape.png')} style={styles.footer_logo} />

                    </View>

                </ScrollView>

            }

        })()}

        <TouchableOpacity style={styles.back} onPress={() => goBack()}>
            <FontAwesome5
                name="chevron-left"
                solid
                color="#fff"
                size={30}
                style={{ padding: 20, }}
            />
        </TouchableOpacity>

        {/* <Settings /> */}
        <Navigation navigation={navigation} />
    </View>
}

const styles = StyleSheet.create({
    fill: {
        flex: 1,
    },
    header: {
        // position: 'absolute',
        // top: 0,
        // left: 0,
        // right: 0,
        backgroundColor: '#fff',
        overflow: 'hidden',
        height: ITEM_HEIGHT,
    },
    video: {
        position: 'absolute',
        height: "100%",
        width: ITEM_WIDTH,
    },
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    discription: {
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'center',
        margin: 45

    },
    postLabel: {
        fontSize: 16,
        fontFamily: 'FuturaPTMedium',
        lineHeight: 20,
        textTransform: 'uppercase'
    },
    image: {
        width: "100%",
        height: "100%",
    },
    footer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 30
    },
    footer_logo: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 50,
        marginBottom: 70,
        width: 212,
        height: 90,
    },

    text_title: {
        fontSize: 40,
        fontFamily: 'FuturaPTDemi'

    },

    author: {
        fontSize: 20,
        fontFamily: 'FuturaPTBook',
        paddingHorizontal: 40,
        marginTop: 10,
        lineHeight: 20
    },

    subtext: {
        fontSize: 16,
        fontFamily: 'FuturaPTBook',
        paddingHorizontal: 40,
        marginTop: 20,
        marginBottom: 10,
        lineHeight: 20
    },

    back: {
        position: 'absolute',
        top: 0,
        alignSelf: "flex-start",
    },

    title: {
        color: '#fff',
        textTransform: 'uppercase',
        fontFamily: 'FuturaPTDemi',
        fontSize: 50,
        letterSpacing: 5,
        margin: 10,
        textAlign: 'center',
    },

    button: {
        backgroundColor: '#cc8a05',
        width: 177,
        height: 44,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        margin: 10,
        position: "relative",
        zIndex: 99,
    },

    buttonText: {
        fontFamily: 'FuturaPTBook',
        fontSize: 24,
        color: "white",
    },

    subButton: {
        padding: 10,
        marginTop: 40,
        backgroundColor: '#004E47',
        width: ITEM_WIDTH * .75,
        height: 44,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        borderRadius: 5,
        position: "relative",
        zIndex: 99,
    },

    subButtonText: {
        fontFamily: 'FuturaPTBook',
        fontSize: 20,
        color: "white",
    },

})