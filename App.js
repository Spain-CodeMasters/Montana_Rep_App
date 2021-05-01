import 'react-native-gesture-handler';
import React, {useState, useEffect} from 'react';
import {Text, View, Button, ActivityIndicator} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import auth from '@react-native-firebase/auth';

<<<<<<< ours
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
=======
import React from 'react';
import type {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

const Section = ({children, title}): Node => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
};

const App: () => Node = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Header />
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <Section title="Step One">
            Edit <Text style={styles.highlight}>App.js</Text> to change this
            screen and then come back to see your edits.
          </Section>
          <Section title="See Your Changes">
            <ReloadInstructions />
          </Section>
          <Section title="Debug">
            <DebugInstructions />
          </Section>
          <Section title="Learn More">
            Read the docs to discover what to do next:
          </Section>
          <LearnMoreLinks />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});
>>>>>>> theirs

export default App;


