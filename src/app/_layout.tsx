import { Redirect, Slot, Stack } from "expo-router";
import AuthProvider from "../providers/AuthProvider";

const RootLayout = () => {
  return (
    <AuthProvider>
      <Stack initialRouteName="(tabs)" screenOptions={{
        headerShown: false
      }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="modal/index" options={{
          presentation: 'modal',
          animation: 'slide_from_bottom'
        }} />
        <Stack.Screen name="addExpense/index" options={{
          presentation: 'modal',
          animation: 'slide_from_bottom'
        }} />
      </Stack>
    </AuthProvider>
  );
};

export default RootLayout;
