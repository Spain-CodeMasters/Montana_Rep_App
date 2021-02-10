import React from 'react';
import { View, Text, Button, StyleSheet} from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';

const OnboardingScreen = ({navigation}) => {
    return (
        <Onboarding
        pages={[
            {
            backgroundColor: '#747A21',
            // image: <Image source={require('./images/circle.png')} />,
            title: 'Onboarding_1',
            subtitle: 'Done with React Native Onboarding Swiper',
            },
            {
            backgroundColor: '#CD9A36',
            // image: <Image source={require('./images/circle.png')} />,
            title: 'Onboarding_2',
            subtitle: 'Done with React Native Onboarding Swiper',
            },
            {
            backgroundColor: '#A5580C',
            // image: <Image source={require('./images/circle.png')} />,
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