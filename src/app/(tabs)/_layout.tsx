import { MaterialIcons } from '@expo/vector-icons';
import { Redirect, Tabs } from 'expo-router';
import { ThemeProvider } from '@react-navigation/native';
import { StatusBar, StyleSheet, TouchableOpacity } from 'react-native';
import { useAuth } from '../../providers/AuthProvider';
import { resize } from '@/src/utils/deviceDimentions';

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
      <Tabs
        screenOptions={{
          tabBarStyle: {
            height: resize(60),
            borderTopRightRadius: 28,
            borderTopLeftRadius: 28,
            justifyContent: 'center',
            paddingBottom: 8,
          },
          tabBarLabelStyle: {
            marginTop: -6,
            fontSize: 12,
          },
          lazy: false,
        }}
      >
        <Tabs.Screen
          name="home/index"
          options={{
            title: 'Home',
            headerShown: false,
            tabBarIcon: ({ size, color }) => <MaterialIcons name="home" size={32} color={color} />,
          }}
        />
        <Tabs.Screen
          name="groups/index"
          options={{
            title: 'Groups',
            headerShown: false,
            tabBarIcon: ({ size, color }) => (
              <MaterialIcons name="groups" size={32} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="add/index"
          options={{
            title: '',
            tabBarIcon: () => null, // Hide default icon
            tabBarButton: (props) => (
              <TouchableOpacity style={styles.floatingButton} onPress={props.onPress}>
                <MaterialIcons name="add" size={32} color="white" />
              </TouchableOpacity>
            ),
          }}
        />
        <Tabs.Screen
          name="activity/index"
          options={{
            title: 'Activity',
            headerShown: false,
            tabBarIcon: ({ size, color }) => (
              <MaterialIcons name="auto-graph" size={32} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="friends/index"
          options={{
            title: 'Friends',
            headerShown: false,
            tabBarIcon: ({ size, color }) => (
              <MaterialIcons name={'person'} size={32} color={color} />
            ),
          }}
        />
      </Tabs>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  floatingButton: {
    width: 64,
    height: 64,
    backgroundColor: '#00C39A',
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -30, // Move button above the tab bar
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 5,
  },
});
