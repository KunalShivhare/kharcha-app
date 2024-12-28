import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { StyleSheet, useColorScheme } from 'react-native';
import AuthProvider, { useAuth } from './providers/AuthProvider';
import { useSelfStore } from './stores/selfStore';
import AuthorizeNavigation from './navigators/authorizeStack';
import AppTheme, {
  LightTheme as CustomLightTheme,
  DarkTheme as CustomDarkTheme,
} from './components/themes/apptheme';
import UnauthorizeNavigation from './navigators/unauthorizeStack';
import { SafeAreaView } from 'react-native-safe-area-context';

const RootNavigator = () => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? <AuthorizeNavigation /> : <UnauthorizeNavigation />;
};

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
  const [theme] = useState(useColorScheme() == 'light' ? CustomLightTheme : CustomDarkTheme);

  return (
    <SafeAreaView style={StyleSheet.absoluteFill}>
      <AuthProvider>
        <NavigationContainer>
          <AppTheme.Provider value={theme}>
            <RootNavigator />
          </AppTheme.Provider>
        </NavigationContainer>
      </AuthProvider>
    </SafeAreaView>
  );
};

export default App;
