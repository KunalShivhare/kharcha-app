import { router } from "expo-router"
import React from "react"
import { StyleSheet, View } from "react-native"
import AppIntroSlider from "../../../components/appIntroSlider/appIntroSlider"
import LargeButton from "../../../components/buttons/largeButton"
import { COLORS } from "../../../providers/theme.style"
import { resize } from "../../../utils/deviceDimentions"

const Onboarding = () => {
  const handleGetStartedOnPress = () => {
    router.push("/signup")
  }
  const handleLoginOnPress = () => {
    router.push("/login")
  }

  return (
    <View style={styles.container}>
      <AppIntroSlider />
      <View style={styles.doubleCTAContainer}>
        <LargeButton
          title={"Get Started"}
          style={{
            flex: 1,
            backgroundColor: "transparent",
            borderWidth: 1,
            borderColor: COLORS.light100,
          }}
          onPress={handleGetStartedOnPress}
        />
        <LargeButton
          title={"Login"}
          onPress={handleLoginOnPress}
          style={{
            flex: 1,
          }}
        />
      </View>
    </View>
  )
}

export default Onboarding

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  doubleCTAContainer: {
    bottom: 0,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: resize(10),
    marginBottom: resize(16),
    gap: 10,
    marginHorizontal: resize(16),
  },
})
