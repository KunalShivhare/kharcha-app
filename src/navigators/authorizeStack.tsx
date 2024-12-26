import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import BottomTabNavigator from './bottomTabNavigator';
import { ThemeProvider } from '@react-navigation/native';

export type RootStackParamList = {
  BottomTabNavigator: undefined;
  Home: undefined;
};

const AuthorizeNavigationStack = createStackNavigator<RootStackParamList>();

const AuthorizeNavigation = () => {
  return (
    <AuthorizeNavigationStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <AuthorizeNavigationStack.Screen name="BottomTabNavigator" component={BottomTabNavigator} />
      {/* <AuthorizeNavigationStack.Screen
          name="groups/groupDetails"
          options={{
            href: null,
            headerShown: false,
          }}
        />
        <AuthorizeNavigationStack.Screen
          name="add/index"
          options={{
            // href: '/addExpense',
            title: '',
            tabBarIcon: () => null, // Hide default icon
            tabBarButton: (props) => (
              <TouchableOpacity
                style={styles.floatingButton}
                onPress={() => router.push('/addExpense')}
              >
                <MaterialIcons name="add" size={32} color="white" />
              </TouchableOpacity>
            ),
          }}
        />
        <AuthorizeNavigationStack.Screen
          name="activity/index"
          options={{
            title: 'Activity',
            headerShown: false,
            tabBarIcon: ({ size, color }) => (
              <MaterialIcons name="auto-graph" size={32} color={color} />
            ),
          }}
        />
        <AuthorizeNavigationStack.Screen
          name="groups/createGroup"
          options={{
            href: null,
            headerShown: false,
          }}
        />
        <AuthorizeNavigationStack.Screen
          name="contacts/contactList"
          options={{
            href: null,
            headerShown: false,
          }}
        />
        <AuthorizeNavigationStack.Screen
          name="contacts/selectedContactList"
          options={{
            href: null,
            headerShown: false,
          }}
        />
        <AuthorizeNavigationStack.Screen
          name="account/index"
          options={{
            title: 'Account',
            headerShown: false,
            tabBarIcon: ({ size, color }) => (
              <MaterialIcons name="person" size={32} color={color} />
            ),
          }}
        /> */}
    </AuthorizeNavigationStack.Navigator>
  );
};

export default AuthorizeNavigation;
