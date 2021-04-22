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
    FlatList,
    Image,
    Linking,
    ImageBackground,
    LogBox
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Navigation from '../components/navigation/navigation';
import Cog from '../components/Cog';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AutoHeightImage from 'react-native-auto-height-image';

import { db } from '../components/Firebase/firebase';

//Carousel Banner
const { width, height } = Dimensions.get('screen');

const ITEM_WIDTH = width;
const ITEM_HEIGHT = height * 0.88;


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
            if (item.post.photoUrl == '' || item.post.photoUrl == ' ' || item.post.photoUrl == null) {
                return <></>
            } else {
                return <View style={{ flex: 1 }}>
                    <View style={{ flexDirection: 'row', paddingTop: 20 }}>
                        <AutoHeightImage source={{ uri: item.post.photoUrl }} width={ITEM_WIDTH * 0.7} />
                    </View>
                </View>
            }
        })()}

        <Text allowFontScaling style={styles.subtext}>{item.post.postBody}</Text>

        {/* Check for Link */}
        {(function () {
            if (item.post.link == '' || item.post.link == ' ' || item.post.link == null) {
                return <></>
            } else {
                if (item.post.linkName == '' || item.post.linkName == ' ' || item.post.linkName == null) {
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
    const [heroData, setHeroData] = useState([]);
    const [filter, setFilter] = useState("all");

    useEffect(() => {
        db.collection("posts").orderBy("timestamp", "desc").onSnapshot((snapshot) => {
            /* BUG FIX: This data has to be set directly to run posts. Unsure why*/
            setPostData(snapshot.docs.map((doc) => ({ id: doc.id, post: doc.data() })));
            setPostView(snapshot.docs.map((doc) => ({ id: doc.id, post: doc.data() })));
            //setPostView(postData);
        })
        db.collection("carousel").orderBy("carouselOrder", "asc").onSnapshot((snapshot) => {
            setHeroData(snapshot.docs.map((doc) => ({ id: doc.id, hero: doc.data() })));
        })
    }, [])


    function filterPosts(type) {
        scroll.current.scrollToOffset({ offset: ITEM_HEIGHT, animated: true });
        if (filter !== type) {
            if (type == "mtrep") {
                setFilter("mtrep");
                setPostView(postData.filter(function (posts) { return posts.post.category == 'mtrep'; }));
                selectGreen();
                setGreenSize(0);
                setGoldSize(1.5);
                setRedSize(1.5);
            } else if (type == "goplay") {
                setFilter("goplay");
                setPostView(postData.filter(function (posts) { return posts.post.category == 'goplay'; }));
                selectGold();
                setGreenSize(1.5);
                setGoldSize(0);
                setRedSize(1.5);
            } else if (type == "comm") {
                setFilter("comm");
                setPostView(postData.filter(function (posts) { return posts.post.category !== 'mtrep' && posts.post.category !== 'goplay'; }));
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

        return <View>
            {/* Carousel Module */}
            <FlatList
                data={heroData}
                keyExtractor={(item) => item.id}
                horizontal
                pagingEnabled
                renderItem={({ item }) => {
                    return <View style={{ width }}>
                        <ImageBackground source={{ uri: item.hero.backgroundImg }} style={styles.image} >
                            <View style={styles.overlay}>
                                <View style={{ flex: 1, marginTop: 200 }}>
                                    <Image source={{ uri: item.hero.logo }} style={{
                                        flex: 1,
                                        aspectRatio: 1,
                                        resizeMode: 'center',
                                    }} />
                                </View>
                                <View style={{ flex: 1 }}>
                                    <TouchableOpacity onPress={() => {
                                        Linking.openURL(item.hero.buttonLink)
                                            .catch(err => {
                                                console.error("Failed opening page because: ", err);
                                                alert('Failed to open page');
                                            })
                                    }}>
                                        <View style={styles.button}>
                                            <Text style={styles.buttonText}>{item.hero.buttonText}</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>

                        </ImageBackground>
                    </View>
                }}
            />


            <Animatable.View animation="slideInDown" easing="ease-in" iterationCount={'infinite'} direction="alternate" style={{ position: 'absolute', top: ITEM_HEIGHT * 0.9, left: ITEM_WIDTH / 2 - 18 }}>
                <TouchableOpacity onPress={() => scroll.current.scrollToOffset({ offset: ITEM_HEIGHT, animated: true })}>
                    <FontAwesome5
                        name="chevron-down"
                        solid
                        color="white"
                        size={40}
                    />
                </TouchableOpacity>

            </Animatable.View>

            {/* PINNED POST */}
            <FlatList
                data={postData.filter(function (posts) { return posts.post.pinned == true; })}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                ItemSeparatorComponent={renderItemSeparator}
                ListFooterComponent={renderItemSeparator}

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
                <Image source={require('../assets/CAMLogo.png')} style={styles.cam_logo} />
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity onPress={() => {
                        Linking.openURL("https://www.facebook.com/MontanaRep")
                            .catch(err => {
                                console.error("Failed opening page because: ", err);
                                alert('Failed to open page');
                            })
                    }}>
                        <FontAwesome5 name='facebook' solid color="#fff" size={30} style={{ padding: 10, }} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                        Linking.openURL("https://www.instagram.com/mtreptheatre/?hl=en")
                            .catch(err => {
                                console.error("Failed opening page because: ", err);
                                alert('Failed to open page');
                            })
                    }}>
                        <FontAwesome5 name='instagram' solid color="#fff" size={30} style={{ padding: 10, }} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                        Linking.openURL("https://www.instagram.com/mtreptheatre/?hl=en")
                            .catch(err => {
                                console.error("Failed opening page because: ", err);
                                alert('Failed to open page');
                            })
                    }}>
                        <FontAwesome5 name='envelope' solid color="#fff" size={30} style={{ padding: 10, }} onPress={() => { alert('email'); }} />
                    </TouchableOpacity>
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
        paddingBottom: safeAreaInsets.bottom,
        paddingLeft: safeAreaInsets.left,
        paddingRight: safeAreaInsets.right,
    }}>

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
        width: 212,
        height: 90,
    },
    cam_logo: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 50,
        marginBottom: 30,
        width: 300,
        height: 20,
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
    },


})