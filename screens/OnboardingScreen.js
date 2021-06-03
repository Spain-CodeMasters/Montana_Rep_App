import React from 'react';
import { View, Text, Button, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';

import { useSafeAreaInsets } from 'react-native-safe-area-context';


import { SafeAreaProvider } from 'react-native-safe-area-context';


const OnboardingScreen = ({ navigation }) => {

    const safeAreaInsets = useSafeAreaInsets();
    return (
        <SafeAreaProvider style={{
            flex: 1,
            paddingBottom: safeAreaInsets.bottom,
            paddingLeft: safeAreaInsets.left,
            paddingRight: safeAreaInsets.right,
        }}>
            <Onboarding
                titleStyles={{ fontFamily: 'FuturaPT-Demi' }}
                subTitleStyles={{ fontFamily: 'FuturaPT-Medium', fontSize: 20 }}
                onSkip={() => navigation.replace('Login', { screen: "LoginScreen" })}
                onDone={() => navigation.navigate('Login', { screen: "LoginScreen" })}
                pages={[
                    {
                        backgroundColor: '#004E47',
                        image: <Image source={require('../assets/logo.png')} style={{ height: 300, width: 145 }} />,
                        title: 'Welcome',
                        subtitle: 'To the Montana Repertory Theatre GoPlay! App.',

                    },
                    {
                        backgroundColor: '#747A21',

                        image: <Image source={require('../assets/group34.png')} />,
                        title: 'Check for local plays in your area',
                        subtitle: 'Visit real world locations to listen or watch new content.',
                    },
                    {
                        backgroundColor: '#CD9A36',
                        image: <Image source={require('../assets/group35.png')} />,
                        title: 'Check out Community Events',
                        subtitle: 'View content from our community partners. See events happening right now.',
                    },
                    {
                        backgroundColor: '#004E47',
                        image: <Image source={require('../assets/GoPlay_LogoGreen-03.png')} style={{ height: 220, width: 400 }} />,
                        title: 'Get ready for GoPlay!',
                        subtitle: '',
                    },

                ]}
            />
        </SafeAreaProvider>
    );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
    containerStyles: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }


});