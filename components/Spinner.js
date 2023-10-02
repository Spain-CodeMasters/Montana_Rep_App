import React from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';

import SafeView from './SafeView';
import Colors from '../components/utils/colors';

export default function Spinner() {
  return (
    <SafeView style={styles.container}>
      <ActivityIndicator size="large" color={Colors.Secondary_Copper} />
    </SafeView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});