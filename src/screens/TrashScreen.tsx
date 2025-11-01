// src/screens/TrashScreen.tsx
import React, { useEffect, useState } from "react";
import { SafeAreaView, FlatList, Text, View, StyleSheet } from "react-native";
import { getDeletedExpenses } from "../database/db";
import { Expense } from "../types/Expense";
import ExpenseItem from "../components/ExpenseItem";

export default function TrashScreen() {
  const [deletedExpenses, setDeletedExpenses] = useState<Expense[]>([]);

  const loadDeleted = () => {
    const data = getDeletedExpenses() as Expense[];
    setDeletedExpenses(data);
  };

  useEffect(() => {
    loadDeleted();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={deletedExpenses}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <ExpenseItem item={item} />}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Thùng rác trống</Text>
          </View>
        }
        contentContainerStyle={{ paddingVertical: 15 }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f2f2f2" },
  emptyContainer: { flex: 1, alignItems: "center", justifyContent: "center", marginTop: 50 },
  emptyText: { fontSize: 18, color: "#999" },
});
