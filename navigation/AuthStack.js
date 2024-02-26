import React, {useEffect, useState} from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SignupScreen from '../screens/SignUpScreen';
import LoginScreen from '../screens/LoginScreen';
import TermsScreen from '../screens/TermsScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import OnboardingScreen from '../screens/OnboardingScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Stack = createStackNavigator();
export default function AuthStack() {

  const [isFirstLaunch, setIsFirstLaunch] = React.useState(null);
  let routeName;

  useEffect(() => {
    AsyncStorage.getItem('alreadyLaunched').then(value => {
      if(value == null) {
        AsyncStorage.setItem('alreadyLaunched', 'true');
        setIsFirstLaunch(true);
      } else if(value != null) {
        setIsFirstLaunch(false);
      } else {
        setIsFirstLaunch(null);
      }
    }); 
  }, []);

  if( isFirstLaunch == null) {
    return null;
  } else if (isFirstLaunch==true) {
    routeName='Onboarding';
  } else {
    routeName='Login';
  }

  return (
    <Stack.Navigator initialRouteName={routeName}>
      <Stack.Screen name='Onboarding' component={OnboardingScreen} options={{header: () => null}} />
      <Stack.Screen name='Login' component={LoginScreen} options={{ header: () => null }}/>
      <Stack.Screen name='Signup' component={SignupScreen} options={{ header: () => null }} />
      <Stack.Screen name='ForgotPasswordScreen' component={ForgotPasswordScreen} options={{ headerTitle: false }} />
      <Stack.Screen name='TermsScreen' component={TermsScreen} options={{ headerTitle: false }} />
    </Stack.Navigator>
  );
}