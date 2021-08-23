import React, { createContext, useState, useEffect } from 'react';
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
  const [user, setUser] = useState();
  const [error, setError] = useState('');
  //const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  // const [emailError, setEmailError] = useState('');
  // const [passwordError, setPasswordError] = useState('');
  // const [hasAccount, setHasAccount] = useState(false);
  //const [subscribed, setSubscribed] = useState(true);

  function setErrorObject(e){
    if (e.message.includes("auth/email-already-exists")){
      setError(" An account with this email already exists.");
    } else if (e.message.includes("auth/invalid-email")){
      setError(" Please enter a valid email.");
    } else if (e.message.includes("auth/user-not-found")){
      setError(" There is no account under this email.");
    } else if (e.message.includes("auth/wrong-password")){
      setError(" Your password is incorrect.");
    } else if (e.message.includes("auth/weak-password")){
      setError(" Passwords must be at least 6 characters.");
    } else if (e.message.includes("auth/too-many-requests")){
      setError(" Too many attempts. Please try again later or reset your password.");
    } else {
      setError(" Login failed")
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        error,
        setError,
        login: async (email, password) => {
          try {
            await auth().signInWithEmailAndPassword(email, password);
          } catch (e) {
            console.log(e);
            setErrorObject(e);
          }
        },
        register: async (username, email, password, subscribed) => {
          try {
            await auth().createUserWithEmailAndPassword(email, password).then(cred => {
            db.collection("users").doc(cred.user.uid).set({
              createdAt: firebase.firestore.FieldValue.serverTimestamp(),
              name: username,
              email: email,
              isAdmin: false,
              isPremium: false,
              isSubscribed: subscribed,
              isSponsorBasic: false,
              isSponsorPremium: false,
            })

          })
          } catch (e) {
            console.log(e);
            setErrorObject(e);
          }

         
        },
        logout: async () => {
          try {
            await auth().signOut();
          } catch (e) {
            console.error(e);
            setErrorObject(e);
          }
        },
        passwordReset: email => {
          firebase.auth().sendPasswordResetEmail(email, null);
        }, catch(e) {
          console.log(e);
          setErrorObject(e);
        },

        
      }}
      
    >
      {children}
    </AuthContext.Provider>
  );
};