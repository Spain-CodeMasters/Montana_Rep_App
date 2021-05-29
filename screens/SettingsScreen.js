import React, { useState, useContext, useEffect } from "react";
import 'react-native-gesture-handler';
import { AuthContext } from '../navigation/AuthProvider';
import { Button, StyleSheet, ScrollView, View, Text, StatusBar, Switch, TouchableOpacity, Linking, Platform } from 'react-native';
import { windowHeight, windowWidth } from '../components/utils/Dimensions';
import Feather from 'react-native-vector-icons/Feather';
import Cog from '../components/Cog';
import FancyCard from '../components/FancyCard';

import FormButton from '../components/Forms/FormButton';

import { db } from '../components/Firebase/firebase';



export default ({ navigation: { goBack }, navigation }) => {
  const { user, logout } = useContext(AuthContext);
  const [userData, setUserData] = useState(null);
  //const [isEnabled, setIsEnabled] = useState(true);
  //const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  const [isAccountSelected, setIsAccountSelected] = useState(false);
  const [isPrivacySelected, setIsPrivacySelected] = useState(false);
  const [isAboutSelected, setIsAboutSelected] = useState(false);

  useEffect(() => {
    const cleanUp = db.collection("users").where('email', '==', user.email).onSnapshot((snapshot, error) => {
      if (error || !snapshot) {
        return;
      }
   
      setUserData(snapshot.docs.map((doc) => ({ id: doc.id, user: doc.data() })));
    
    });
    return () => cleanUp();
  }, []);


  const ExternalLinkBtn = (props) => {
    return <Button
      title={props.title}
      onPress={() => {
        Linking.openURL(props.url)
          .catch(err => {
            console.error("Failed opening page because: ", err)
            alert('Failed to open page')
          })
      }}
    />
  }


  return (
    <View style={styles.settings}>
      <View style={styles.raiseCog}><Cog styles={styles.raiseCog} onPress={() => goBack()} /></View>
      <ScrollView style={styles.container}>

        <Text style={styles.header_text}>Settings</Text>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginBottom: 20, }}>
          {(function () {
            if (userData !== null && userData[0].user.isPremium == false) {
              return <FancyCard
                title='Get GoPlay!'
                onPress={() => {
                  Linking.openURL('https://goplay.montanarep.com/')
                    .catch(err => {
                      console.error("Failed opening page because: ", err);
                      alert('Failed to open page');
                    })
                }}
              />
            }
          })()}
        </View>


        <View style={styles.horizontal_rule} />
        <View>
          <TouchableOpacity onPress={() => setIsAccountSelected(!isAccountSelected)}>
            <View style={styles.inline_rule}>
              <Text style={styles.text}><Feather name="user" size={20} color='#747A21' />  Account</Text>
              {!isAccountSelected ? <Feather name="chevron-right" size={20} color='#343A3F' />
                : <Feather name="chevron-down" size={20} color='#343A3F' />}

            </View>
          </TouchableOpacity>

          {isAccountSelected ? <View>
            <View style={styles.horizontal_rule} />

            <TouchableOpacity onPress={() => navigation.navigate('Change Password')}>
              <Text style={styles.subtext}>Change Password</Text>
            </TouchableOpacity>

            <View style={styles.horizontal_rule} />

            <TouchableOpacity onPress={() => navigation.navigate('Update Account')}>
              <Text style={styles.subtext}>Update Account</Text>
            </TouchableOpacity>

            {/* <View style={styles.horizontal_rule} />
                <Text style={styles.subtext}>Delete Account</Text> */}
          </View> : null}
        </View>

        {/* <View style={styles.horizontal_rule} />
        <View style={styles.inline_rule}>
          <Text style={styles.text}><Feather name="bell" size={20} color='#747A21' />  Notifications</Text>
          <View style={{ alignSelf: 'flex-end' }}>
            <Switch
              trackColor={{ false: "#767577", true: "#C7CAA6" }}
              thumbColor={isEnabled ? "#CD9A36" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
          </View>

        </View> */}

        <View style={styles.horizontal_rule} />
        <View>
          <TouchableOpacity onPress={() => setIsPrivacySelected(!isPrivacySelected)}>
            <View style={styles.inline_rule}>
              <Text style={styles.text}><Feather name="lock" size={20} color='#747A21' />  Privacy & Security</Text>
              <View style={{ alignSelf: 'flex-end' }}>
                {!isPrivacySelected ? <Feather name="chevron-right" size={20} color='#343A3F' />
                  : <Feather name="chevron-down" size={20} color='#343A3F' />}
              </View>
            </View>
          </TouchableOpacity>


          {isPrivacySelected ? <View>
            <View style={styles.horizontal_rule} />
            <TouchableOpacity onPress={() => navigation.navigate('Privacy Policy')}>
              <Text style={styles.subtext}>Privacy Policy</Text>
            </TouchableOpacity>
            <View style={styles.horizontal_rule} />
            <TouchableOpacity onPress={() => navigation.navigate('Terms and Conditions')}>
              <Text style={styles.subtext}>Terms and Conditions</Text>
            </TouchableOpacity>
          </View> : null}
        </View>

        <View style={styles.horizontal_rule} />
        <View>
          <TouchableOpacity onPress={() => setIsAboutSelected(!isAboutSelected)}>
            <View style={styles.inline_rule}>
              <Text style={styles.text}><Feather name="help-circle" size={20} color='#747A21' />  About</Text>
              <View style={{ alignSelf: 'flex-end' }}>
                {!isAboutSelected ? <Feather name="chevron-right" size={20} color='#343A3F' />
                  : <Feather name="chevron-down" size={20} color='#343A3F' />}
              </View>
            </View>
          </TouchableOpacity>
          <View style={styles.horizontal_rule} />

          {isAboutSelected ? <View>
            <ExternalLinkBtn title="About Us" url="https://montanarep.com/mission" />
            <View style={styles.horizontal_rule} />

            <ExternalLinkBtn title="Facebook" url="https://www.facebook.com/MontanaRep" />
            <View style={styles.horizontal_rule} />

            <ExternalLinkBtn title="Instagram" url="https://www.instagram.com/mtreptheatre/?hl=en" />
            <View style={styles.horizontal_rule} />

            <ExternalLinkBtn title="Rate us on the App Store" url="" />
            <View style={styles.horizontal_rule} />

            <ExternalLinkBtn title="Write a Review" url="" />
            <View style={styles.horizontal_rule} />
            <ExternalLinkBtn title="Contact Us" url="https://montanarep.com/contact" />
            <View style={styles.horizontal_rule} />
          </View> : null}
        </View>

        <View>
          <TouchableOpacity onPress={() => logout()}>
            <Text style={styles.text}><Feather name="log-out" size={20} color='red' />  Logout</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.horizontal_rule} />

        <Text style={{ marginTop: 20, color: 'grey' }}>Version 0.1.0</Text>

        {/* A little bit wiggle room at the bottom for UX */}
        <View style={{ marginTop: 100, marginBottom: 100 }}></View>


      </ScrollView>

    </View>

  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 30,
  },

  header_text: {
    paddingTop: 20,
    fontSize: 24,
    fontFamily: 'FuturaPT-Demi',
    textAlign: 'center',
    color: '#343A3F',
    marginBottom: 20,
  },

  inline_rule: {
    flexDirection: 'row',
    justifyContent: 'space-between'

  },

  horizontal_rule: {
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
    marginBottom: 10,
    marginTop: 10
  },
  settings: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: '100%',
    flexDirection: 'row-reverse',
  },
  
  text: {
    fontSize: 18,
    fontFamily: 'FuturaPT-Book',
  },

  subtext: {
    fontSize: 18,
    fontFamily: 'FuturaPT-Book',
    marginLeft: 60,
  },

  raiseCog: {
    ...Platform.select({
      ios: {
        zIndex: 1
      }
    })
  }


});

