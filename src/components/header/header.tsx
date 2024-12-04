import { AntDesign } from "@expo/vector-icons"
import { router } from "expo-router"
import React from "react"
import { Pressable, StyleSheet, Text, TextStyle, View } from "react-native"
import { COLORS } from "../../providers/theme.style"
import { resize } from "../../utils/deviceDimentions"

const Header: React.FC<{
  title: string
  titleStyle?: TextStyle
  onPressback?: () => void
}> = ({ title, titleStyle, onPressback }) => {
  const handleOnPressBackButton = () => {
    if (onPressback) {
      onPressback()
    } else {
      router.back()
    }
  }
  return (
    <View style={styles.headerContainer}>
      <View style={styles.headerSubContainer}>
        <Pressable
          style={styles.backButtonContainer}
          onPress={handleOnPressBackButton}
        >
          <AntDesign name="arrowleft" size={resize(32)} color="white" />
        </Pressable>
        <View style={styles.titleContainer}>
          <Text style={[styles.title, titleStyle]}>{title}</Text>
        </View>
      </View>
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
  headerContainer: {
    width: "100%",
    height: resize(64),
    justifyContent: "center",
  },
  headerSubContainer: {
    height: resize(32),
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: resize(16),
  },
  backButtonContainer: {
    flex: 0.1,
  },
  titleContainer: {
    flex: 0.8,
    justifyContent: "center",
    alignItems: "center",
    height: resize(64),
  },
  title: {
    color: COLORS.light100,
    fontSize: resize(18),
    lineHeight: resize(22),
    fontWeight: "600",
  },
})