import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';

// import SplashScreen from './SplashScreen';
// import SignInScreen from './SignInScreen';
// import SignUpScreen from './SignUpScreen';
import HomeScreen from '../screens/HomeScreen';
import MapScreen from '../screens/MapScreen';

const Stack = createStackNavigator();

const AppStack = () => {
    return(
    <Stack.Navigator headerMode='none'>
        {/* <RootStack.Screen name="SplashScreen" component={SplashScreen} />
        <RootStack.Screen name="SignInScreen" component={SignInScreen} />
        <RootStack.Screen name="SignUpScreen" component={SignUpScreen} /> */}
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <RootStack.Screen name="MapScreen" component={MapScreen} />
    </Stack.Navigator>

);

}
export default AppStack;