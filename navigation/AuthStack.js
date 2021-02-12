import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import SignUpScreen from '../screens/SignUpScreen';
import SignInScreen from '../screens/SignInScreen';
import SplashScreen from '../screens/SplashScreen';
import OnboardingScreen from "../screens/OnboardingScreen";

import FontAwesome from 'react-native-vector-icons/FontAwesome';

import AsyncStorage from '@react-native-community/async-storage';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Stack = createStackNavigator();

const AuthStack = () => {
    const [isFirstLaunch, setIsFirstLaunch] = useState(null);
    let routeName;

useEffect(()=> {
    AsyncStorage.getItem('alreadyLaunched').then((value) => {
        if (value == null) {
            AsyncStorage.setItem('alreadyLaunched', 'true');
            setIsFirstLaunch(true);
        } else {
            setIsFirstLaunch(false);
        }
});
}, []);

if (isFirstLaunch === null) {
    return null;
}else if (isFirstLaunch == true) {
    // routeName = 'SplashScreen';
    routeName = 'Onboarding';
} else {
    routeName = 'Login';
}

return (
    <Stack.Navigator initialRouteName={routeName}>
        {/* <Stack.Screen
            name="SplashScreen"
            component={SplashScreen}
            options={{header: () => null}}
        /> */}
        <Stack.Screen 
            name="Onboarding"
            component={OnboardingScreen}
            options={{header: () => null}}
        />
        <Stack.Screen 
            name="SignInScreen"
            component={SignInScreen}
            options={{header: () => null}}
        />
        <Stack.Screen 
            name="SignUpScreen" 
            component={SignUpScreen} 
            options={({navigation}) => ({
                title: '',
                headerStyle: {
                    shadowColor: 'white',
                    elevation: 0,
                },
                headerLeft: () => (
                    <View style= {{marginLeft: 10}}>
                        <FontAwesome.Button
                        name= "long-arrow-left"
                        size={25}
                        backgroundColor='white'
                        color='#333'
                        onPress={() => navigation.navigate('SignInScreen')}
                        />
                    </View>
                )
            })}  
        />
    </Stack.Navigator>
);
};

export default AuthStack