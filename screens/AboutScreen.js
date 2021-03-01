import React, { useState, useContext,  } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform, StatusBar } from 'react-native';


export default() => {
    return(
        <View style={styles.container}>
            <View>
                 <Text style={styles.subtext}>Information about GoPlay! and Montana Repertory Theatre can go here.</Text>
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
    