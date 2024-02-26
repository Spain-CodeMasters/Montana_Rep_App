import 'react-native-gesture-handler';
import React, {useState, useEffect} from 'react';
import {Text, View, Button, ActivityIndicator, LogBox, StyleSheet} from 'react-native';
// import {NavigationContainer} from '@react-navigation/native';
// import {createStackNavigator} from '@react-navigation/stack';
import auth from '@react-native-firebase/auth';

// import { createStackNavigator, createAppContainer } from 'react-navigaton';

// import RootStackScreen from './screens/RootStackScreen';
// import NotifyScreen from './screens/NotifyScreen';
// import Navigation from './components/navigation/navigation';
// import Settings from './components/settings/settings';
// import HomeScreen from './screens/HomeScreen';

import { SafeAreaProvider } from 'react-native-safe-area-context';
import Providers from './navigation/index';
// import AppStack from './navigation/AppStack';

import AsyncStorage from '@react-native-async-storage/async-storage';

// const AppStack = createStackNavigator();



const App = () => {
  LogBox.ignoreAllLogs();
  LogBox.ignoreLogs(['Warning: AsyncStorage has been extracted from react-native core and will be removed in a future release. It can now be installed and imported from @react-native-async-storage/async-storage instead of react-native. See https://github.com/react-native-async-storage/async-storage']);
    return <SafeAreaProvider><Providers /></SafeAreaProvider>

}

export default App;
