import 'react-native-gesture-handler';
import React, { useState, useRef, useEffect } from 'react';
import { Animated, Text, View, Button, StyleSheet, TouchableOpacity, Dimensions, Platform, TextInput, StatusBar, ScrollView, FlatList, Image, Linking } from 'react-native';
import { SocialIcon } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Navigation from '../components/navigation/navigation';
import { AuthContext } from '../navigation/AuthProvider';
import Cog from '../components/Cog';
// import Settings from '../components/settings/settings';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { ImageBackground, LogBox } from 'react-native';
import AutoHeightImage from 'react-native-auto-height-image';

import { db } from '../components/Firebase/firebase';

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
];


const Post = ({ item }) => (
    <View style={styles.post}>
        <Text style={styles.text_title}>{item.post.postTitle}</Text>

        {/* Check category for post label */}
        {(function () {
            if (item.post.category == 'mtrep') {
                return <Text style={[styles.postLabel, { color: '#747A21' }]}>Montana Repertory Theatre</Text>
            } else if (item.post.category == 'goplay') {
                return <Text style={[styles.postLabel, { color: '#cc8a05' }]}>Go Play!</Text>
            } else if (item.post.subHeader == null || item.post.subHeader == '' || item.post.subHeader == ' ') {
                return <Text style={[styles.postLabel, { color: '#A5580C' }]}>Community</Text>
            } else {
                return <Text style={[styles.postLabel, { color: '#A5580C' }]}>

                    {item.post.subHeader}

                </Text>
            }
        })()}


        {/* Check for Image */}
        {(function () {
            if (item.post.photoUrl == '' || item.post.photoUrl == null) {
                return <></>
            } else {
                return <View style={{ flex: 1 }}>
                    <View style={{flexDirection: 'row', paddingTop: 20}}>
                    <AutoHeightImage source={{ uri: item.post.photoUrl }} width={280}/>
                    </View>
                </View>
            }
        })()}

        <Text allowFontScaling style={styles.subtext}>{item.post.postBody}</Text>

        {/* Check for Link */}
        {(function () {
            if (item.post.link == '' || item.post.link == null) {
                return <></>
            } else {
                if (item.post.linkName == '' || item.post.linkName == null) {
                    return (
                        <TouchableOpacity onPress={() => {
                            Linking.openURL(item.post.link)
                                .catch(err => {
                                    console.error("Failed opening page because: ", err);
                                    alert('Failed to open page');
                                })
                        }}>
                            <Text style={[styles.postLabel, { color: 'grey' }]}>Learn More</Text>
                        </TouchableOpacity>
                    )
                } else {
                    return (
                        <TouchableOpacity onPress={() => {
                            Linking.openURL(item.post.link)
                                .catch(err => {
                                    console.error("Failed opening page because: ", err);
                                    alert('Failed to open page');
                                })
                        }}>
                            <Text style={[styles.postLabel, { color: 'grey' }]}>{item.post.linkName}</Text>
                        </TouchableOpacity>
                    )
                }
            }
        })()}

    </View>
);



