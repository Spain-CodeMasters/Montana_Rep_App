import 'react-native-gesture-handler';
import React, { useState } from 'react';
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

import Navigation from '../components/navigation/navigation';
import Settings from '../components/settings/settings';

const { width, height } = Dimensions.get('screen');

const ITEM_WIDTH = width;
const ITEM_HEIGHT = height * .90;

const PLAY_DATA = [
  {
    id: "1",
    title: "Mountain View",
    source: 'https://res.cloudinary.com/claire-dev/image/upload/v1612076013/mountain_nonpge.jpg',
    time: "Sep 25, 2025 15:00:00"
  },
  {
    id: "2",
    title: "Babble Brook",
    source: 'https://res.cloudinary.com/claire-dev/image/upload/v1612076013/glacier_aqjz96.jpg',
    time: "Sep 25, 2021 15:00:00"
  },
  {
    id: "3",
    title: "Fly Fish",
    source: 'https://res.cloudinary.com/claire-dev/image/upload/v1612076013/creek_dadkt3.jpg',
    time: ""
  },
  {
    id: "4",
    title: "Mountain View",
    source: 'https://res.cloudinary.com/claire-dev/image/upload/v1612076013/mountain_nonpge.jpg',
    time: "Sep 25, 2025 15:00:00"
  },
  {
    id: "5",
    title: "Babble Brook",
    source: 'https://res.cloudinary.com/claire-dev/image/upload/v1612076013/glacier_aqjz96.jpg',
    time: ""
  },
  {
    id: "6",
    title: "Fly Fish",
    source: 'https://res.cloudinary.com/claire-dev/image/upload/v1612076013/creek_dadkt3.jpg',
    time: "Sep 25, 2018 15:00:00"
  },
]

const Item = ({ item, onPress }) => (
  <ImageBackground source={{ uri: item.source }} style={styles.play}>
    <TouchableOpacity style={styles.play} onPress={onPress}>
      <View style={styles.overlay}>

        <Text style={styles.title}>{item.title}</Text>
      </View>
    </TouchableOpacity>
    <View style={styles.time}>
      <Text style={styles.timeText}>Coming Soon</Text>
    </View>
  </ImageBackground>
);

export default ({ navigation }) => {
  const [selectedId, setSelectedId] = useState(null);

  const renderItem = ({ item }) => {
    const backgroundColor = item.id === selectedId ? "#6e3b6e" : "#f9c2ff";

    return (
      <Item
        item={item}
        //onPress={() => setSelectedId(item.id)  }
        onPress={() => navigation.navigate('PlayScreen')}
      />
    );
  };
  return <View style={styles.container}>
    <FlatList
      data={PLAY_DATA}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      extraData={selectedId}
    />
    <View style={{ height: 55 }}></View>
    <Settings />
    <Navigation navigation={navigation} />
  </View>
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222'
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
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
  },
  time: {
    backgroundColor: '#cc8a05',
    width: 177,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    position: "absolute",
    top: 0,
  },
  timeText: {
    fontFamily: 'FuturaPTBook',
    fontSize: 24,
    color: "white",
    //fontWeight: 'bold',

  }

})