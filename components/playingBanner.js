import React, { Component } from 'react';
import 'react-native-gesture-handler';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image,
  TouchableOpacity,
} from 'react-native';

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#747A21',
    }

});

class PlayingBanner extends Component {
    render () {
        return (
            <View styles={styles.container}>
                <Text>Now Playing:</Text>
                <Text>The Book of Life - by March</Text>
                <Text> 3:12</Text>
            </View>

        );
    }
}

export default PlayingBanner;
