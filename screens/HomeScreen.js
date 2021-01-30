import 'react-native-gesture-handler';
import * as React from 'react';
import {Text, View, Button, StyleSheet, TouchableOpacity, Dimensions, Platform, TextInput, StatusBar, ScrollView} from 'react-native';
import * as Animatable from 'react-native-animatable';
// import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
// import { CheckBox } from 'react-native-elements'
import Navigation from '../components/navigation/navigation';
import Settings from '../components/settings/settings';

//Splash Banner
//Our Mission
//About GoPlay
//Our Work
//Sign Up for Updates
//Footer

function HomeScreen(){
    return (
    <ScrollView>
       <Settings />
       <Navigation />
    </ScrollView>
    
    );
}

export default HomeScreen;