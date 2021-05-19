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
    Linking,
    PermissionsAndroid,
    TouchableWithoutFeedback,
} from 'react-native';
import Video from 'react-native-video';
import Navigation from '../components/navigation/navigation';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Geolocation from 'react-native-geolocation-service';
import * as geolib from 'geolib';

import { db } from '../components/Firebase/firebase';

const { width, height } = Dimensions.get('screen');
const ITEM_WIDTH = width;
const ITEM_HEIGHT = height * .88;

// const HEADER_MAX_HEIGHT = ITEM_HEIGHT;
// const HEADER_MIN_HEIGHT = 240;
// const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

{/* Video Testing */ }
//var source = 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4';

{/* Audio Testing */ }
//var source = 'https://actions.google.com/sounds/v1/crowds/voices_angry.ogg';

export default ({ navigation: { goBack }, navigation, route }) => {

    const [distance, setDistance] = useState('');
    const [sponsor, setSponsor] = useState(null);

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
    }, [sponsor]);


    useEffect(() => {
        db.collection("content").doc(route.params.id).onSnapshot((snapshot) => {
            setSponsor(snapshot._data);
        })
    }, []);


    function checkPosition(currentPosition) {
        if (sponsor !== null && sponsor.geopoints[0].latitude !== '' || sponsor !== null && sponsor.geopoints.length > 1) {
            let pointId = 0
            //CHECK for null
            if (route.params.pointId !== null) {
                pointId = route.params.pointId;

            } else { //If null, choose closest
                var arr = [];

                for (var i = 0; i < sponsor.geopoints.length; i++) {
                    arr.push(geolib.getDistance(currentPosition, sponsor.geopoints[i]));

                    // for (var j = 1; j < arr.length; j++) {
                    //     if (arr[j] < arr[0]) {
                    //         pointId = j-1;
                    //     }
                    // }
                }

                pointId = arr.indexOf(Math.min(...arr));

            }

            const distance = (geolib.getDistance(currentPosition, sponsor.geopoints[pointId]));
            if (distance < 10) {
                setLocked(false);
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
        } else {
            setLocked(false);
        }
    }


    const video = useRef(null);
    const [locked, setLocked] = useState(true);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [fullScreen, setFullScreen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [paused, setPaused] = useState(true);
    const [progress, setProgress] = useState(new Animated.Value(currentTime));
    const opacity = useRef(new Animated.Value(1)).current;

    const onProgress = (data) => {
        if (!loading) {
            setCurrentTime(data.currentTime);
        }
    };

    const onLoad = (data) => {
        setDuration(data.duration);
        setLoading(false);
    };

    const onEnd = () => {
        fadeIn();
        video.current.seek(0);
        setPaused(true);
        console.log("Ended");
        let views = sponsor.views + 1;

        db.collection("content").doc(route.params.id).update({
            views: views,
        })
    };

    const handleProgressPressIn = (e) => {
        fadeIn();
        const position = e.nativeEvent.locationX;
        var barPosition;

        if (position < 0) {
            barPosition = 0;
        } else if (position > (ITEM_WIDTH * 0.83)) {
            barPosition = ITEM_WIDTH * 0.83;
        } else {
            barPosition = position;
        }

        const newProgress = (barPosition / (ITEM_WIDTH * 0.83)) * duration;
        Animated.timing(progress, {
            useNativeDriver: false,
            toValue: newProgress,
            duration: 500
        }).start();
    }

    const handleProgressPressOut = (e) => {
        setTimeout(function () { !paused ? fadeOut() : null; }, 3000);
        const position = e.nativeEvent.locationX;
        var barPosition;

        if (position < 0) {
            barPosition = 0;
        } else if (position > (ITEM_WIDTH * 0.83)) {
            barPosition = ITEM_WIDTH * 0.83;
        } else {
            barPosition = position;
        }

        const newProgress = (barPosition / (ITEM_WIDTH * 0.83)) * duration;
        Animated.timing(progress, {
            useNativeDriver: false,
            toValue: newProgress,
            duration: 500
        }).start();

        video.current.seek(newProgress);
    }


    useEffect(() => {
        Animated.timing(progress, {
            useNativeDriver: false,
            toValue: currentTime,
            duration: 500
        }).start();
    }, [currentTime])

    const fadeIn = () => {
        Animated.timing(opacity, {
            useNativeDriver: true,
            toValue: 1,
            duration: 500,
        }).start();
    };

    const fadeOut = () => {
        setControls(false);
        Animated.timing(opacity, {
            useNativeDriver: true,
            toValue: 0,
            duration: 1000
        }).start();
    };

    function handlePlayPause() {
        setPaused(!paused);
        paused ? Animated.timing(opacity, {
            useNativeDriver: true,
            toValue: 0,
            delay: 1000,
            duration: 1000
        }).start() : fadeIn();
    }

    function handlePlayerOnPress() {
        if (controls) {
            fadeOut();
        } else if (!controls) {
            fadeIn();
            !paused ?setTimeout(function () {  fadeOut(); }, 3000): null;
        }
    }

    return <View>


        {/* MAIN CONTENT */}
        {(function () {

            if (sponsor !== null) {
                return <ScrollView>

                    <StatusBar translucent={true} hidden={true} />

                    {/* AUDIO/VIDEO HEADER */}
                    <View style={styles.header} >

                        <ImageBackground source={{ uri: sponsor.mainPhotoUrl }} style={styles.image}>
                            {/* video */}
                            <Video source={{ uri: sponsor.playUrl }}
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
                                ignoreSilentSwitch={"ignore"}
                                playInBackground={true}
                                playWhenInactive={true}
                            />

                            <TouchableWithoutFeedback onPress={() => { handlePlayerOnPress() }} touchSoundDisabled={true}>

                                <Animated.View style={[styles.overlay, {
                                    opacity: opacity,
                                }]}>

                                    {/* title */}
                                    <Text style={styles.title}>{sponsor.title}</Text>


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
                                            : <TouchableOpacity
                                                onPress={() => { handlePlayPause() }}>
                                                <FontAwesome5
                                                    name={paused ? "play" : "pause"}
                                                    solid
                                                    color="#fff"
                                                    size={40}
                                                    style={{ padding: 10, }}
                                                />
                                            </TouchableOpacity>
                                    }

                                    <TouchableWithoutFeedback
                                        hitSlop={{ top: 20, right: 10, bottom: 20, left: 10 }}
                                        onPressIn={!locked ? (e) => handleProgressPressIn(e) : null}
                                        onPressOut={!locked ? (e) => handleProgressPressOut(e) : null}
                                        touchSoundDisabled={true}
                                    >

                                        <View style={styles.progressBar} >
                                            <Animated.View style={[styles.progressBarFill, {
                                                width: progress.interpolate({
                                                    inputRange: [0, duration],
                                                    outputRange: ['3%', '100%'],
                                                })
                                            }
                                            ]}
                                            >
                                                {/* <Animated.View style={styles.progressDot}></Animated.View> */}
                                            </Animated.View>
                                        </View>
                                    </TouchableWithoutFeedback>

                                </Animated.View>
                            </TouchableWithoutFeedback>
                        </ImageBackground>
                    </View>

                    {/* spacer */}
                    {/* <View style={{ height: HEADER_MAX_HEIGHT }}></View> */}

                    {/* discription */}
                    <View style={styles.discription}>
                        <View style={{ paddingHorizontal: 10, width: '100%' }}>
                            <Text style={[styles.postLabel, { padding: 10, color: '#999', textAlign: "center" }]}>{distance}</Text>
                            {(function () {
                                if (sponsor.locationInfo !== '' && sponsor.locationInfo !== ' ' && sponsor.locationInfo !== null) {
                                    return <View style={{ padding: 20, backgroundColor: "white", borderWidth: 1, borderColor: '#999', borderRadius: 5, marginBottom: 20, }}>
                                        <Text allowFontScaling style={styles.text_location}>{sponsor.locationInfo}</Text>
                                    </View>
                                }
                            })()}
                        </View>

                        <Text style={styles.text_title}>{sponsor.title}</Text>

                        {(function () {
                            if (sponsor.sponsorSubHeader !== '' && sponsor.sponsorSubHeader !== ' ' && sponsor.sponsorSubHeader !== null) {
                                return <Text allowFontScaling style={styles.text_subtitle}>{sponsor.sponsorSubHeader}</Text>
                            } else {
                                return <></>
                            }
                        })()}

                        {(function () {
                            if (sponsor.commSubHeader !== '' && sponsor.commSubHeader !== ' ' && sponsor.commSubHeader !== null) {
                                return <Text allowFontScaling style={styles.text_subtitle}>{sponsor.commSubHeader}</Text>
                            } else {
                                return <></>
                            }
                        })()}

                        <Text allowFontScaling style={styles.subtext}>{sponsor.body}</Text>
                        {/* Check for Link */}
                        {(function () {
                            if (sponsor.link == '' || sponsor.link == null) {
                                return <></>
                            } else {
                                if (sponsor.linkName == '' || sponsor.linkName == null) {
                                    return (
                                        <TouchableOpacity onPress={() => {
                                            Linking.openURL(sponsor.link)
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
                                            Linking.openURL(sponsor.link)
                                                .catch(err => {
                                                    console.error("Failed opening page because: ", err);
                                                    alert('Failed to open page');
                                                })
                                        }}>
                                            <View style={[styles.subButton]}>

                                                <Text style={styles.subButtonText}>{sponsor.linkName}</Text>

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
        //resizeMode: 'cover'
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
        fontSize: 18,
        fontFamily: 'FuturaPT-Book',
        paddingHorizontal: 30,
        paddingVertical: 5,
        lineHeight: 20,
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
        alignItems: "center"
    },

    progressDot: {
        backgroundColor: '#CC8A05',
        height: 14,
        borderRadius: 15,
        marginRight: -7,
        width: 14,
    },
})