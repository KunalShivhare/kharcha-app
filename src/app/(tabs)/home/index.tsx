import { StatusBar } from "expo-status-bar"
import { Button, StyleSheet, Text } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useAuth } from "../../../providers/AuthProvider"

const Home = () => {
  const { signOut } = useAuth()

  return (
    <SafeAreaView style={styles.container}>
      <Text>Home, Screen!</Text>
      <Button title="Sign Out" onPress={signOut}></Button>
      <StatusBar style="auto" />
    </SafeAreaView>
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: COLORS.dark50,
  },
})
