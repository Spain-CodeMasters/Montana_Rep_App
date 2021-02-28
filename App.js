import 'react-native-gesture-handler';
import React, {useState, useEffect} from 'react';
import {Text, View, Button, ActivityIndicator} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
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

// import AsyncStorage from '@react-native-community/async-storage';

const AppStack = createStackNavigator();

const App = () => {
 
  // const [isFirstLaunch, setIsFirstLaunch] = React.useState(null);

  // useEffect(()=> {
  //   AsyncStorage.getItem('alreadyLaunched').then(value =>{
  //    if(value == null) {
  //       AsyncStorage.setItem('alreadyLaunched', 'true');
  //       setIsFirstLaunch(true);
  //     } else {
  //       setIsFirstLaunch(false);
  //     }
  //   });
  // }, []);

  // if ( isFirstLaunch === null) {
  //   return null;
  // } else if ( isFirstLaunch === true) {
    return <SafeAreaProvider><Providers /></SafeAreaProvider>
    //   <NavigationContainer>
    //       <AppStack.Navigator
    //         headerMode="none"
    //       >
    //         <AppStack.Screen name="Onboarding" component={OnboardingScreen} />
    //         <AppStack.Screen name="Sign In" component={SignInScreen} />
  
    //       </AppStack.Navigator>
    //   </NavigationContainer>
    // );
//   } else {
//     return <SignInScreen />
//   }
}

export default App;


