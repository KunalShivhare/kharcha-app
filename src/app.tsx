import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { StyleSheet, useColorScheme } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppTheme, {
  DarkTheme as CustomDarkTheme,
  LightTheme as CustomLightTheme,
} from './components/themes/apptheme';
import AuthorizeNavigation from './navigators/authorizeStack';
import UnauthorizeNavigation from './navigators/unauthorizeStack';
import AuthProvider, { useAuth } from './providers/AuthProvider';
import UserProvider from './providers/UserContext';
import { useSelfStore } from './stores/selfStore';

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
        <UserProvider>
          <NavigationContainer>
            <AppTheme.Provider value={theme}>
              <RootNavigator />
            </AppTheme.Provider>
          </NavigationContainer>
        </UserProvider>
      </AuthProvider>
    </SafeAreaView>
  );
};

export default App;
