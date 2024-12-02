import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'

const App = () => {
  return (
    <View>
      <Link href={'/second'}>index</Link>
    </View>
  )
}

export default App

const styles = StyleSheet.create({})