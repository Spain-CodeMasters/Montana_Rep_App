import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import MapScreen from '../screens/MapScreen';
import ScheduleScreen from '../screens/ScheduleScreen';
import PlayScreen from '../screens/PlayScreen';
import SponsorScreen from '../screens/SponsorScreen';

import SettingsScreen from '../screens/SettingsScreen';

import PrivacyScreen from '../screens/PrivacyScreen';
import TermsScreen from '../screens/TermsScreen';
import AboutScreen from '../screens/AboutScreen';
import ChangePasswordScreen from '../screens/ChangePasswordScreen';
import UpdateAccountScreen from '../screens/UpdateAccountScreen';

import { SafeAreaProvider } from 'react-native-safe-area-context';


const Stack = createStackNavigator();
export default function HomeStack() {
  return (
    <SafeAreaProvider>
    <Stack.Navigator >
      <Stack.Screen name='Home' component={HomeScreen} options={{ header: () => null }}/>
      <Stack.Screen name='Settings' component={SettingsScreen} options={{ header: () => null}}/>
      <Stack.Screen name='Map' component={MapScreen} options={{ header: () => null }}/>
      <Stack.Screen name='Schedule' component={ScheduleScreen} options={{ header: () => null }}/>
      <Stack.Screen name='Play' component={PlayScreen} options={{ header: () => null }}/>
      <Stack.Screen name='Sponsor' component={SponsorScreen} options={{ header: () => null }}/>

      <Stack.Screen name='About' component={AboutScreen} />
      <Stack.Screen name='Privacy Policy' component={PrivacyScreen} />
      <Stack.Screen name='Terms and Conditions' component={TermsScreen} />
      <Stack.Screen name='Change Password' component={ChangePasswordScreen}/>
      <Stack.Screen name='Update Account' component={UpdateAccountScreen}/>
      
    </Stack.Navigator>
    </SafeAreaProvider>
  );
}