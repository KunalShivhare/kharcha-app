import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import BottomTabNavigator from './bottomTabNavigator';
import { RouteProp } from '@react-navigation/native';
import ContactList from '../screens/contacts/contactList';
import CreateGroup from '../screens/groups/createGroup';
import GroupDetails from '../screens/groups/groupDetails';
import SelectedContactList from '../screens/contacts/selectedContactList';
import CustomModal from '../screens/modal';
import AddExpense from '../screens/addExpense';

export type AuthorizeNavigationStackList = {
  BottomTabNavigator: undefined;
  ContactList: {
    headerTitle?: string;
    navigateToScreen?: string;
  };
  CreateGroup: undefined;
  GroupDetails: {
    groupId: string;
  };
  SelectedContactList: undefined;
  CustomModal: {
    cancelOnOutsideClick?: boolean;
    showHeader: boolean;
    noScrollView: boolean;
    variant: 'bottom' | 'top';
    componentKey: string;
  };
  AddExpense: {
    groupId?: string;
  };
};

export type AuthorizeNavigationProp<RouteName extends keyof AuthorizeNavigationStackList> =
  RouteProp<AuthorizeNavigationStackList, RouteName>;

const AuthorizeNavigationStack = createStackNavigator<AuthorizeNavigationStackList>();
const AuthorizeNavigation = () => {
  return (
    <AuthorizeNavigationStack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
    >
      <AuthorizeNavigationStack.Screen name="BottomTabNavigator" component={BottomTabNavigator} />
      <AuthorizeNavigationStack.Screen name="ContactList" component={ContactList} />
      <AuthorizeNavigationStack.Screen name="CreateGroup" component={CreateGroup} />
      <AuthorizeNavigationStack.Screen name="GroupDetails" component={GroupDetails} />
      <AuthorizeNavigationStack.Screen name="SelectedContactList" component={SelectedContactList} />
      <AuthorizeNavigationStack.Screen
        name="CustomModal"
        component={CustomModal}
        options={{
          presentation: 'transparentModal',
          animation: 'fade_from_bottom',
        }}
      />
      <AuthorizeNavigationStack.Screen
        name="AddExpense"
        component={AddExpense}
        options={{
          presentation: 'modal',
        }}
      />
    </AuthorizeNavigationStack.Navigator>
  );
};

export default AuthorizeNavigation;
