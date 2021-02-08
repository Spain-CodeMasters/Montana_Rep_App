import 'react-native-gesture-handler';
import * as React from 'react';
import {
    Text, 
    View, 
    Button, 
    StyleSheet, 
    TouchableOpacity, 
    Dimensions, 
    Platform, 
    TextInput, 
    StatusBar, 
    ScrollView, 
    FlatList, 
    Image, 
    SafeAreaView,
    ImageBackground
} from 'react-native';
import {SocialIcon} from 'react-native-elements';
import * as Animatable from 'react-native-animatable';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

// import { CheckBox } from 'react-native-elements'
import Navigation from '../components/navigation/navigation';
import Settings from '../components/settings/settings';

const {width, height} = Dimensions.get('screen');

const ITEM_WIDTH = width;
const ITEM_HEIGHT = height * .90;

export default ({navigation}) => {
    return <SafeAreaView style={styles.container}>
        <ScrollView>
        <StatusBar hidden/>
        
       

        {/* PLAYS */}
        <View style={styles.header}>
               
        
                    <ImageBackground source={require('../assets/WotW_043.jpg')} style={styles.play}>
                    <TouchableOpacity style={styles.play} onPress={()=> navigation.navigate('PlayScreen')}>
                        <View style={styles.overlay}>
                        <Text style={styles.title}>Test</Text>
                        </View>
                        </TouchableOpacity>
                    </ImageBackground>
                    
            
                    <ImageBackground source={require('../assets/mountain.jpg')} style={styles.play}>
                    <TouchableOpacity style={styles.play} onPress={()=> navigation.navigate('PlayScreen')}>

                    <View style={styles.overlay}>
                        
                        <Text style={styles.title}>Test</Text>
                        </View>
                        </TouchableOpacity>
                    </ImageBackground>


                
        </View>

      

    </ScrollView>
    <Settings />
    <Navigation navigation={navigation}/>
    </SafeAreaView>
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        backgroundColor: '#222'
      },
      overlay: {
        backgroundColor:'rgba(0, 0, 0, 0.3)',
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
      header: {
          flex: 1,
        alignItems: 'center',
        justifyContent: 'center',

      },
      play: {
        flex: 1,
        width: ITEM_WIDTH,
        height: 200,
        alignItems: 'center',
        justifyContent: 'center',
    
      },
      title: {
        color: '#fff',
        textTransform: 'uppercase',
        fontFamily: 'FuturaPTDemi',
        fontSize: 30,
        letterSpacing: 5,
      }

})