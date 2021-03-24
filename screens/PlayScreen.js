import 'react-native-gesture-handler';
import React, { useState, useRef } from 'react';
import { Animated, Text, View, StyleSheet, TouchableOpacity, Dimensions, StatusBar, ScrollView, Image, ImageBackground } from 'react-native';
import Video from 'react-native-video';
import Navigation from '../components/navigation/navigation';
//import Settings from '../components/Cog';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import playImage from '../assets/mountain.jpg';

const { width, height } = Dimensions.get('screen');
const ITEM_WIDTH = width;
const ITEM_HEIGHT = height * .88;

// const HEADER_MAX_HEIGHT = ITEM_HEIGHT;
// const HEADER_MIN_HEIGHT = 240;
// const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

var author = 'Author';
var title = 'Title';
var discription = "Play Discription";
var transcript = "Play Transcript";
var actors = "Actor Information";
var addInfo = "Additional Information"
var copyright = "Copyright"

{/* Video Testing */ }
var source = 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4';

{/* Audio Testing */ }
//var source = 'https://actions.google.com/sounds/v1/crowds/voices_angry.ogg';

export default ({ navigation }) => {
    // const [scrollY, setScrollY] = useState(new Animated.Value(0));
    // const headerHeight = scrollY.interpolate({
    //     inputRange: [0, HEADER_SCROLL_DISTANCE],
    //     outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
    //     extrapolate: 'clamp',
    // });

    const video = useRef(null);
    const [locked, setLocked] = useState(true);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [fullScreen, setFullScreen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [paused, setPaused] = useState(true);

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

    // const [progress, setProgress] = useState(ITEM_WIDTH * 0.9 / duration * currentTime);

    const safeAreaInsets = useSafeAreaInsets()
    return <View style={{
        flex: 1,
        //paddingTop: safeAreaInsets.top,
        paddingBottom: safeAreaInsets.bottom,
        paddingLeft: safeAreaInsets.left,
        paddingRight: safeAreaInsets.right,
    }}>


        {/* MAIN CONTENT */}
        <ScrollView
        // style={{ position: 'relative' }}
        // scrollEventThrottle={16}
        // onScroll={Animated.event(
        //     [{ nativeEvent: { contentOffset: { y: scrollY } } }],
        //     { useNativeDriver: false }
        // )}
        >

            {/* <StatusBar backgroundColor='#fff' barStyle="dark-content" /> */}
            <StatusBar translucent={true} hidden={true} />
            {/* AUDIO/VIDEO HEADER */}
            <View style={styles.header} >
                {/* <Animated.View style={[styles.header, { height: headerHeight }]} ></Animated.View> */}
                <ImageBackground source={playImage} style={styles.image}>
                    <View style={styles.overlay}>

                        {/* video */}
                        <Video source={{ uri: source }}
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
                        <Text style={styles.title}>{title}</Text>

                        {/* preview */}
                        {
                            locked ? <TouchableOpacity
                                onPress={() => setPaused(false)}
                            >
                                <View style={styles.button}>

                                    <Text style={styles.buttonText}>Preview</Text>

                                </View>
                            </TouchableOpacity> : <View style={{ width: 177, height: 44, }}></View>
                        }

                        {/* controls */}
                        {
                            locked ? <TouchableOpacity onPress={() => { setLocked(false), alert('Unlocked') }}>
                                <FontAwesome5
                                    name="lock"
                                    solid
                                    color="#fff"
                                    size={40}
                                    style={{ padding: 10, }}
                                />
                            </TouchableOpacity> : null
                        }

                        {
                            !locked ? <TouchableOpacity onPress={() => { paused ? setPaused(false) : setPaused(true) }}>
                                <FontAwesome5
                                    name={paused ? "play" : "pause"}
                                    solid
                                    color="#fff"
                                    size={40}
                                    style={{ padding: 10, }}
                                />
                            </TouchableOpacity> : null
                        }

                        <View style={styles.progressBar}>
                            <Animated.View style={[styles.progressBarFill]}>
                                <View style={styles.progressDot}></View>
                            </Animated.View>
                        </View>



                    </View>
                </ImageBackground>
            </View>

            {/* spacer */}
            {/* <View style={{ height: HEADER_MAX_HEIGHT }}></View> */}

            {/* discription */}
            <View style={styles.discription}>
                <Text style={styles.text_title}>{title}</Text>
                <Text allowFontScaling style={styles.author}>Written by {author}</Text>
                <Text allowFontScaling style={styles.subtext}>{discription}</Text>
                {!locked ? <Text allowFontScaling style={styles.subtext}>{transcript}</Text> : null}
                {
                    locked ? <TouchableOpacity
                        onPress={() => [setLocked(false), alert('Unlocked')]}
                    >
                        <View style={[styles.subButton]}>

                            <Text style={styles.subButtonText}>Unlock</Text>

                        </View>
                    </TouchableOpacity> : null
                }
                <Text allowFontScaling style={styles.subtext}>{actors}</Text>
                <Text allowFontScaling style={styles.subtext}>{addInfo}</Text>
                <Text allowFontScaling style={styles.subtext}>{copyright}</Text>

            </View>

            {/* footer */}
            <View style={styles.footer}>
                <Image source={require('../assets/1_MontanaRep_PrimaryLogo_GreenLandscape.png')} style={styles.footer_logo} />

            </View>



        </ScrollView>



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
        //fontWeight: 'bold',

    },

    subButton: {
        backgroundColor: '#004E47',
        width: ITEM_WIDTH * .75,
        height: 44,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        borderRadius: 5,
        //margin: 10,
        position: "relative",
        zIndex: 99,
    },
    subButtonText: {
        fontFamily: 'FuturaPTBook',
        fontSize: 20,
        color: "white",
        //fontWeight: 'bold',

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
        width: 10,
        flexDirection: "row-reverse",
        alignItems: "center"
    },
    progressDot: {
        backgroundColor: '#CC8A05',
        height: 20,
        borderRadius: 15,

        width: 20,
    }


})