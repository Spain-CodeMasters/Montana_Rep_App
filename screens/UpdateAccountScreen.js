import React, { useState, useContext,  } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform, StatusBar } from 'react-native';
import FancyCard from '../components/FancyCard';


export default() => {
    // firebase.auth().onAuthStateChanged(function(user){
    //     if (user) {
    //         //user is signed in.
    //     } else {
    //         //No user is signed in.
    //     }
    // });

    return(
        <View style={styles.container}>
            <View>
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', margin: 20,}}>
                    <FancyCard 
                    title='Become a Premium Member'
                    onPress={()=> navigation.navigate('Account')}
                    />
                </View>

                <Text style={styles.subtext}>User Profile</Text>

                <Text style={styles.subtext}>Basic Tier</Text>
                <Text style={styles.subtext}>Update Email</Text>
                <Text style={styles.subtext}>Update Name</Text>

            </View>
            
            
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        backgroundColor: '#fff',
        padding: 30,
        },
    
        header_text: {
        fontSize: 24, 
        fontFamily: 'FuturaPTDemi',
        textAlign: 'center',
        color: '#343A3F',
        marginBottom: 50,
        },
        horizontal_rule: {
            borderBottomColor: 'gray',
            borderBottomWidth: 1,
            marginBottom: 30,
            marginTop: 30
        },
        subtext: {
            fontSize: 18,
            fontFamily: 'FuturaPTBook',
        },
    });
    