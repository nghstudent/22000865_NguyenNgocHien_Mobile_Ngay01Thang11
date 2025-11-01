import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { SafeAreaView, StyleSheet } from "react-native";
import HomeScreen from "./src/screens/HomeScreen";

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea}>
        <HomeScreen />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    marginTop: 30,  
    marginBottom: 50,
    backgroundColor: "#f2f2f2",
  },
});
