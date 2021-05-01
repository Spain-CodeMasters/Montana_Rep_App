import 'react-native-gesture-handler';
import React, { useState, useRef, useEffect } from 'react';
import {
    Animated,
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    StatusBar,
    ScrollView,
    Image,
    ImageBackground,
    PermissionsAndroid,
} from 'react-native';
import Video from 'react-native-video';
import Navigation from '../components/navigation/navigation';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Geolocation from 'react-native-geolocation-service';
import * as geolib from 'geolib';

import { db } from '../components/Firebase/firebase';

const { width, height } = Dimensions.get('screen');
const ITEM_WIDTH = width;
const ITEM_HEIGHT = height * .88;

export default ({ navigation: { goBack }, navigation, route }) => {

    const safeAreaInsets = useSafeAreaInsets()

    const locationPermission = PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);

    const [distance, setDistance] = useState('');
    const [play, setPlay] = useState(null);

    const requestLocationPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                    title: "Montana Repertory Theatre Location Permission",
                    message:
                        "We need access to your location " +
                        "to show your distance from this play",
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
    }, [play]);


    useEffect(() => {
        db.collection("content").doc(route.params.id).onSnapshot((snapshot) => {
            setPlay(snapshot._data);
        })
    }, []);


    function checkPosition(currentPosition) {
        if (play !== null && play.geopoints[0].latitude !== '') {
            let pointId = 0
            //CHECK for null
            if (route.params.pointId !== null) {
                pointId = route.params.pointId;

            } else { //If null, choose closest
                var arr = [];

                for (var i = 0; i < play.geopoints.length; i++) {
                    arr.push(geolib.getDistance(currentPosition, play.geopoints[i]))

                    for (var j = 1; j < arr.length; j++) {
                        if (arr[j] < arr[0]) {
                            pointId = j;
                        }
                    }
                }

            }

            const distance = (geolib.getDistance(currentPosition, play.geopoints[pointId]));

            if (distance < 10) {
                setLocked(false);
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
            } else if (distance < 90) {
                const feet = Math.floor((geolib.convertDistance(distance, "ft")))
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


    const video = useRef(null);
    const [locked, setLocked] = useState(true);
    const [premium, setPremium] = useState(true);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [fullScreen, setFullScreen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [paused, setPaused] = useState(true);
    const [progress, setProgress] = useState(new Animated.Value(currentTime));

    const onProgress = (data) => {
        if (!loading) {
            setCurrentTime(data.currentTime);
        }
    };

    const onLoad = (data) => {
        setDuration(data.duration);
        setLoading(false);
    };

    const onEnd = () => [video.current.seek(0), setPaused(true)];

    useEffect(() => {
        setProgress(new Animated.Value(currentTime));
    }, [currentTime])


    return <View style={{
        flex: 1,
        paddingBottom: safeAreaInsets.bottom,
        paddingLeft: safeAreaInsets.left,
        paddingRight: safeAreaInsets.right,
    }}>


        {/* MAIN CONTENT */}
        {(function () {

            if (play !== null) {
                return <ScrollView>

                    <StatusBar translucent={true} hidden={true} />

                    {/* AUDIO/VIDEO HEADER */}
                    <View style={styles.header} >
                        <ImageBackground source={{ uri: play.mainPhotoUrl }} style={styles.image}>
                            <View style={styles.overlay}>

                                {/* video */}
                                <Video source={{ uri: play.playUrl }}
                                    ref={video}
                                    rate={1.0}
                                    volume={1.0}
                                    paused={paused}
                                    muted={false}
                                    resizeMode={"contain"}
                                    style={styles.video}
                                    onProgress={onProgress}
                                    onLoad={onLoad}
                                    onEnd={onEnd}
                                />

                                {/* title */}
                                <Text style={styles.title}>{play.title}</Text>

                                {/* preview
                                {
                                    locked ? <TouchableOpacity
                                        onPress={() => setPaused(false)}
                                    >
                                        <View style={styles.button}>

                                            <Text style={styles.buttonText}>Preview</Text>

                                        </View>
                                    </TouchableOpacity> : <View style={{ width: 177, height: 44, }}></View>
                                } */}

                                {/* controls */}
                                {
                                    locked ? //<TouchableOpacity onPress={() => { setLocked(false), alert('Unlocked') }}>
                                        <FontAwesome5
                                            name="lock"
                                            solid
                                            color="#fff"
                                            size={40}
                                            style={{ padding: 10, }}
                                        />
                                        //</TouchableOpacity> 
                                        : <TouchableOpacity onPress={() => { paused ? setPaused(false) : setPaused(true) }}>
                                            <FontAwesome5
                                                name={paused ? "play" : "pause"}
                                                solid
                                                color="#fff"
                                                size={40}
                                                style={{ padding: 10, }}
                                            />
                                        </TouchableOpacity>
                                }

                                <View style={styles.progressBar}>
                                    <Animated.View style={[styles.progressBarFill, {
                                        width: progress.interpolate({
                                            inputRange: [0, duration],
                                            outputRange: ['0%', '100%'],
                                        })
                                    }
                                    ]}>
                                        <Animated.View style={styles.progressDot}></Animated.View>
                                    </Animated.View>
                                </View>



                            </View>
                        </ImageBackground>
                    </View>

                    {/* discription */}
                    <View style={styles.discription}>
                        <Text style={styles.text_title}>{play.title}</Text>
                        <Text allowFontScaling style={styles.subtext}>{distance}</Text>
                        <Text allowFontScaling style={styles.author}>{play.screenwriter}</Text>
                        <Text allowFontScaling style={styles.subtext}>{play.locationInfo}</Text>
                        <Text allowFontScaling style={styles.subtext}>{play.subHeader}</Text>
                        <Text allowFontScaling style={styles.subtext}>{play.body}</Text>
                        {!locked ? <Text allowFontScaling style={styles.subtext}></Text> : null}
                        {
                            !premium ? <TouchableOpacity
                            //onPress={() => [setLocked(false), alert('Unlocked')]}
                            >
                                <View style={[styles.subButton]}>

                                    <Text style={styles.subButtonText}>Unlock</Text>

                                </View>
                            </TouchableOpacity> : null
                        }
                        <Text allowFontScaling style={styles.subtext}>{play.actorInfo}</Text>
                        <Text allowFontScaling style={styles.subtext}>{play.addInfo}</Text>
                        <Text allowFontScaling style={styles.subtext}>{play.copyrightDate}</Text>

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

    progressBar: {
        position: 'absolute',
        bottom: 40,
        backgroundColor: 'white',
        height: 9,
        borderRadius: 5,
        width: ITEM_WIDTH * 0.83,
    },
    progressBarFill: {
        backgroundColor: '#CC8A05',
        height: 9,
        borderRadius: 5,
        width: 0,
        flexDirection: "row-reverse",
        alignItems: "center",
    },
    progressDot: {
        backgroundColor: '#CC8A05',
        height: 14,
        borderRadius: 15,
        marginRight: -7,
        width: 14,
    }


})