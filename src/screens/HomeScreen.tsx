import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
} from "react-native";
import Header from "../components/Header";
import ExpenseItem from "../components/ExpenseItem";
import { Expense } from "../types/Expense";
import { getAllExpenses } from "../database/db";

export default function HomeScreen({ navigation }: any) {
  const [expenses, setExpenses] = useState<Expense[]>([]);

  const loadExpenses = () => {
    const data = getAllExpenses() as Expense[];
    setExpenses(data);
  };

  useEffect(() => {
    loadExpenses();
    const unsubscribe = navigation.addListener("focus", loadExpenses);
    return unsubscribe;
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <Header />

      <FlatList
        data={expenses}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ExpenseItem
            item={item}
            onPress={() => navigation.navigate("EditExpense", { expense: item })}
            onLongPress={() => console.log("Nhấn giữ:", item.id)}
          />
        )}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyIcon}>💸</Text>
            <Text style={styles.emptyText}>Chưa có khoản thu/chi nào</Text>
            <Text style={styles.emptySubtext}>Nhấn nút + để thêm mới</Text>
          </View>
        }
      />

      {/* FAB Add Button */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate("AddExpense")}
        activeOpacity={0.8}
      >
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f2f2f2" },
  listContainer: { paddingVertical: 15, paddingHorizontal: 10, paddingBottom: 100 },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
  },
  emptyIcon: { fontSize: 64, marginBottom: 16 },
  emptyText: { fontSize: 18, color: "#666", fontWeight: "600", marginBottom: 4 },
  emptySubtext: { fontSize: 14, color: "#999" },
  addButton: {
    position: "absolute",
    right: 20,
    bottom: 30,
    backgroundColor: "#6200EE",
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#6200EE",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 8,
  },
  addButtonText: {
    fontSize: 36,
    color: "#fff",
    fontWeight: "300",
    marginTop: -2,
  },
});
