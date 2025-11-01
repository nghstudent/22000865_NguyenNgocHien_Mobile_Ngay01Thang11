import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function Header() {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>EXPENSE TRACKER</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    padding: 20,
    backgroundColor: "#6200EE",
    alignItems: "center",
    justifyContent: "center",
  },
  title: { fontSize: 24, color: "#fff", fontWeight: "bold" },
});
