import 'react-native-gesture-handler';
import React, { useContext } from 'react';
import { Text, View, Button, StyleSheet, TouchableOpacity, Dimensions, Platform, TextInput, StatusBar, ScrollView, FlatList, Image, SafeAreaView } from 'react-native';
import { SocialIcon } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

// import { CheckBox } from 'react-native-elements'
import Navigation from '../components/navigation/navigation';
import Settings from '../components/settings/settings';

import FormButton from '../components/Forms/FormButton';
import { AuthContext } from '../navigation/AuthProvider';

//Carousel Banner
const { width, height } = Dimensions.get('screen');

const ITEM_WIDTH = width;
const ITEM_HEIGHT = height * .88;

const data = [
    'https://res.cloudinary.com/claire-dev/image/upload/v1612076013/glacier_aqjz96.jpg',
    'https://res.cloudinary.com/claire-dev/image/upload/v1612076013/mountain_nonpge.jpg',
    'https://res.cloudinary.com/claire-dev/image/upload/v1612076013/creek_dadkt3.jpg',
];


export default ({ navigation }) => {
    const { user, logout } = useContext(AuthContext);

    return <SafeAreaView style={styles.container}>
        <ScrollView>
            <StatusBar hidden />
            {/* <View style={styles.container}>
                <Text style={styles.text}>Welcome user {user.uid}</Text>
                <FormButton buttonTitle='Logout' onPress={() => logout()} />
            </View> */}


            {/* Carousel Module */}
            <FlatList
                data={data}
                keyExtractor={(_, index) => index.toString()}
                horizontal
                pagingEnabled
                renderItem={({ item }) => {
                    return <View style={{ width }}>
                        <Image source={{ uri: item }} style={{
                            width: ITEM_WIDTH,
                            height: ITEM_HEIGHT,
                            resizeMode: 'cover'
                        }} />
                    </View>
                }}
            />


            {/* //Our Mission Module */}
            <View style={styles.header}>
                <Text style={styles.text_title}>Our Mission</Text>
                <Text style={styles.subtext}>Montana Repertory Theatre stands at the cross-section of educational and professional theatre, producing work that celebrates,
                engages and challenges the people of Missoula and the state of Montana.</Text>
                <View style={{ flex: 1 }}>
                    <Image source={require('../assets/WotW_043.jpg')} style={{ width: ITEM_WIDTH, height: 275, marginBottom: 30 }}></Image>
                </View>
                <TouchableOpacity onPress={() => navigation.navigate('https://montanarep.com')}>
                    <Text style={styles.subtext_link}>
                        montanarep.com
                  </Text>
                </TouchableOpacity>

                <View style={{ flexDirection: 'row' }}>
                    <SocialIcon type='facebook' onPress={() => navigation.navigate('MapScreen')} />
                    <SocialIcon type='instagram' onPress={() => { alert('instagram'); }} />
                    <SocialIcon type='envelope' onPress={() => { alert('email'); }} />
                </View>


            </View>

            {/* //Go Play Module */}
            <View style={styles.header}>
                <Text style={styles.text_title}>Go Play!</Text>
                <Text style={styles.subtext}>Information about Go Play! Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. </Text>
                {/* <View style={{flex: 1}}>
                    <Image source={require('../assets/WotW_043.jpg')} style={{width: ITEM_WIDTH, height: 275, marginBottom: 30}}></Image>
                </View> */}
            </View>

            {/* //Our Work Module */}
            <View style={styles.header}>
                <Text style={styles.text_title}>Our Work</Text>
                <Text style={styles.subtext}>Information about Go Play! Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. </Text>
                {/* <View style={{flex: 1}}>
                    <Image source={require('../assets/WotW_043.jpg')} style={{width: ITEM_WIDTH, height: 275, marginBottom: 30}}></Image>
                </View> */}
            </View>

            {/* Subscription Module */}
            <View style={styles.header}>
                <View style={styles.subscribe_container}>
                    <Text style={styles.subscribe_header}>Sign Up for Updates!</Text>
                    <Text style={styles.subscribe_text}>Get news from Montana Repertory Theatre in your inbox.</Text>
                    <View style={{ flexDirection: "row", flex: 1, marginBottom: 40, }}>
                        <TextInput
                            placeholder="Your Email Address"
                            style={styles.textInput}
                            autoCapitalize="none"
                        />
                        <TouchableOpacity style={styles.subscribe_button} onPress={() => { alert('Email address sent') }}>
                            <Feather
                                // style={styles.subscribe_button}
                                name="send"
                                color="white"

                                size={25}

                            /></TouchableOpacity>

                    </View>

                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <FontAwesome5
                            name="newspaper"
                            solid
                            color="#D1D1D1"
                            size={150}
                        />
                    </View>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <SocialIcon type='facebook' onPress={() => { alert('facebook'); }} />
                    <SocialIcon type='instagram' onPress={() => { alert('instagram'); }} />
                    <SocialIcon type='envelope' onPress={() => { alert('email'); }} />
                </View>
            </View>

            {/* footer Module */}
            <View style={{ backgroundColor: '#747A21', marginTop: 40 }}>
                <View style={styles.header}>
                    <Image source={require('../assets/WhiteLandscape_Logo.png')} style={styles.footer_logo} />

                    <Text style={styles.footer_text}>©2021 Montana Repertory Theatre</Text>
                    <Text style={styles.footer_text}>All Right Reserved</Text>
                    <View style={{ marginBottom: 70 }}></View>
                </View>

            </View>

        </ScrollView>
        <Settings />
        <Navigation navigation={navigation} />
    </SafeAreaView>
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
    image: {
        width: ITEM_WIDTH,
        height: ITEM_HEIGHT,
        resizeMode: 'cover'
    },
    subscribe_container: {
        flex: 1,
        backgroundColor: '#EBEBEB',
        borderRadius: 9,
        padding: 30,
        margin: 30
    },
    subscribe_header: {
        marginTop: 100,
        textAlign: 'center',
        fontSize: 24,
        fontFamily: 'FuturaPTDemi',
        marginBottom: 40

    },
    subscribe_text: {
        textAlign: 'center',
        fontFamily: 'FuturaPTBook',
        fontSize: 16,
        color: '#737373',
        paddingLeft: 15,
        paddingRight: 15,
        marginBottom: 50
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
    subscribe_button: {
        marginLeft: 10,
        backgroundColor: "#343A3F",
        padding: 12,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
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
        fontSize: 40,
        fontFamily: 'FuturaPTDemi'

    },

    subtext: {
        fontSize: 16,
        fontFamily: 'FuturaPTBook',
        paddingHorizontal: 40,
        marginTop: 30,
        marginBottom: 30,
        lineHeight: 20
    },

    subtext_link: {
        fontSize: 20,
        fontFamily: 'FuturaPTBook',
        color: '#747A21',
        marginBottom: 30
    }


})