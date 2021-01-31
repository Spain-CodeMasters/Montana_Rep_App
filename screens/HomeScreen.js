import 'react-native-gesture-handler';
import * as React from 'react';
import {Text, View, Button, StyleSheet, TouchableOpacity, Dimensions, Platform, TextInput, StatusBar, ScrollView, FlatList, Image} from 'react-native';
import {SocialIcon} from 'react-native-elements';
import * as Animatable from 'react-native-animatable';
// import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
// import { CheckBox } from 'react-native-elements'
import Navigation from '../components/navigation/navigation';
import Settings from '../components/settings/settings';

//Carousel Banner
const {width, height} = Dimensions.get('screen');

const ITEM_WIDTH = width;
const ITEM_HEIGHT = height * .75;

const images = [
    '../assets/glacier.jpg',
    '../assets/mountain.jpg',
    '../assets/creek.jpg',

];


export default () => {
    return <ScrollView style={styles.container}>
        <StatusBar hidden/>
        <Settings />
        <Navigation />
        
        {/* Carousel Module */}
        {/* <FlatList 
            data={images}
            // keyExtractor={item => item.id}
            renderItem={({item}) => {
                return <View>
                    <Image source={{uri: item}} style={styles.image}/>
                </View>
            }}
        /> */}

        {/* //Our Mission Module */}
        <View style={styles.header}>
            <Text style={styles.text_title}>Our Mission</Text>
            <Text style={styles.subtext}>Montana Repertory Theatre stands at the cross-section of educational and professional theatre, producing work that celebrates, 
                engages and challenges the people of Missoula and the state of Montana.</Text>
                <View style={{flex: 1}}>
                    <Image source={require('../assets/WotW_043.jpg')} style={{width: ITEM_WIDTH, height: 275, marginBottom: 30}}></Image>
                </View>
                <TouchableOpacity onPress={()=> navigation.navigate('https://montanarep.com')}>
                  <Text style={styles.subtext_link}> 
                    montanarep.com
                  </Text>
                </TouchableOpacity>

                <View style={{flexDirection: 'row'}}>
                    <SocialIcon  type='facebook' onPress={() =>{alert('facebook');}}/>
                    <SocialIcon  type='instagram'onPress={() =>{alert('instagram');}}/>
                     <SocialIcon type='envelope'onPress={() =>{alert('email');}}/>
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
            <Text>Sign Up for Updates</Text>
            <View style={{flexDirection: 'row'}}>
                    <SocialIcon  type='facebook' onPress={() =>{alert('facebook');}}/>
                    <SocialIcon  type='instagram'onPress={() =>{alert('instagram');}}/>
                     <SocialIcon type='envelope'onPress={() =>{alert('email');}}/>
                </View>
        </View>

        {/* footer Module */}
        <View style={{backgroundColor:'#747A21', marginTop: 40}}>
            <View style={styles.header}>
            <Image source={require('../assets/WhiteLandscape_Logo.png')}  style={styles.footer_logo} />
            
            <Text style={styles.footer_text}>©2021 Montana Repertory Theatre</Text>
            <Text style={styles.footer_text}>All Right Reserved</Text>
            <View style={{marginBottom: 70}}></View>
            </View>

        </View>

    </ScrollView>
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