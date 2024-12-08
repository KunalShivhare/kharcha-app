import React from 'react';
import { Redirect, Slot, Stack } from 'expo-router';
import AuthProvider from '../providers/AuthProvider';
import { ThemeProvider } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native';

const RootLayout = () => {
  return (
    <SafeAreaView style={StyleSheet.absoluteFill}>
      <AuthProvider>
        <ThemeProvider
          value={{
            dark: true,
            colors: {
              primary: '#00A86B',
              background: '#212325',
              card: '#292B2D',
              text: 'rgb(229, 229, 231)',
              border: 'rgb(39, 39, 41)',
              notification: 'rgb(255, 69, 58)',
            },
          }}
        >
          <Stack
            initialRouteName="(tabs)"
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name="(tabs)" />
            <Stack.Screen
              name="modal/index"
              options={{
                presentation: 'modal',
                animation: 'slide_from_bottom',
              }}
            />
            <Stack.Screen
              name="addExpense/index"
              options={{
                presentation: 'modal',
                animation: 'fade_from_bottom',
              }}
            />
          </Stack>
        </ThemeProvider>
      </AuthProvider>
    </SafeAreaView>
  );
};

export default RootLayout;
