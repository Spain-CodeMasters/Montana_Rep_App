import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { Animated, Text, View, Button, StyleSheet, TouchableOpacity, Dimensions, StatusBar, ScrollView, Image, SafeAreaView, ImageBackground } from 'react-native';
import Video from 'react-native-video';
//import Video from 'react-native';
import Navigation from '../components/navigation/navigation';
import Settings from '../components/settings/settings';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import playImage from '../assets/mountain.jpg';

const { width, height } = Dimensions.get('screen');
const ITEM_WIDTH = width;
const ITEM_HEIGHT = height * .90;

const HEADER_MAX_HEIGHT = ITEM_HEIGHT;
const HEADER_MIN_HEIGHT = 240;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

var author = 'Author';
var title = 'Title';
var discription = "Play Discription";
var transcript = "Play Transcript";
var source = 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4';


export default ({ navigation }) => {
    const [scrollY, setScrollY] = useState(new Animated.Value(0));
    const headerHeight = scrollY.interpolate({
        inputRange: [0, HEADER_SCROLL_DISTANCE],
        outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
        extrapolate: 'clamp',
    });
    return <View style={styles.container}>
        {/* AUDIO/VIDEO HEADER */}
        <Animated.View style={[styles.header, { height: headerHeight }]} >
            <ImageBackground source={playImage} style={styles.image}>
                <View style={styles.overlay}>
                    {/* video */}
                    <Video source={{ uri: source }}
                        // ref={(ref) => {
                        //     this.player = ref
                        //   }}         
                        rate={1.0}
                        volume={1.0}
                        paused={true}
                        muted={false}
                        resizeMode={"cover"}
                        style={styles.video}
                    />

                    {/* title */}
                    <Text style={styles.title}>{title}</Text>

                    {/* preview */}
                    <View style={styles.button}>
                        <TouchableOpacity
                            //onPress={() => navigation.navigate('HomeScreen')}
                        >
                            <Text style={styles.buttonText}>Preview</Text>

                        </TouchableOpacity>

                    </View>

                    {/* controls */}
                    <FontAwesome5
                        name="lock"
                        solid
                        color="#fff"
                        size={40}
                        style={{padding: 10,}}
                    />
                    {/* <FontAwesome5
                        name="play"
                        solid
                        color="#fff"
                        size={40}
                    /> */}
                </View>
            </ImageBackground>
        </Animated.View>

        {/* MAIN CONTENT */}
        <ScrollView
            contentContainerStyle={{ position: 'relative' }}
            scrollEventThrottle={16}
            onScroll={Animated.event(
                [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                { useNativeDriver: false }
            )}>

            <StatusBar backgroundColor='#fff' barStyle="dark-content" />

            {/* spacer */}
            <View style={{ height: HEADER_MAX_HEIGHT }}></View>

            {/* discription */}
            <View style={styles.discription}>
                <Text style={styles.text_title}>{title}</Text>
                <Text style={styles.author}>Written by {author}</Text>
                <Text style={styles.subtext}>{discription}</Text>
            </View>

            {/* footer */}
            <View style={styles.footer}>
                <Image source={require('../assets/1_MontanaRep_PrimaryLogo_GreenLandscape.png')} style={styles.footer_logo} />

            </View>



        </ScrollView>
        <Settings />
        <Navigation navigation={navigation} />
    </View>
}

const styles = StyleSheet.create({
    fill: {
        flex: 1,
    },
    header: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: '#fff',
        overflow: 'hidden',
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
        marginBottom: 30,
        lineHeight: 20
    },

    title: {
        color: '#fff',
        textTransform: 'uppercase',
        fontFamily: 'FuturaPTDemi',
        fontSize: 40,
        letterSpacing: 5,
        margin: 10,
    },

    button: {
        backgroundColor: '#cc8a05',
        width: 177,
        height: 44,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        margin: 10,
    },
     buttonText: {
        fontFamily: 'FuturaPTBook',
        fontSize: 24,
        color: "white",
        //fontWeight: 'bold',
 
    }


})