export default ({ navigation }) => {
    // Filter Posts 
    const [greenAnimation, setGreenAnimation] = useState('fadeOut');
    const [goldAnimation, setGoldAnimation] = useState('fadeOut');
    const [redAnimation, setRedAnimation] = useState('fadeOut');
    const [greenSize, setGreenSize] = useState(1.5);
    const [goldSize, setGoldSize] = useState(1.5);
    const [redSize, setRedSize] = useState(1.5);

    const scroll = useRef(null);

    const [postData, setPostData] = useState([]);
    const [postView, setPostView] = useState([]);
    const commPosts = postData.filter(function (posts) { return posts.post.category !== 'mtrep' && posts.post.category !== 'goplay'; });
    const mtrepPosts = postData.filter(function (posts) { return posts.post.category == 'mtrep'; });
    const goplayPosts = postData.filter(function (posts) { return posts.post.category == 'goplay'; });

    const [filter, setFilter] = useState("all");

    useEffect(() => {
        db.collection("posts").orderBy("timestamp", "desc").onSnapshot((snapshot) => {
            /* BUG FIX: This data has to be set directly to run posts. Unsure why*/
            setPostData(snapshot.docs.map((doc) => ({ id: doc.id, post: doc.data() })));
            setPostView(snapshot.docs.map((doc) => ({ id: doc.id, post: doc.data() })));
            //setPostView(postData);
        })
    }, [])

    // useEffect(() => {
    //     setPostView(postData);    
    // }, [postData])

    function filterPosts(type) {
        scroll.current.scrollToOffset({ offset: ITEM_HEIGHT, animated: true })
        if (filter !== type) {
            if (type == "mtrep") {
                setFilter("mtrep");
                setPostView(mtrepPosts);
                selectGreen();
                setGreenSize(0);
                setGoldSize(1.5);
                setRedSize(1.5);
            } else if (type == "goplay") {
                setFilter("goplay");
                setPostView(goplayPosts);
                selectGold();
                setGreenSize(1.5);
                setGoldSize(0);
                setRedSize(1.5);
            } else if (type == "comm") {
                setFilter("comm");
                setPostView(commPosts);
                selectRed();
                setGreenSize(1.5);
                setGoldSize(1.5);
                setRedSize(0);
            }
        } else {
            setFilter("all");
            setPostView(postData);
            setGreenSize(1.5);
            setGoldSize(1.5);
            setRedSize(1.5);
        }
    }

    function selectGreen() {
        setGreenAnimation("fadeIn");
        setTimeout(function () { setGreenAnimation("fadeOutLeft"); }, 2000);
    }

    function selectGold() {
        setGoldAnimation("fadeIn");
        setTimeout(function () { setGoldAnimation("fadeOutLeft"); }, 2000);
    }

    function selectRed() {
        setRedAnimation("fadeIn");
        setTimeout(function () { setRedAnimation("fadeOutLeft"); }, 2000);
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


        return (
            <Post
                item={item}
            />
        );

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
            data={postView}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            ListHeaderComponent={renderHeader}
            ListFooterComponent={renderFooter}
            ItemSeparatorComponent={renderItemSeparator}
            ListEmptyComponent={renderEmpty}
        />

        <Cog onPress={() => navigation.navigate('Settings')} />
        <View style={{ position: "absolute", left: ITEM_WIDTH - 63, flexDirection: 'column', alignItems: 'flex-end', padding: 10, paddingTop: 55 }}>
            <Animatable.View animation={greenAnimation} duration={500} style={[{ backgroundColor: '#747A21', position: "absolute", left: -107, top: 65, width: 117, paddingLeft: 5, paddingRight: 5, borderRadius: 5 }]}><Text style={[styles.postLabel, { color: "white" }]}>Montana Rep</Text></Animatable.View>
            <TouchableOpacity onPress={() => filterPosts('mtrep')}><Animated.View style={[styles.postNavi, { backgroundColor: '#747A21', borderColor: "#0000", borderWidth: greenSize }]}></Animated.View></TouchableOpacity>
            <Animatable.View animation={goldAnimation} duration={500} style={[{ backgroundColor: '#cc8a05', position: "absolute", left: -65, top: 109, width: 75, paddingLeft: 5, paddingRight: 5, borderRadius: 5 }]}><Text style={[styles.postLabel, { color: "white" }]}>Go Play!</Text></Animatable.View>
            <TouchableOpacity onPress={() => filterPosts('goplay')}><Animated.View style={[styles.postNavi, { backgroundColor: '#cc8a05', borderColor: "#0000", borderWidth: goldSize }]}></Animated.View></TouchableOpacity>
            <Animatable.View animation={redAnimation} duration={500} style={[{ backgroundColor: '#A5580C', position: "absolute", left: -92, top: 152, width: 102, paddingLeft: 5, paddingRight: 5, borderRadius: 5 }]}><Text style={[styles.postLabel, { color: "white" }]}>Community</Text></Animatable.View>
            <TouchableOpacity onPress={() => filterPosts('comm')}><Animated.View style={[styles.postNavi, { backgroundColor: '#A5580C', borderColor: "#0000", borderWidth: redSize }]}></Animated.View></TouchableOpacity>
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
        minWidth: 13,
        minHeight: 13,
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