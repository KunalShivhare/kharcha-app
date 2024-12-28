import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Onboarding from '../screens/onboarding';
import Login from '../screens/login';
import Signup from '../screens/signup';
import OTPVerification from '../screens/otpVerification';

export type UnauthorizeNavigationStackList = {
  Onboarding: undefined;
  Login: undefined;
  Signup: undefined;
  OTPVerification: undefined;
};

const UnauthorizeNavigationStack = createStackNavigator<UnauthorizeNavigationStackList>();

const UnauthorizeNavigation = () => {
  return (
    <UnauthorizeNavigationStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <UnauthorizeNavigationStack.Screen name="Onboarding" component={Onboarding} />
      <UnauthorizeNavigationStack.Screen name="Login" component={Login} />
      <UnauthorizeNavigationStack.Screen name="Signup" component={Signup} />
      <UnauthorizeNavigationStack.Screen name="OTPVerification" component={OTPVerification} />
    </UnauthorizeNavigationStack.Navigator>
  );
};

export default UnauthorizeNavigation;
