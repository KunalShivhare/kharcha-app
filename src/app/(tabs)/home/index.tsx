import { Button, StyleSheet, Text } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useAuth } from "../../../providers/AuthProvider"
import { Link, router } from "expo-router"

const Home = () => {
  const { signOut } = useAuth()
  const onAddExpense =() => {
    router.push('/addExpense')
  }
  const onModal =() => {
    router.push('/modal')
  }

  return (
    <SafeAreaView style={styles.container}>
      <Button title="Add Expense" onPress={onAddExpense}></Button>
      <Button title="Open modal" onPress={onModal}></Button>
    </SafeAreaView>
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
})
