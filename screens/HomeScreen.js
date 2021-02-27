import 'react-native-gesture-handler';
import React, { useState, useRef } from 'react';
import {  Animated, Text, View, Button, StyleSheet, TouchableOpacity, Dimensions, Platform, TextInput, StatusBar, ScrollView, FlatList, Image } from 'react-native';
import { SocialIcon } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Navigation from '../components/navigation/navigation';
import Settings from '../components/settings/settings';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { ImageBackground, LogBox } from 'react-native';

//Carousel Banner
const { width, height } = Dimensions.get('screen');

const ITEM_WIDTH = width;
const ITEM_HEIGHT = height * .88;

const HERO_DATA = [
    {
        background: 'https://res.cloudinary.com/claire-dev/image/upload/v1612076013/mountain_nonpge.jpg',
        logo: "../assets/WhiteLandscape_Logo.png",
        buttonText: "About Us",
        buttonLink: "",
    },
    {
        background: 'https://res.cloudinary.com/claire-dev/image/upload/v1612076013/glacier_aqjz96.jpg',
        logo: "../assets/WhiteLandscape_Logo.png",
        buttonText: "Join Now",
        buttonLink: "",
    },
    {
        background: 'https://res.cloudinary.com/claire-dev/image/upload/v1612076013/glacier_aqjz96.jpg',
        logo: "../assets/WhiteLandscape_Logo.png",
        buttonText: "Available Now",
        buttonLink: "",
    }
    // 'https://res.cloudinary.com/claire-dev/image/upload/v1612076013/glacier_aqjz96.jpg',
    // 'https://res.cloudinary.com/claire-dev/image/upload/v1612076013/mountain_nonpge.jpg',
    // 'https://res.cloudinary.com/claire-dev/image/upload/v1612076013/creek_dadkt3.jpg',
];

const POST_DATA = [
    {
        id: "1",
        image: 'https://res.cloudinary.com/claire-dev/image/upload/v1612076013/mountain_nonpge.jpg',
        title: 'Go Play! Post with a long title to check for run off',
        text: 'This is a post for Go Play! with a lot of text so I can see where the text breaks',
        type: 'goplay'

    },
    {
        id: "2",
        image: null,
        title: 'MT Rep Post',
        text: 'This is a post for Montana Rep',
        type: 'mtrep'
    },
    {
        id: "3",
        image: '',
        title: 'Community Post',
        text: 'This is a post for the community/sponsors',
        type: 'comm'
    },
    {
        id: "4",
        image: 'https://res.cloudinary.com/claire-dev/image/upload/v1612076013/glacier_aqjz96.jpg',
        title: 'MT Rep Post 2',
        text: 'This is another post for Montana Rep',
        type: 'mtrep'
    },
];

const Post = ({ item, color }) => (
    <View style={styles.post}>
        <Text style={styles.text_title}>{item.title}</Text>
        {(function () {
            if (item.type == 'mtrep') {
                return <Text style={[styles.postLabel, { color: '#747A21' }]}>Montana Repertory Theatre</Text>
            } else if (item.type == 'goplay') {
                return <Text style={[styles.postLabel, { color: '#cc8a05' }]}>Go Play!</Text>
            } else if (item.type == 'comm') {
                return <Text style={[styles.postLabel, { color: '#A5580C' }]}>Community</Text>
            }
        })()}


        {/* Check for Image */}
        {(function () {
            if (item.image == '' || item.image == null) {
                return <></>
            } else {
                return <View style={{ flex: 1 }}>
                    <Image source={{ uri: item.image }} style={{ width: 270, height: 200, marginTop: 10 }}></Image>
                </View>
            }
        })()}

        <Text style={styles.subtext}>{item.text}</Text>

    </View>
);



