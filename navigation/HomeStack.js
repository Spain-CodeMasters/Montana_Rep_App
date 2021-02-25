import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import MapScreen from '../screens/MapScreen';
import ScheduleScreen from '../screens/ScheduleScreen';
import PlayScreen from '../screens/PlayScreen';
import AccountScreen from '../screens/AccountScreen'
import Settings from '../components/settings/settings'
import { SafeAreaProvider } from 'react-native-safe-area-context';

const Stack = createStackNavigator();
export default function HomeStack() {
  return (
    <SafeAreaProvider>
    <Stack.Navigator >
      <Stack.Screen name='Home' component={HomeScreen} options={{ header: () => null }}/>
      <Stack.Screen name='Map' component={MapScreen} options={{ header: () => null }}/>
      <Stack.Screen name='Schedule' component={ScheduleScreen} options={{ header: () => null }}/>
      <Stack.Screen name='Play' component={PlayScreen} options={{ header: () => null }}/>
      <Stack.Screen name='Account' component={AccountScreen} options={{ header: () => null }}/>
      <Stack.Screen name='Settings' component={Settings} options={{ header: () => null }}/>
    </Stack.Navigator>
    </SafeAreaProvider>
  );
}