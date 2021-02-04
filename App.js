import 'react-native-gesture-handler';
import React, {useState, useEffect} from 'react';
import {Text, View, Button, ActivityIndicator} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import auth from '@react-native-firebase/auth';
// import { createStackNavigator, createAppContainer } from 'react-navigaton';

import RootStackScreen from './screens/RootStackScreen';
// import NotifyScreen from './screens/NotifyScreen';
import Navigation from './components/navigation/navigation';
import Settings from './components/settings/settings';
import HomeScreen from './screens/HomeScreen';


import Providers from './screens/navigation';

const App = () => {
  return <Providers />;
}

export default App;


// const Stack = createStackNavigator();



// function App() {
//   //Set initializing state while Firebase connects
//   const [initializing, setInitializing] = useState(true);
//   const [user, setUser] = useState(null);

//   //Handle user state changes
//   // function onAuthStateChanged(user) {
//   //   setUser(user);
//   //   if (initializing) setInitializing(false);
//   // }

//   useEffect(()=> {
//     // const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
//     // return subscriber; //unsubscribe on unmount
//     setTimeout(()=> {
//       setInitializing(false);
//     }, 1000);
//     }, []);

//   // if (initializing) return null;

//   if (initializing) {
//     return (
//       <View>
//         <ActivityIndicator size="large" />
//       </View>
//     );
//   }

//   return (
//     <View>
//       <NavigationContainer>
//       {/* <Stack.Screen name="HomeScreen" component={HomeScreen} /> */}
      
//         <RootStackScreen/>
      
//       </NavigationContainer>
//     </View>
//   );
//   }


  

//   return (
//     <NavigationContainer>
      
//       {/* <Stack.Navigator initialRouteName="Home">
//         <Stack.Screen name="Home" component={HomeScreen} />
//         <Stack.Screen name="Map" component={MapScreen} />
//       </Stack.Navigator> */}
//     </NavigationContainer>
//     // <Settings />
//     // <Navigation />
//   );
// }

// export default App;
