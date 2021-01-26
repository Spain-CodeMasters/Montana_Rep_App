import 'react-native-gesture-handler';
import * as React from 'react';
import {Text, View, Button} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
// import { createStackNavigator, createAppContainer } from 'react-navigaton';

import RootStackScreen from './screens/RootStackScreen';
import WelcomeScreen from './screens/WelcomeScreen';



const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <RootStackScreen/>
      {/* <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Map" component={MapScreen} />
      </Stack.Navigator> */}
    </NavigationContainer>
  );
}

export default App;
