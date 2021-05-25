import 'react-native-gesture-handler';
import React, { useState, useRef, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Dimensions, StatusBar, ScrollView, Image, ImageBackground, Linking, PermissionsAndroid, } from 'react-native';
import Navigation from '../components/navigation/navigation';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Geolocation from 'react-native-geolocation-service';
import * as geolib from 'geolib';

import { db } from '../components/Firebase/firebase';


const { width, height } = Dimensions.get('screen');
const ITEM_WIDTH = width;
const ITEM_HEIGHT = Platform.OS === 'android' ? height - StatusBar.currentHeight : height;


export default ({ navigation: { goBack }, navigation, route }) => {

    const [distance, setDistance] = useState('');
    const [event, setEvent] = useState(null);


    useEffect(() => {
        Geolocation.getCurrentPosition(
            (position) => {
                checkPosition(position.coords);
            },
            (error) => {
                console.log(error.code, error.message);
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
    }, [event]);


    useEffect(() => {
        db.collection("content").doc(route.params.id).onSnapshot((snapshot) => {
            setEvent(snapshot._data);
        })
    }, []);


    function checkPosition(currentPosition) {
        if (event !== null && event.geopoints[0].latitude !== '' || event !== null && event.geopoints.length > 1) {
            let pointId = 0

            //CHECK for null
            if (route.params.pointId !== null) {
                pointId = route.params.pointId;

            } else { //If null, choose closest
                var arr = [];

                for (var i = 0; i < event.geopoints.length; i++) {
                    arr.push(geolib.getDistance(currentPosition, event.geopoints[i]))

                    // for (var j = 1; j < arr.length; j++) {
                    //     if (arr[j] < arr[0]) {
                    //         pointId = j - 1;
                    //     }
                    // }
                }

                pointId = arr.indexOf(Math.min(...arr));

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


    return <View>


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
                        <View style={{ paddingHorizontal: 10, width: '100%' }}>
                            <Text style={[styles.postLabel, { padding: 10, color: '#999', textAlign: "center" }]}>{distance}</Text>
                            {(function () {
                                if (event.locationInfo !== '' && event.locationInfo !== ' ' && event.locationInfo !== null) {
                                    return <View style={{ padding: 20, backgroundColor: "white", borderWidth: 1, borderColor: '#999', borderRadius: 5, marginBottom: 20, }}>
                                        <Text allowFontScaling style={styles.text_location}>{event.locationInfo}</Text>
                                    </View>
                                }
                            })()}
                        </View>

                        <Text style={styles.text_title}>{event.title}</Text>

                        {(function () {
                            if (event.subHeader !== '' && event.subHeader !== ' ' && event.subHeader !== null) {
                                return <Text allowFontScaling style={styles.text_subtitle}>{event.subHeader}</Text>
                            } else {
                                return <></>
                            }
                        })()}

                        {(function () {
                            if (event.body !== '' && event.body !== ' ' && event.body !== null) {
                                return <Text allowFontScaling style={styles.subtext}>{event.body}</Text>
                            }
                        })()}

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
        backgroundColor: '#fff',
        overflow: 'hidden',
        height: ITEM_HEIGHT - 110,
        alignItems: "center",
        justifyContent: "center",
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
        marginTop: 18,
        marginHorizontal: 45,
    },
    postLabel: {
        fontSize: 16,
        fontFamily: 'FuturaPT-Medium',
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
        color: "black",
        fontSize: 28,
        fontFamily: 'FuturaPT-Medium',
        margin: 10,
    },

    text_subtitle: {
        fontSize: 20,
        fontFamily: 'FuturaPT-Book',
        paddingHorizontal: 40,
        paddingBottom: 10,
        lineHeight: 20,
    },

    text_location: {
        fontSize: 16,
        fontFamily: 'FuturaPT-Book',
        lineHeight: 20,
    },

    subtext: {
        fontSize: 16,
        fontFamily: 'FuturaPT-Book',
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
        fontFamily: 'FuturaPT-Demi',
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
        fontFamily: 'FuturaPT-Book',
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
        fontFamily: 'FuturaPT-Book',
        fontSize: 20,
        color: "white",
    },

})