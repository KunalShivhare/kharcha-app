import { NavigationContainer, ThemeProvider } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { StyleSheet, useColorScheme } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AuthProvider from '../providers/AuthProvider';
import { useSelfStore } from '../stores/selfStore';
import AuthorizeNavigation from '../navigators/authorizeStack';
import AppTheme, { DarkTheme, LightTheme } from '../components/themes/apptheme';

const App = () => {
  const { addSelf } = useSelfStore();

  useEffect(() => {
    addSelf({
      firstName: 'Kunal',
      image: 'https://picsum.photos/200',
      lastName: 'Shivhare',
      name: 'Kunal Shivhare',
      phoneNumber: '9990312010',
      email: 'kunalshivharesucks@phub.com',
    });
  }, []);
  const [theme] = useState(useColorScheme() === 'light' ? LightTheme : DarkTheme);

  return (
    <SafeAreaView style={StyleSheet.absoluteFill}>
      <AuthProvider>
        <NavigationContainer>
          <AppTheme.Provider value={theme}>
            <AuthorizeNavigation />
          </AppTheme.Provider>
        </NavigationContainer>
      </AuthProvider>
    </SafeAreaView>
  );
};

export default App;
