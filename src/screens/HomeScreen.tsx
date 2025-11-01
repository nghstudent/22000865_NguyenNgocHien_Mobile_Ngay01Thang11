import React from "react";
import { SafeAreaView, View, StyleSheet } from "react-native";
import Header from "../components/Header";

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <View style={styles.content}>
        {/* Khu vực hiển thị danh sách thu chi sẽ làm ở câu sau */}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f2f2f2" },
  content: { flex: 1, padding: 16 },
});
