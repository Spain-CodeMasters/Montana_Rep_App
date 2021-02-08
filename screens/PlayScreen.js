import 'react-native-gesture-handler';
import * as React from 'react';
import {Text, View, Button, StyleSheet, TouchableOpacity, Dimensions, Platform, TextInput, StatusBar, ScrollView, FlatList, Image, SafeAreaView, ImageBackground} from 'react-native';
import {SocialIcon} from 'react-native-elements';
import * as Animatable from 'react-native-animatable';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import Navigation from '../components/navigation/navigation';
import Settings from '../components/settings/settings';

const {width, height} = Dimensions.get('screen');

const ITEM_WIDTH = width;
const ITEM_HEIGHT = height * .90;


import playImage from '../assets/mountain.jpg';

var author = 'Author';

export default ({navigation}) => {
    return <SafeAreaView style={styles.container}>
        <ScrollView>
        <StatusBar hidden/>
        
        

       
                   <ImageBackground source={playImage} style={styles.image}>
                   <View style={styles.overlay}>
                        <Text style={styles.title}>Test</Text>
                        
                        </View>
                    </ImageBackground>
        

        {/* //Our Mission Module */}
        <View style={styles.header}>
            <Text style={styles.text_title}>Test</Text>
            <Text style={styles.author}>Written by {author}</Text>
            <Text style={styles.subtext}>Play Discription</Text>

                
        </View>
       
        {/* footer Module */}

            <View style={styles.footer}>
            <Image source={require('../assets/1_MontanaRep_PrimaryLogo_GreenLandscape.png')}  style={styles.footer_logo} />
 
            </View>



    </ScrollView>
    <Settings />
    <Navigation navigation={navigation}/>
    </SafeAreaView>
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        backgroundColor: '#fff'
      },
      overlay: {
        backgroundColor:'rgba(0, 0, 0, 0.3)',
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
      header: {
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'center',
        margin: 45

      },
    image: {
        width: ITEM_WIDTH,
        height: ITEM_HEIGHT,
        resizeMode: 'cover'
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
        fontSize: 30,
        letterSpacing: 5,
      }


})