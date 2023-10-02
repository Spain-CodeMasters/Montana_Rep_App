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
    TouchableWithoutFeedback,
} from 'react-native';
import Video from 'react-native-video';
import Navigation from '../components/navigation/navigation';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const { width, height } = Dimensions.get('screen');
const ITEM_WIDTH = width;
const ITEM_HEIGHT = Platform.OS === 'android' ? height - StatusBar.currentHeight : height;

const progressWidth = ITEM_WIDTH * 0.83;

export default ({ navigation: { goBack }, navigation, route }) => {

    const video = useRef(null);
    const [locked, setLocked] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [landscape, setLandscape] = useState(false);
    const [loading, setLoading] = useState(true);
    const [paused, setPaused] = useState(true);
    const [controls, setControls] = useState(true);
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
        // let views = sponsor.views + 1;

        // db.collection("content").doc(route.params.id).update({
        //     views: views,
        // })
    };

    const handleProgressPressIn = (e) => {
        fadeIn();
        const position = e.nativeEvent.locationX;
        var barPosition;

        if (position < 0) {
            barPosition = 0;
        } else if (position > (progressWidth)) {
            barPosition = progressWidth;
        } else {
            barPosition = position;
        }

        const newProgress = (barPosition / (progressWidth)) * duration;
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
        } else if (position > (progressWidth)) {
            barPosition = progressWidth;
        } else {
            barPosition = position;
        }

        const newProgress = (barPosition / (progressWidth)) * duration;
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
        setControls(true);
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
            !paused ? setTimeout(function () { fadeOut(); }, 3000) : null;
        }
    }

    return <View>


        {/* MAIN CONTENT */}
        <ScrollView>

            <StatusBar translucent={true} hidden={true} />

            {/* AUDIO/VIDEO HEADER */}
            <View style={landscape ? styles.headerLandscape : styles.header} >

                <ImageBackground source={require("../assets/Topographic_Map.jpg")} style={landscape ? styles.landscape : styles.image}>
                    {/* video */}
                    <Video source={require("../assets/welcomeMessage.m4a")}
                        ref={video}
                        rate={1.0}
                        volume={1.0}
                        paused={paused}
                        muted={false}
                        repeat={false}
                        resizeMode={landscape ? "contain" : "cover"}
                        style={styles.video}
                        onProgress={onProgress}
                        onLoad={onLoad}
                        onEnd={onEnd}
                        ignoreSilentSwitch={"ignore"}
                        playInBackground={true}
                        playWhenInactive={true}
                    />

                    <TouchableWithoutFeedback onPress={() => { !locked ? handlePlayerOnPress() : null; }} touchSoundDisabled={true}>

                        <Animated.View style={[styles.overlay, {
                            opacity: opacity,
                        }]}>

                            {/* title */}
                            <Text style={styles.title}>Welcome to GoPlay!</Text>


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

                            {/* FULLSCREEN */}
                            {
                                !locked ?
                                    <TouchableOpacity
                                        onPress={() => setLandscape(!landscape)}
                                        style={landscape ? {
                                            position: 'absolute',
                                            bottom: 5,
                                            right: 5,
                                        } : {
                                            position: 'absolute',
                                            bottom: 55,
                                        }}>

                                        {/* <Text style={[styles.postLabel, {color: "#fff"}]}>rotate</Text> */}
                                        {landscape ? <FontAwesome5
                                            name={'compress'}
                                            solid
                                            color="#fff"
                                            size={20}
                                            style={{
                                                padding: 10,
                                            }}
                                        /> : <Text style={[styles.postLabel, { color: '#fff' }]}>
                                            Fullscreen
                                                </Text>
                                        }

                                    </TouchableOpacity>
                                    : null
                            }


                            <TouchableWithoutFeedback
                                hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}
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
                                    </Animated.View>
                                </View>
                            </TouchableWithoutFeedback>

                        </Animated.View>
                    </TouchableWithoutFeedback>
                </ImageBackground>
            </View>


            {/* discription */}
            {!landscape ? <View style={styles.discription}>


                <Text style={styles.text_title}>Hi!</Text>

                <Text allowFontScaling style={styles.text_subtitle}>Welcome to Montana Repertory Theatre's GoPlay!</Text>

                <Text allowFontScaling style={styles.subtext}>Our app is designed to get you out in the world in search of plays and other interactive experiences. To get started, check the map to see if there is anything nearby, or click on the calendar to see what is avaliable, and thanks for supporting Montana Repertory Theatre.</Text>

                {/* Check for Link */}

                <TouchableOpacity onPress={() => {
                    Linking.openURL('https://montanarep.com/goplay')
                        .catch(err => {
                            console.error("Failed opening page because: ", err);
                            alert('Failed to open page');
                        })
                }}>
                    <View style={[styles.subButton]}>

                        <Text style={styles.subButtonText}>Learn More</Text>

                    </View>
                </TouchableOpacity>
                            

            </View> : null}

            {/* footer */}
            {!landscape ? <View style={styles.footer}>
                <Image source={require('../assets/1_MontanaRep_PrimaryLogo_GreenLandscape.png')} style={styles.footer_logo} />

            </View> : null}



        </ScrollView>


        {!landscape ? <TouchableOpacity style={styles.back} onPress={() => goBack()}>
            <FontAwesome5
                name="chevron-left"
                solid
                color="#fff"
                size={30}
                style={{ padding: 20, }}
            />
        </TouchableOpacity> : null}

        {/* <Settings /> */}
        {!landscape ? <Navigation navigation={navigation} /> : null}
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
    headerLandscape: {
        backgroundColor: '#fff',
        overflow: 'hidden',
        height: ITEM_HEIGHT,
        alignItems: "center",
        justifyContent: "center",
    },
    video: {
        position: 'absolute',
        height: "100%",
        width: ITEM_WIDTH,
    },
    videoLandscape: {
        position: 'absolute',
        height: ITEM_WIDTH,
        width: "100%",
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
    landscape: {
        width: ITEM_HEIGHT,
        height: ITEM_WIDTH,
        transform: [
            { rotate: "90deg" },
        ],
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
        bottom: 30,
        backgroundColor: 'white',
        height: 6,
        borderRadius: 5,
        width: progressWidth,
    },

    progressBarFill: {
        backgroundColor: '#CC8A05',
        height: 6,
        borderRadius: 5,
        width: 0,
        flexDirection: "row-reverse",
        alignItems: "center",
    },

})