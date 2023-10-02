import 'react-native-gesture-handler';
import * as React from 'react';
import {Text, View, StyleSheet,} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';



function step_one() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Step One</Text>
      </View>
    );
  }

  function step_two() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Step Two</Text>
      </View>
    );
  }

  function step_three() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Step Three</Text>
      </View>
    );
  }

  const WelcomeStack =createStackNavigator();

  function WelcomeScreen() {
      return (
          <NavigationContainer>
            <Stack.Navigaotr>
                <Stack.Screen name="step_one" component = {step_one} />
                <Stack.Screen name="step_two" component = {step_two} />
                <Stack.Screen name="step_three" component = {step_three} />
            </Stack.Navigaotr>
          </NavigationContainer>
      );
  }

export default WelcomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        backgroundColor: '#fff'
      },
    header: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'yellow',
        // paddingHorizontal: 0,
        paddingTop: 70

    },

    main: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'blue',
        // paddingHorizontal: 0,
        paddingTop: 70

    },

    footer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'red',
        // paddingHorizontal: 0,
        paddingTop: 70

    }

});