export default ({ navigation }) => {

    // Filter Posts 
    const [filter, setFilter] = useState("all");
    const [greenSelected, setGreenSelected] = useState(false);
    const [goldSelected, setGoldSelected] = useState(false);
    const [redSelected, setRedSelected] = useState(false);
    const scroll = useRef(null);

    function filterPosts(type) {
        scroll.current.scrollToOffset({ offset: ITEM_HEIGHT, animated: true })
        if (filter !== type) {
            if (type == "mtrep") {
                setFilter("mtrep");
                setGreenSelected(true);
                setGoldSelected(false);
                setRedSelected(false);
            } else if (type == "goplay") {
                setFilter("goplay");
                setGreenSelected(false);
                setGoldSelected(true);
                setRedSelected(false);
            } else if (type == "comm") {
                setFilter("comm");
                setGreenSelected(false);
                setGoldSelected(false);
                setRedSelected(true);
            }
        } else {
            setFilter("all");
            setGreenSelected(false);
            setGoldSelected(false);
            setRedSelected(false);
        }

    }

    const renderHeader = () => {
        {/* Carousel Module */ }
        return <View>
            <FlatList
                data={HERO_DATA}
                keyExtractor={(_, index) => index.toString()}
                horizontal
                pagingEnabled
                renderItem={({ item }) => {
                    return <View style={{ width }}>
                        <ImageBackground source={{ uri: item.background }} style={styles.image} >
                            <View style={styles.overlay}>
                                <View style={{ flex: 1, marginTop: 200 }}>
                                    <Image source={require('../assets/WhiteLandscape_Logo.png')} style={{
                                        flex: 1,
                                        aspectRatio: 1,
                                        resizeMode: 'center',
                                    }} />
                                </View>
                                <View style={{ flex: 1 }}>
                                    <TouchableOpacity
                                    //onPress={() => navigation.navigate([{item.buttonLink})}
                                    >
                                        <View style={styles.button}>
                                            <Text style={styles.buttonText}>{item.buttonText}</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </ImageBackground>
                    </View>
                }}
            />
        </View>

    }

    const renderItem = ({ item }) => {

        if (filter == "all") {
            return (
                <Post
                    item={item}
                />
            );
        } else if (filter == "mtrep" && item.type == "mtrep") {
            return (
                <Post
                    item={item}
                />
            );
        } else if (filter == "goplay" && item.type == "goplay") {
            return (
                <Post
                    item={item}
                />
            );
        } else if (filter == "comm" && item.type == "comm") {
            return (
                <Post
                    item={item}
                />
            );
        }
    };

    const renderItemSeparator = () => {
        return (
            <View
                style={{
                    marginLeft: "10%",
                    height: 1,
                    width: "80%",
                    backgroundColor: "#999",
                }}
            />
        );
    }

    const renderEmpty = () => {
        return <View style={styles.post}>
            <Text style={[styles.postLabel, { color: '#999' }]}>No recent posts</Text>
        </View>

    }

    const renderFooter = () => {
        {/* footer Module */ }
        return <View style={{ backgroundColor: '#747A21', marginTop: -3 }}>
            <View style={styles.header}>
                <Image source={require('../assets/WhiteLandscape_Logo.png')} style={styles.footer_logo} />
                <View style={{ flexDirection: 'row' }}>
                    <FontAwesome5 name='facebook' solid color="#fff" size={30} style={{ padding: 10, }} onPress={() => { alert('facebook'); }} />
                    <FontAwesome5 name='instagram' solid color="#fff" size={30} style={{ padding: 10, }} onPress={() => { alert('instagram'); }} />
                    <FontAwesome5 name='envelope' solid color="#fff" size={30} style={{ padding: 10, }} onPress={() => { alert('email'); }} />
                </View>
                <Text style={styles.footer_text}>©2021 Montana Repertory Theatre</Text>
                <Text style={styles.footer_text}>All Right Reserved</Text>
                <View style={{ marginBottom: 70 }}></View>
            </View>

        </View>

    }


    const safeAreaInsets = useSafeAreaInsets();
    return <View style={{
        flex: 1,
        //paddingTop: safeAreaInsets.top,
        paddingBottom: safeAreaInsets.bottom,
        paddingLeft: safeAreaInsets.left,
        paddingRight: safeAreaInsets.right,
    }}>
        {/* <ScrollView stickyHeaderIndices={[2]}> */}
        <StatusBar hidden />

        <FlatList
            ref={scroll}
            data={POST_DATA}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            ListHeaderComponent={renderHeader}
            ListFooterComponent={renderFooter}
            ItemSeparatorComponent={renderItemSeparator}
            ListEmptyComponent={renderEmpty}
        />

        <Settings />
        {/* Flatlist Navigation */}
        <View style={{ position: "absolute", left: ITEM_WIDTH - 60, flexDirection: 'column', alignItems: 'flex-end', padding: 10, paddingTop: 55, }}>
            <TouchableOpacity onPress={() => filterPosts('mtrep')}><Animated.View style={[styles.postNavi, { backgroundColor: '#747A21'}]}></Animated.View></TouchableOpacity>
            <TouchableOpacity onPress={() => filterPosts('goplay')}><Animated.View style={[styles.postNavi, { backgroundColor: '#cc8a05'}]}></Animated.View></TouchableOpacity>
            <TouchableOpacity onPress={() => filterPosts('comm')}><Animated.View style={[styles.postNavi, { backgroundColor: '#A5580C'}]}></Animated.View></TouchableOpacity>
        </View>
        <Navigation navigation={navigation} />
    </View>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    header: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 30

    },
    post: {
        flex: 1,
        backgroundColor: "white",
        padding: 60,
        alignItems: 'center',
        justifyContent: 'center',

    },
    postLabel: {
        fontSize: 16,
        fontFamily: 'FuturaPTMedium',
        lineHeight: 20,
        textTransform: 'uppercase'
    },
    image: {
        width: ITEM_WIDTH,
        height: ITEM_HEIGHT,
        resizeMode: 'cover'
    },
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        width: ITEM_WIDTH,
        height: ITEM_HEIGHT,
        alignItems: 'center',
        justifyContent: 'center',
    },
    postNavi: {
        minWidth: 10,
        minHeight: 10,
        borderRadius: 10,
        margin: 15,
    },
    subscribe_container: {
        flex: 1,
        backgroundColor: '#EBEBEB',
        borderRadius: 9,
        padding: 30,
        margin: 30
    },

    textInput: {
        flex: 1,
        backgroundColor: 'white',
        borderColor: '#707070',
        borderWidth: 1,
        color: 'black',
        fontFamily: 'FuturaPTBook',
        fontSize: 18,
        paddingLeft: 10,


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

    footer_text: {
        fontFamily: 'FuturaPTBook',
        fontSize: 16,
        color: 'white'

    },

    text_title: {
        fontSize: 34,
        fontFamily: 'FuturaPTDemi',
        textAlign: 'center',
    },

    subtext: {
        fontSize: 18,
        fontFamily: 'FuturaPTBook',
        marginTop: 20,
        marginBottom: 20,
        lineHeight: 20,
    },

    subtext_link: {
        fontSize: 20,
        fontFamily: 'FuturaPTBook',
        color: '#747A21',
        marginBottom: 30
    },
    button: {
        backgroundColor: '#cc8a05',
        minWidth: 177,
        maxWidth: 250,
        minHeight: 44,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        margin: 10,
        paddingLeft: 20,
        paddingRight: 20,
        position: "relative",
        zIndex: 99,
    },
    buttonText: {
        fontFamily: 'FuturaPTBook',
        fontSize: 24,
        color: "white",
        //fontWeight: 'bold',

    },


})