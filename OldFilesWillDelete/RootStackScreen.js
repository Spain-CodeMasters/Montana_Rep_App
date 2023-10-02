import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';

import SplashScreen from '../screens/SplashScreen';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import HomeScreen from '../screens/HomeScreen';
import MapScreen from '../screens/MapScreen';
import ScheduleScreen from '../screens/ScheduleScreen';
import PlayScreen from '../screens/PlayScreen';

const RootStack = createStackNavigator();

const RootStackScreen = ({navigation}) => (
    <RootStack.Navigator headerMode='none'>
        <RootStack.Screen name="SplashScreen" component={SplashScreen} />
        <RootStack.Screen name="SignInScreen" component={SignInScreen} />
        <RootStack.Screen name="SignUpScreen" component={SignUpScreen} />
        <RootStack.Screen name="HomeScreen" component={HomeScreen} options={{animationEnabled: false,}}/>
        <RootStack.Screen name="MapScreen" component={MapScreen} options={{animationEnabled: false,}}/>
        <RootStack.Screen name="ScheduleScreen" component={ScheduleScreen} options={{animationEnabled: false,}}/>
        <RootStack.Screen name="PlayScreen" component={PlayScreen} options={{animationEnabled: false,}}/>

    </RootStack.Navigator>

);

export default RootStackScreen;
