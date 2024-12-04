import { Redirect, Stack } from "expo-router"
import { useAuth } from "../../providers/AuthProvider"
import { SafeAreaView } from "react-native-safe-area-context"

import {
  ThemeProvider,
  DarkTheme,
  DefaultTheme,
  useTheme,
} from "@react-navigation/native"
import { StatusBar, StyleSheet } from "react-native"

const AuthLayout = () => {
  const { isAuthenticated } = useAuth()

  if (isAuthenticated) {
    return <Redirect href={"/home"} />
  }

  return (
    // <SafeAreaView style={styles.main}>
      <ThemeProvider
        value={{
          dark: true,
          colors: {
            primary: "#00A86B",
            background: "#212325",
            card: "#292B2D",
            text: "rgb(229, 229, 231)",
            border: "rgb(39, 39, 41)",
            notification: "rgb(255, 69, 58)",
          },
        }}
      >
        <StatusBar backgroundColor="#212325" />
        <Stack>
          <Stack.Screen
            name="onboarding/index"
            options={{
              headerShown: false,
              title: "Onboarding",
            }}
          />
          <Stack.Screen
            name="login/index"
            options={{
              headerShown: false,
              title: "Login",
              animation: "slide_from_right",
            }}
          />
          <Stack.Screen
            name="signup/index"
            options={{
              headerShown: false,
              title: "Sign Up",
              animation: "slide_from_right",
            }}
          />
          <Stack.Screen
            name="otpVerification/index"
            options={{
              headerShown: false,
              title: "Verification",
              animation: "slide_from_right",
            }}
          />
        </Stack>
      </ThemeProvider>
    // </SafeAreaView>
  )
}

export default AuthLayout

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
})
