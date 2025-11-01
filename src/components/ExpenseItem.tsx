// src/components/ExpenseItem.tsx
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Expense } from "../types/Expense";

interface Props {
  item: Expense;
}

export default function ExpenseItem({ item }: Props) {
  return (
    <View style={[styles.container, item.type === "Thu" ? styles.income : styles.expense]}>
      <View style={styles.row}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.amount}>{item.amount.toLocaleString()}₫</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.date}>{new Date(item.createdAt).toLocaleDateString()}</Text>
        <Text style={styles.type}>{item.type}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 12,
    marginVertical: 6,
    marginHorizontal: 10,
    borderRadius: 8,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 16,
    fontWeight: "500",
  },
  amount: {
    fontSize: 16,
    fontWeight: "600",
  },
  date: {
    fontSize: 12,
    color: "#555",
  },
  type: {
    fontSize: 12,
    fontWeight: "500",
  },
  income: {
    borderLeftWidth: 4,
    borderLeftColor: "#4CAF50",
  },
  expense: {
    borderLeftWidth: 4,
    borderLeftColor: "#F44336",
  },
});
