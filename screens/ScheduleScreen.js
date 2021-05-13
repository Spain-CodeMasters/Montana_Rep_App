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
  Image,
  Animated,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Cog from '../components/Cog';
import { db } from '../components/Firebase/firebase';

const { width, height } = Dimensions.get('screen');

const ITEM_WIDTH = width;
const ITEM_HEIGHT = height * .90;

//Adjust size of title text based on content
const AdjustTitle = ({ fontSize, text, style, numberOfLines }) => {

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

const GetTime = ({ start, end }) => {
  //console.log(start);
  if (start !== null && start !== undefined) {
    const today = new Date();
    //console.log(start.toString());

    const h = start.getHours();
    const m = start.getMinutes();

    var time = (start.getMonth() + 1) + '/' + start.getDate() + " " + hours() + ":" + minutes() + ' ' + period();

    function hours() {
      if (h > 12) {
        return h - 12;
      } else if (h == 0) {
        return 12;
      } else {
        return h;
      }
    }

    function minutes() {
      if (m < 10) {
        return "0" + m;
      } else {
        return m;
      }
    }

    function period() {
      if (h > 12) {
        return 'PM';
      } else {
        return 'AM';
      }
    }


    if (start < today && end > today) {
      time = "Going On Now"
    }

    return (
      <Text style={styles.timeText}>
        {time}
      </Text>
    );
  }
};


//Create Item
const Play = ({ item, onPress }) => {
  function source() {
    if (item.post.previewPhotoUrl !== '') {
      return item.post.previewPhotoUrl;
    } else {
      return item.post.mainPhotoUrl;
    };
  }

  return <ImageBackground source={{ uri: source() }} style={styles.play}>
    <TouchableOpacity style={styles.play} onPress={onPress}>
      <View style={styles.overlay}>
        <AdjustTitle fontSize={40} text={item.post.title} style={styles.title} numberOfLines={2} />
      </View>
    </TouchableOpacity>

    <View style={[styles.time, { backgroundColor: '#cc8a05' }]}>
      <GetTime start={item.post.start.toDate()} end={item.post.end.toDate()}></GetTime>
    </View>
  </ImageBackground>

};

//Create Event Item
const Event = ({ item, onPress }) => {
  return <ImageBackground source={{ uri: item.post.photoUrl }} style={styles.play}>
    <TouchableOpacity style={styles.play} onPress={onPress} >
      <View style={styles.overlay}>
        <AdjustTitle fontSize={40} text={item.post.title} style={styles.title} numberOfLines={2} />
      </View>
    </TouchableOpacity>

    {/*Determine Event Type*/}
    {(function () {
      if (item.post.category == 'mtrep') {
        return <View style={[styles.time, { backgroundColor: '#747A21' }]}>
          <GetTime start={item.post.start.toDate()} end={item.post.end.toDate()}></GetTime>
        </View>
      } else {
        return <View style={[styles.time, { backgroundColor: '#A5580C' }]}>
          <GetTime start={item.post.start.toDate()} end={item.post.end.toDate()}></GetTime>
        </View>
      }

    })()}
  </ImageBackground>
};

//Create Sponsored Item
const Sponsor = ({ item, onPress }) => {
  function source() {
    if (item.post.previewPhotoUrl !== '') {
      return item.post.previewPhotoUrl;
    } else {
      return item.post.mainPhotoUrl;
    };
  }

  return <ImageBackground source={{ uri: source() }} style={styles.play}>
    <TouchableOpacity style={styles.play} onPress={onPress}>
      <View style={styles.overlay}>
        <AdjustTitle fontSize={40} text={item.post.title} style={styles.title} numberOfLines={2} />
      </View>
    </TouchableOpacity>

    <View style={[styles.time, { color: '#A5580C' }]}>
      <GetTime start={item.post.start.toDate()} end={item.post.end.toDate()}></GetTime>
    </View>

  </ImageBackground>
};


export default ({ navigation }) => {

  const [filter, setFilter] = useState("all");

  const [greenAnimation, setGreenAnimation] = useState('fadeOut');
  const [goldAnimation, setGoldAnimation] = useState('fadeOut');
  const [redAnimation, setRedAnimation] = useState('fadeOut');
  const [isGreenSelected, setIsGreenSelected] = useState(false);
  const [isGoldSelected, setIsGoldSelected] = useState(false);
  const [isRedSelected, setIsRedSelected] = useState(false);

  const scroll = useRef(null);

  const [scheduleData, setScheduleData] = useState([]);
  const [scheduleView, setScheduleView] = useState(scheduleData);

  useEffect(() => {
    db.collection("content").orderBy("start", "asc").onSnapshot((snapshot) => {
      setScheduleData(snapshot.docs.map((doc) => ({ id: doc.id, post: doc.data() })));
      setScheduleView(snapshot.docs.map((doc) => ({ id: doc.id, post: doc.data() })));
    })
  }, []);

  function filterPosts(type) {
    scroll.current.scrollToOffset({ offset: 0, animated: true })
    if (filter !== type) {
      if (type == "mtrep") {
        setFilter("mtrep");
        setScheduleView(scheduleData.filter(function (posts) { return posts.post.category == 'mtrep'; }));
        selectGreen();
        setIsGreenSelected(true);
        setIsGoldSelected(false);
        setIsRedSelected(false);;
      } else if (type == "goplay") {
        setFilter("goplay");
        setScheduleView(scheduleData.filter(function (posts) { return posts.post.category == 'goplay'; }));
        selectGold();
        setIsGreenSelected(false);
        setIsGoldSelected(true);
        setIsRedSelected(false);
      } else if (type == "comm") {
        setFilter("comm");
        setScheduleView(scheduleData.filter(function (posts) { return posts.post.category !== 'goplay' && posts.post.category !== 'mtrep'; }));
        selectRed();
        setIsGreenSelected(false);
        setIsGoldSelected(false);
        setIsRedSelected(true);
      }
    } else {
      setScheduleView(scheduleData);
      setFilter("all");
      setIsGreenSelected(false);
      setIsGoldSelected(false);
      setIsRedSelected(false);
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

  function selectPlay(id) {
    navigation.navigate('Play', {
      id: id,
      pointId: null,
    })
  }

  function selectEvent(id) {
    navigation.navigate('Event', {
      id: id,
      pointId: null,
    })
  }

  function selectSponsor(id) {
    navigation.navigate('Sponsor', {
      id: id,
      pointId: null,
    })
  }

  const renderHeader = () => {
    return <View>
      {/* PINNED POST */}
      <FlatList
        data={scheduleData.filter(function (posts) { return posts.post.pinned == true; })}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>

  }

  const renderItem = ({ item }) => {
    if (item.post.type == 'play') {
      return <Play
        item={item}
        onPress={() => selectPlay(item.id)}
      />
    } else if (item.post.type == 'event') {
      return <Event
        item={item}
        onPress={() => selectEvent(item.id)}
      />
    } else if (item.post.type == "sponsor") {
      return <Sponsor
        item={item}
        onPress={() => selectSponsor(item.id)}
      />
    }
  };


  return <View>
    <Cog onPress={() => navigation.navigate('Settings')} />

    <FlatList
      ref={scroll}
      data={scheduleView}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      ListHeaderComponent={renderHeader}
    />

    <View style={{ height: 55 }}></View>

    <View style={{ position: "absolute", left: ITEM_WIDTH - 63, flexDirection: 'column', alignItems: 'center', padding: 10, paddingTop: 55 }}>

      {/* GREEN */}
      <Animatable.View animation={greenAnimation} duration={500} style={[{ backgroundColor: '#747A21', position: "absolute", left: -107, top: 65, width: 117, paddingLeft: 5, paddingRight: 5, borderRadius: 5 }]}><Text style={[styles.postLabel, { color: "white" }]}>Montana Rep</Text></Animatable.View>
      <TouchableOpacity onPress={() => filterPosts('mtrep')}>
        {isGreenSelected ?
          <View style={[styles.postNavi, { backgroundColor: '#747A21' }]}></View>
          :
          <View style={[styles.postNavi, { backgroundColor: '#747A21', width: 10, height: 10, margin: 16.5, }]}></View>
        }
      </TouchableOpacity>

      {/* GOLD */}
      <Animatable.View animation={goldAnimation} duration={500} style={[{ backgroundColor: '#cc8a05', position: "absolute", left: -65, top: 109, width: 75, paddingLeft: 5, paddingRight: 5, borderRadius: 5 }]}><Text style={[styles.postLabel, { color: "white" }]}>Go Play!</Text></Animatable.View>
      <TouchableOpacity onPress={() => filterPosts('goplay')} style={{ alignSelf: 'center' }}>
        {isGoldSelected ?
          <View style={[styles.postNavi, { backgroundColor: '#cc8a05' }]}></View>
          :
          <View style={[styles.postNavi, { backgroundColor: '#cc8a05', width: 10, height: 10, margin: 16.5, }]}></View>
        }
      </TouchableOpacity>

      {/* RED */}
      <Animatable.View animation={redAnimation} duration={500} style={[{ backgroundColor: '#A5580C', position: "absolute", left: -92, top: 152, width: 102, paddingLeft: 5, paddingRight: 5, borderRadius: 5 }]}><Text style={[styles.postLabel, { color: "white" }]}>Community</Text></Animatable.View>
      <TouchableOpacity onPress={() => filterPosts('comm')} style={{ alignSelf: 'center' }}>
        {isRedSelected ?
          <View style={[styles.postNavi, { backgroundColor: '#A5580C' }]}></View>
          :
          <View style={[styles.postNavi, { backgroundColor: '#A5580C', width: 10, height: 10, margin: 16.5, }]}></View>
        }
      </TouchableOpacity>
    </View>
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
    fontFamily: 'FuturaPT-Demi',
    fontSize: 40,
    letterSpacing: 5,
    margin: 10,
    textAlign: 'center',
  },
  time: {
    backgroundColor: '#A5580C',
    width: 177,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    position: "absolute",
    top: 0,
  },
  timeText: {
    fontFamily: 'FuturaPT-Book',
    fontSize: 24,
    color: "white",
    //fontWeight: 'bold',

  },
  buttonText: {
    fontFamily: 'FuturaPT-Book',
    fontSize: 24,
    color: "white",
    //fontWeight: 'bold',

  },
  postNavi: {
    width: 13,
    height: 13,
    borderRadius: 10,
    margin: 15,
  },
  postLabel: {
    fontSize: 16,
    fontFamily: 'FuturaPT-Medium',
    lineHeight: 20,
    textTransform: 'uppercase'
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: -100,
  },
  subtext: {
    fontSize: 18,
    fontFamily: 'FuturaPT-Book',
    marginTop: 20,
    marginBottom: 20,
    lineHeight: 20,
  },

})