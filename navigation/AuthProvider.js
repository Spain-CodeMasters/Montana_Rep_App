import React, { createContext, useState } from 'react';
import auth from '@react-native-firebase/auth';
import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import { db } from '../components/Firebase/firebase';

// import {handleUpload} from '../screens/SignupScreen';
/**
 * This provider is created
 * to access user in whole app
 */

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  //const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  // const [emailError, setEmailError] = useState('');
  // const [passwordError, setPasswordError] = useState('');
  // const [hasAccount, setHasAccount] = useState(false);
  //const [subscribed, setSubscribed] = useState(true);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login: async (email, password) => {
          try {
            await auth().signInWithEmailAndPassword(email, password);
          } catch (e) {
            console.log(e);
          }
        },
        register: async (username, email, password, subscribed) => {
          try {
            await auth().createUserWithEmailAndPassword(email, password);
            db.collection("users").add({
              createdAt: firebase.firestore.FieldValue.serverTimestamp(),
              name: username,
              email: email,
              isAdmin: false,
              isPremium: false,
              isSubscribed: subscribed,
              isSponsorBasic: false,
              isSponsorPremium: false,
            })
          } catch (e) {
            console.log(e);
          }

         
        },
        logout: async () => {
          try {
            await auth().signOut();
          } catch (e) {
            console.error(e);
          }
        },
        passwordReset: email => {
          firebase.auth().sendPasswordResetEmail(email, null);
        }, catch(e) {
          console.log(e);
        }
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};