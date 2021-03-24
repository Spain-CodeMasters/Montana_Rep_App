import 'react-native-gesture-handler';
import React, { useState, useRef, useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  FlatList,
  ImageBackground,
  Animated,
  Modal,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Navigation from '../components/navigation/navigation';
import Cog from '../components/Cog';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { db } from '../components/Firebase/firebase';

const { width, height } = Dimensions.get('screen');

const ITEM_WIDTH = width;
const ITEM_HEIGHT = height * .90;

const PLAY_DATA = [
  {
    id: "1",
    title: "The Phantom Bride",
    source: 'https://res.cloudinary.com/claire-dev/image/upload/v1612076013/mountain_nonpge.jpg',
    time: "Sep 25, 2025 15:00:00",
    type: "goplay"
  },
  {
    id: "6",
    title: "Go Play!",
    source: 'https://res.cloudinary.com/claire-dev/image/upload/v1612076013/creek_dadkt3.jpg',
    time: "Sep 25, 2018 15:00:00",
    type: 'goplay'
  },
]

const EVENT_DATA = [
  {
    id: "2",
    title: "Community",
    source: 'https://res.cloudinary.com/claire-dev/image/upload/v1612076013/glacier_aqjz96.jpg',
    time: "Sep 25, 2021 15:00:00",
    type: "comm"
  },
  {
    id: "3",
    title: "Montana Rep",
    source: 'https://res.cloudinary.com/claire-dev/image/upload/v1612076013/creek_dadkt3.jpg',
    time: "",
    type: 'mtrep'
  },
  {
    id: "4",
    title: "Montana Rep",
    source: 'https://res.cloudinary.com/claire-dev/image/upload/v1612076013/mountain_nonpge.jpg',
    time: "Sep 25, 2025 15:00:00",
    type: 'mtrep'
  },
  {
    id: "5",
    title: "Community",
    source: 'https://res.cloudinary.com/claire-dev/image/upload/v1612076013/glacier_aqjz96.jpg',
    time: "",
    type: "comm"

  },
]

//Adjust size of title text based on content
const AdjustTitle = ({
  fontSize, text, style, numberOfLines
}) => {
  const [currentFont, setCurrentFont] = useState(fontSize);
  const [currentLines, setCurrentLines] = useState(numberOfLines);

  return (
    <Text
      numberOfLines={currentLines}
      adjustsFontSizeToFit
      style={[style, { fontSize: currentFont }]}
      onTextLayout={(e) => {
        const { lines } = e.nativeEvent;
        if (lines.length > currentLines) {
          setCurrentFont(currentFont - 1);
        }

      }}
    >
      {text}
    </Text>
  );
};

//Create List Item
const Item = ({ item, onPress }) => (
  <ImageBackground source={{ uri: item.source }} style={styles.play}>
    <TouchableOpacity style={styles.play} onPress={onPress}>
      <View style={styles.overlay}>
        <AdjustTitle fontSize={40} text={item.title} style={styles.title} numberOfLines={1} />
        {/* <Text numberOfLines={3} style={styles.title}>{item.title}</Text> */}
      </View>
    </TouchableOpacity>

    {/*Determine Event Type*/}
    {(function () {
      if (item.type == 'mtrep') {
        return <View style={[styles.time, { backgroundColor: '#747A21' }]}>
          <Text style={styles.timeText}>Time</Text>
        </View>
      } else if (item.type == 'goplay') {
        return <View style={styles.time}>
          <Text style={styles.timeText}>Time</Text>
        </View>
      } else if (item.type == 'comm') {
        return <View style={[styles.time, { backgroundColor: '#A5580C' }]}>
          <Text style={styles.timeText}>Time</Text>
        </View>
      }
    })()}
  </ImageBackground>
);

export default ({ navigation }) => {
  const [filter, setFilter] = useState("all");

  const [greenAnimation, setGreenAnimation] = useState('fadeOut');
  const [goldAnimation, setGoldAnimation] = useState('fadeOut');
  const [redAnimation, setRedAnimation] = useState('fadeOut');
  const [greenSize, setGreenSize] = useState(1.5);
  const [goldSize, setGoldSize] = useState(1.5);
  const [redSize, setRedSize] = useState(1.5);

  const scroll = useRef(null);

  const [eventData, setEventData] = useState([]);
  const [playData, setPlayData] = useState([]);
  const scheduleData = eventData.concat(playData);
  console.log(scheduleData);
  const [scheduleView, setScheduleView] = useState(scheduleData);
  const commEvent = eventData.filter(function (posts) { return posts.post.catagory == 'goplay'; });
  const mtrepEvent = eventData.filter(function (posts) { return posts.post.catagory == 'mtrep'; });

  useEffect(() => {
    db.collection("plays").orderBy("startDate", "desc").onSnapshot((snapshot) => {
      setPlayData(snapshot.docs.map((doc) => ({ id: doc.id, post: doc.data() })));
      //console.log(playData);
    })
    db.collection("events").orderBy("startDate", "desc").onSnapshot((snapshot) => {
      setEventData(snapshot.docs.map((doc) => ({ id: doc.id, post: doc.data() })));
      //console.log(eventData);
    })
  }, []);

  function filterPosts(type) {
    //scroll.current.scrollToOffset({ offset: ITEM_HEIGHT, animated: true })
    if (filter !== type) {
      if (type == "mtrep") {
        setFilter("mtrep");
        selectGreen();
        setGreenSize(0);
        setGoldSize(1.5);
        setRedSize(1.5);
      } else if (type == "goplay") {
        setFilter("goplay");
        selectGold();
        setGreenSize(1.5);
        setGoldSize(0);
        setRedSize(1.5);
      } else if (type == "comm") {
        setFilter("comm");
        selectRed();
        setGreenSize(1.5);
        setGoldSize(1.5);
        setRedSize(0);
      }
    } else {
      setFilter("all");
      setGreenSize(1.5);
      setGoldSize(1.5);
      setRedSize(1.5);
    }

  }

  function selectGreen() {
    setGreenAnimation("fadeIn");
    setTimeout(function () { setGreenAnimation("fadeOutLeft"); }, 2000);
  }

  function selectGold() {
    setGoldAnimation("fadeIn");
    setTimeout(function () { setGoldAnimation("fadeOutLeft"); }, 2000);
  }

  function selectRed() {
    setRedAnimation("fadeIn");
    setTimeout(function () { setRedAnimation("fadeOutLeft"); }, 2000);
  }

  const [selectedId, setSelectedId] = useState(null);

  const renderItem = ({ item }) => {
    if (filter == "all") {
      return (
        <Item
          item={item}
          //onPress={() => setSelectedId(item.id)  }
          onPress={() => setModalVisible(!modalVisible)}
        />
      );
    } else if (filter == "mtrep" && item.type == "mtrep") {
      return (
        <Item
          item={item}
          //onPress={() => setSelectedId(item.id)  }
          onPress={() => setModalVisible(!modalVisible)}
        />
      );
    } else if (filter == "goplay" && item.type == "goplay") {
      return (
        <Item
          item={item}
          //onPress={() => setSelectedId(item.id)  }
          onPress={() => navigation.navigate('Play')}
        />
      );
    } else if (filter == "comm" && item.type == "comm") {
      return (
        <Item
          item={item}
          //onPress={() => setSelectedId(item.id)  }
          onPress={() => setModalVisible(!modalVisible)}
        />
      );
    }

  };
  const safeAreaInsets = useSafeAreaInsets()
  const [modalVisible, setModalVisible] = useState(false);
  return <View style={{
    flex: 1,
    //paddingTop: safeAreaInsets.top,
    paddingBottom: safeAreaInsets.bottom,
    paddingLeft: safeAreaInsets.left,
    paddingRight: safeAreaInsets.right,
  }}>
    <Cog onPress={() => navigation.navigate('Settings')} />
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <TouchableOpacity style={{ alignSelf: 'flex-end' }} onPress={() => { setModalVisible(!modalVisible); }}>
            <FontAwesome5 name='times' solid color="black" size={30} style={{}} />
          </TouchableOpacity>
          <Text style={styles.postLabel}>Event Information</Text>
          {/* <Image source={{uri: "https://res.cloudinary.com/claire-dev/image/upload/v1612076013/glacier_aqjz96.jpg"}}></Image> */}
          <Text allowFontScaling style={styles.subtext}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</Text>

        </View>
      </View>
    </Modal>
    <FlatList
      data={PLAY_DATA}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      extraData={selectedId}
    />
    <View style={{ height: 55 }}></View>

    <View style={{ position: "absolute", left: ITEM_WIDTH - 63, flexDirection: 'column', alignItems: 'flex-end', padding: 10, paddingTop: 55 }}>
      <Animatable.View animation={greenAnimation} duration={500} style={[{ backgroundColor: '#747A21', position: "absolute", left: -107, top: 65, width: 117, paddingLeft: 5, paddingRight: 5, borderRadius: 5 }]}><Text style={[styles.postLabel, { color: "white" }]}>Montana Rep</Text></Animatable.View>
      <TouchableOpacity onPress={() => filterPosts('mtrep')}><Animated.View style={[styles.postNavi, { backgroundColor: '#747A21', borderColor: "#0000", borderWidth: greenSize }]}></Animated.View></TouchableOpacity>
      <Animatable.View animation={goldAnimation} duration={500} style={[{ backgroundColor: '#cc8a05', position: "absolute", left: -65, top: 109, width: 75, paddingLeft: 5, paddingRight: 5, borderRadius: 5 }]}><Text style={[styles.postLabel, { color: "white" }]}>Go Play!</Text></Animatable.View>
      <TouchableOpacity onPress={() => filterPosts('goplay')}><Animated.View style={[styles.postNavi, { backgroundColor: '#cc8a05', borderColor: "#0000", borderWidth: goldSize }]}></Animated.View></TouchableOpacity>
      <Animatable.View animation={redAnimation} duration={500} style={[{ backgroundColor: '#A5580C', position: "absolute", left: -92, top: 152, width: 102, paddingLeft: 5, paddingRight: 5, borderRadius: 5 }]}><Text style={[styles.postLabel, { color: "white" }]}>Community</Text></Animatable.View>
      <TouchableOpacity onPress={() => filterPosts('comm')}><Animated.View style={[styles.postNavi, { backgroundColor: '#A5580C', borderColor: "#0000", borderWidth: redSize }]}></Animated.View></TouchableOpacity>
    </View>

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
    fontSize: 40,
    letterSpacing: 5,
    margin: 10,
    textAlign: 'center',
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

  },
  buttonText: {
    fontFamily: 'FuturaPTBook',
    fontSize: 24,
    color: "white",
    //fontWeight: 'bold',

  },
  postNavi: {
    minWidth: 13,
    minHeight: 13,
    borderRadius: 10,
    margin: 15,
  },
  postLabel: {
    fontSize: 16,
    fontFamily: 'FuturaPTMedium',
    lineHeight: 20,
    textTransform: 'uppercase'
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: -100,
  },
  modalView: {
    margin: 0,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 40,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: 300,
    height: 550,
  },
  subtext: {
    fontSize: 18,
    fontFamily: 'FuturaPTBook',
    marginTop: 20,
    marginBottom: 20,
    lineHeight: 20,
  },

})