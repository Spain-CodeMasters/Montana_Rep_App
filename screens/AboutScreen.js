import React, { useState, useContext,  } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform, StatusBar } from 'react-native';


export default() => {
    return(
        <View style={styles.container}>
            <View>
                 <Text style={styles.header_text}>About</Text>
            </View>
            <View>
                <Text style={styles.subtext}>About Us</Text>
                <View style={styles.horizontal_rule} />
                <Text style={styles.subtext}>Our Social</Text>
                <View style={styles.horizontal_rule} />
                <Text style={styles.subtext}>Provide Feedback</Text>
                <View style={styles.horizontal_rule} />
                <Text style={styles.subtext}>Write Review</Text>
                <View style={styles.horizontal_rule} />
                <Text style={styles.subtext}>Contact Us</Text>

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
