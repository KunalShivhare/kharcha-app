import LottieView from "lottie-react-native"
import React from "react"
import { StyleSheet, Text, View } from "react-native"
import { COLORS } from "../../providers/theme.style"
import { deviceHeight, deviceWidth, resize } from "../../utils/deviceDimentions"

const AppIntroSliderItem = ({ item }) => {
  return (
    <View style={styles.container}>
      <LottieView
        style={styles.image}
        loop={true}
        autoPlay
        resizeMode="contain"
        source={item?.url}
      />
      <View style={styles.headingContainer}>
        <Text style={styles.heading}>{item.heading}</Text>
      </View>
      <View style={styles.subHeadingContainer}>
        <Text style={styles.subHeading}>{item.subHeading}</Text>
      </View>
    </View>
  )
}

export default AppIntroSliderItem

const styles = StyleSheet.create({
  container: {
    width: deviceWidth,
    height: deviceHeight * 0.75,
    alignItems: "center",
  },
  image: {
    flex: 0.85,
    width: "100%",
  },
  headingContainer: {
    alignSelf: "center",
    maxWidth: resize(deviceWidth * 0.9),
  },
  subHeadingContainer: {
    alignSelf: "center",
    maxWidth: resize(deviceWidth * 0.4),
    paddingVertical: resize(16),
  },
  heading: {
    fontSize: resize(32),
    lineHeight: resize(34),
    color: COLORS.light100,
    fontWeight: "700",
    textAlign: "center",
  },
  subHeading: {
    fontSize: resize(16),
    lineHeight: resize(19),
    color: COLORS.light20,
    fontWeight: "500",
    textAlign: "center",
  },
})
