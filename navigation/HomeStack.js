import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Navigation from '../components/navigation/navigation';
import HomeScreen from '../screens/HomeScreen';
import MapScreen from '../screens/MapScreen';
import ScheduleScreen from '../screens/ScheduleScreen';
import PlayScreen from '../screens/PlayScreen';
import SponsorScreen from '../screens/SponsorScreen';
import EventScreen from '../screens/EventScreen';

import SettingsScreen from '../screens/SettingsScreen';

import PrivacyScreen from '../screens/PrivacyScreen';
import TermsScreen from '../screens/TermsScreen';
import AboutScreen from '../screens/AboutScreen';
import ChangePasswordScreen from '../screens/ChangePasswordScreen';
import UpdateAccountScreen from '../screens/UpdateAccountScreen';
import OnboardingScreen from '../screens/OnboardingScreen';
import { useSafeAreaInsets } from 'react-native-safe-area-context';


import { SafeAreaProvider } from 'react-native-safe-area-context';


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator tabBar={props => <Navigation {...props} />}>
      <Tab.Screen name='Home' component={HomeScreen} options={{ header: () => null,  }} />
      <Tab.Screen name='Map' component={MapScreen} options={{ header: () => null, gestureEnabled: false}} />
      <Tab.Screen name='Schedule' component={ScheduleScreen} options={{ header: () => null, }} />
    </Tab.Navigator>
  );
}

export default function HomeStack() {
  const safeAreaInsets = useSafeAreaInsets();
  return (
    <SafeAreaProvider style={{
      flex: 1,
      paddingBottom: safeAreaInsets.bottom,
      paddingLeft: safeAreaInsets.left,
      paddingRight: safeAreaInsets.right,
    }}>
      <Stack.Navigator>
      {/* <Stack.Screen name='Onboarding' component={OnboardingScreen} options={{header: () => null}} /> */}
        <Stack.Screen name='Main' component={MainTabs} options={{ header: () => null }} />
        <Stack.Screen name='Play' component={PlayScreen} options={{ header: () => null }} />
        <Stack.Screen name='Sponsor' component={SponsorScreen} options={{ header: () => null }} />
        <Stack.Screen name='Event' component={EventScreen} options={{ header: () => null }} />
        <Stack.Screen name='Settings' component={SettingsScreen} options={{ header: () => null }} />

        <Stack.Screen name='About' component={AboutScreen} />
        <Stack.Screen name='Privacy Policy' component={PrivacyScreen} />
        <Stack.Screen name='Terms and Conditions' component={TermsScreen} />
        <Stack.Screen name='Change Password' component={ChangePasswordScreen} />
        <Stack.Screen name='Update Account' component={UpdateAccountScreen} />
      </Stack.Navigator>
    </SafeAreaProvider>
  );
}