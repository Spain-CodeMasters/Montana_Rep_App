import React, { useState, useContext,  } from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity, Platform, StatusBar } from 'react-native';

import FormButton from '../components/Forms/FormButton';
import FormInput from '../components/FormInput';
import FormErrorMessage from '../components/Forms/FormErrorMessage';
import { AuthContext } from '../navigation/AuthProvider';


export default() => {
    const [email, setEmail] = useState('');
    const [customError, setCustomError] = useState('');
    const { passwordReset } = useContext(AuthContext);

    return(
        <View style={styles.container}>
        <View style={styles.action}>
            
        <FormInput
          value={email}
          placeholderText='Enter your Email'
          onChangeText={userEmail => setEmail(userEmail)}
          autoCapitalize='none'
          keyboardType='email-address'
          autoCorrect={false}
        />
        </View>
          <FormButton buttonTitle="Update Password" onPress={() => passwordReset(email)} />
          {<FormErrorMessage error={customError} visible={true} />}
            
            {/* TODO: Alert to notify user to check their email */}

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        backgroundColor: '#fff',
        padding: 30,
        },
        main: {
         flex: 1,
         backgroundColor: '#fff',
         paddingHorizontal: 20,
        
        paddingHorizontal: 0,
        paddingTop: 100,
        paddingBottom: 10
        },
    
        header_text: {
        fontSize: 24, 
        fontFamily: 'FuturaPTDemi',
        textAlign: 'center',
        color: '#343A3F',
        marginBottom: 50,
        },
        subtext: {
            fontSize: 18,
            fontFamily: 'FuturaPTBook',
        },
        action: {
            flexDirection: 'row',
            paddingBottom: 10
          },
    });
    