import React from 'react';
import { View, StyleSheet, SafeAreaView, Platform} from 'react-native';



export default function SafeView({ children, style }) {
  return (
    <SafeAreaView style={[styles.safeAreaContainer, style]}>
      <View style={[styles.container, style]}>{children}</View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    // backgroundColor: npLBlue,
    paddingTop: Platform.OS === 'android' ? 25: 0
    
  },
  container: {
    flex: 1
  }
});