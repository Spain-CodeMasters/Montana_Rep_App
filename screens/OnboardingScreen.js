import React from 'react';
import { View, Text, Button, Image, StyleSheet} from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';


const OnboardingScreen = ({navigation}) => {
    return (
        <Onboarding
        onSkip={()=> navigation.replace("SignInScreen")}
        onDone={()=> navigation.replace("SignInScreen")}
        pages={[
            {
            backgroundColor: '#747A21',
            image: <Image source={require('../assets/logo.png')} />,
            title: 'logo',
            subtitle: 'Done with React Native Onboarding Swiper',
            
            },
            {
            backgroundColor: '#8C2804',
            
            image: <Image source={require('../assets/group34.png')} />,
            title: 'Check for local plays in your area',
            subtitle: 'Done with React Native Onboarding Swiper',
            },
            {
            backgroundColor: '#CD9A36',
            image: <Image source={require('../assets/group35.png')} />,
            title: 'Onboarding_3',
            subtitle: 'Done with React Native Onboarding Swiper',
            },
            
        ]}
        />
    );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        alignItems: 'center',
        justifyContent: 'center',
    }


});