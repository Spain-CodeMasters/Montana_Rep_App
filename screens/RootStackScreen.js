import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';

import SplashScreen from './SplashScreen';
import SignInScreen from './SignInScreen';
import SignUpScreen from './SignUpScreen';
import HomeScreen from './HomeScreen';
import MapScreen from './MapScreen';
import ScheduleScreen from './ScheduleScreen';
import PlayScreen from './PlayScreen';

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
