import React from 'react';
import { AuthProvider } from './AuthProvider';
import Routes from './Routes';
import { SafeAreaProvider } from 'react-native-safe-area-context';


export default function Providers() {
  return (
    <SafeAreaProvider>
    <AuthProvider>
      <Routes />
    </AuthProvider>
    </SafeAreaProvider>
  );
}