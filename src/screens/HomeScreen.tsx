// src/screens/HomeScreen.tsx
import React from "react";
import { SafeAreaView, FlatList, StyleSheet } from "react-native";
import Header from "../components/Header";
import ExpenseItem from "../components/ExpenseItem";
import { Expense } from "../types/Expense";

const demoData: Expense[] = [
  { id: 1, title: "Lương tháng 10", amount: 10000000, type: "Thu", createdAt: "2025-11-01" },
  { id: 2, title: "Tiền ăn trưa", amount: 50000, type: "Chi", createdAt: "2025-11-01" },
  { id: 3, title: "Tiền điện nước", amount: 200000, type: "Chi", createdAt: "2025-11-01" },
];

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <FlatList
        data={demoData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <ExpenseItem item={item} />}
        contentContainerStyle={{ paddingVertical: 10 }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f2f2f2" },
});
