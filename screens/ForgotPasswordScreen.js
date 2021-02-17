import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import * as Yup from 'yup';

import Colors from '../components/utils/colors';
import SafeView from '../components/SafeView';
import Form from '../components/Forms/Form';
import FormField from '../components/Forms/FormField';
import FormButton from '../components/Forms/FormButton';
import IconButton from '../components/IconButton';
import {passwordReset} from '../components/Firebase/firebase';
import FormErrorMessage from '../components/Forms/FormErrorMessage';
import useStatusBar from '../hooks/useStatusBar';

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .label('Email')
    .email('Enter a valid email')
    .required('Please enter a registered email')
});

export default function ForgotPasswordScreen({ navigation }) {
  useStatusBar('light-content');

  const [customError, setCustomError] = useState('');

  async function handlePasswordReset(values) {
    const { email } = values;

    try {
      await passwordReset(email);
      navigation.navigate('Welcome');
    } catch (error) {
      setCustomError(error.message);
    }
  }

  return (
    <SafeView style={styles.container}>
      <Form
        initialValues={{ email: '' }}
        validationSchema={validationSchema}
        onSubmit={values => handlePasswordReset(values)}
      >
        <FormField
          name="email"
          leftIcon="at-sign"
          placeholder="Enter email"
          autoCapitalize="none"
          keyboardType="email-address"
          textContentType="emailAddress"
          autoFocus={true}
        />
        <FormButton title="Forgot Password" />
        {<FormErrorMessage error={customError} visible={true} />}
      </Form>
      <IconButton
        style={styles.backButton}
        iconName="arrow-left"
        color={Colors.white}
        size={30}
        onPress={() => navigation.goBack()}
      />
    </SafeView>
  );
}


  const styles = StyleSheet.create({
    container: {
      flex: 1, 
      padding: 15,
      backgroundColor: '#fff'
    },
    inner: { 
      flex: 1, 
      justifyContent: "space-around"
    },
    backButton: {
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10
      },
    header: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 0,
        paddingTop: 125,
        paddingBottom: 10,
        // backgroundColor: 'blue'
    },
    footer: {
        flex: 3,
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        // paddingVertical: 30,
        paddingTop: 20,
        paddingLeft: 50,
        paddingRight: 50
    },
    text_header: {
        color: '#343A3F',
        fontWeight: 'bold',
        fontSize: 40
    },
    text_subheader: {
        color: '#343a3f',
        // marginTop: 10,
        fontSize: 20
    },
    text_linkheader: {
        color: '#747A21',
        // marginTop: 10,
        fontSize: 20
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    actionError: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#FF0000',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#A49F9F',
    },
    errorMsg: {
        color: '#FF0000',
        fontSize: 14,
    },
    button: {
        alignItems: 'center',
        marginTop: 50
    },
    signIn: {
        backgroundColor: '#cc8a05',
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    }
  });