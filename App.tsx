import { SafeAreaView, StyleSheet } from 'react-native'
import React from 'react'
import StackNavigation from './src/navigation/stackNavigation'

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StackNavigation />
    </SafeAreaView>
  )
}

export default App

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});