import { Redirect, Slot } from "expo-router";
import AuthProvider from "../providers/AuthProvider";

const RootLayout = () => {
  return (
    <AuthProvider>
      <Slot />
    </AuthProvider>
  );
};

export default RootLayout;
