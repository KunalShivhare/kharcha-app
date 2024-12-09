import { MaterialIcons } from '@expo/vector-icons';
import { Redirect, Tabs } from 'expo-router';

import { ThemeProvider } from '@react-navigation/native';
import { useAuth } from '../../providers/AuthProvider';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar, StyleSheet } from 'react-native';

export default function RootLayout() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Redirect href={'/onboarding'} />;
  }
  return (
    <ThemeProvider
      value={{
        dark: true,
        colors: {
          primary: '#1CC29F',
          background: '#101010',
          card: '#292B2D',
          text: 'rgb(229, 229, 231)',
          border: 'rgb(39, 39, 41)',
          notification: 'rgb(255, 69, 58)',
        },
      }}
    >
      <StatusBar backgroundColor="#212325" />
      <Tabs>
        <Tabs.Screen
          name="home/index"
          options={{
            title: 'Home',
            headerShown: false,
            tabBarIcon: ({ size, color }) => (
              <MaterialIcons name="home" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="groups/index"
          options={{
            title: 'Groups',
            headerShown: false,
            tabBarIcon: ({ size, color }) => (
              <MaterialIcons name="groups" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="friends/index"
          options={{
            title: 'Friends',
            headerShown: false,
            tabBarIcon: ({ size, color }) => (
              <MaterialIcons name={'person'} size={size} color={color} />
            ),
          }}
        />
      </Tabs>
    </ThemeProvider>
  );
}
