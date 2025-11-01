// src/screens/EditExpenseScreen.tsx
import React, { useState, useRef } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { Expense } from "../types/Expense";
import { updateExpense } from "../database/db";

type RootStackParamList = {
  Home: undefined;
  AddExpense: undefined;
  EditExpense: { expense: Expense };
};

type Props = StackScreenProps<RootStackParamList, "EditExpense">;

export default function EditExpenseScreen({ route, navigation }: Props) {
  const { expense } = route.params;

  const titleRef = useRef<TextInput>(null);
  const amountRef = useRef<TextInput>(null);

  const [title, setTitle] = useState(expense.title);
  const [amount, setAmount] = useState(expense.amount.toString());
  const [type, setType] = useState<"Thu" | "Chi">(expense.type);

  const handleSave = () => {
    if (!title || !amount) {
      Alert.alert("Lỗi", "Vui lòng nhập đầy đủ thông tin");
      return;
    }

    const success = updateExpense(expense.id, title, parseFloat(amount), type);
    if (success) {
      Alert.alert("Cập nhật thành công", "", [
        { text: "OK", onPress: () => navigation.goBack() },
      ]);
    } else {
      Alert.alert("Lỗi", "Không thể cập nhật khoản thu/chi");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Chỉnh sửa khoản thu/chi</Text>

      <Text style={styles.label}>Tên khoản:</Text>
      <TextInput
        ref={titleRef}
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="Nhập tên khoản"
      />

      <Text style={styles.label}>Số tiền:</Text>
      <TextInput
        ref={amountRef}
        style={styles.input}
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric"
        placeholder="Nhập số tiền"
      />

      <Text style={styles.label}>Loại:</Text>
      <View style={styles.row}>
        <TouchableOpacity
          style={[styles.typeButton, type === "Thu" && styles.typeButtonSelected, { backgroundColor: type === "Thu" ? "#4CAF50" : "#ccc" }]}
          onPress={() => setType("Thu")}
        >
          <Text style={[styles.typeText, type === "Thu" && styles.typeTextSelected]}>Thu</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.typeButton, type === "Chi" && styles.typeButtonSelected, { backgroundColor: type === "Chi" ? "#F44336" : "#ccc" }]}
          onPress={() => setType("Chi")}
        >
          <Text style={[styles.typeText, type === "Chi" && styles.typeTextSelected]}>Chi</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "700",
    color: "#6200EE",
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginTop: 15,
    marginBottom: 5,
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: "#fff",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 20,
  },
  typeButton: {
    flex: 1,
    paddingVertical: 12,
    marginHorizontal: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  typeButtonSelected: {
    // shadow hiệu ứng nổi
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  typeText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "600",
  },
  typeTextSelected: {
    color: "#fff",
  },
  saveButton: {
    backgroundColor: "#6200EE",
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: "center",
    marginTop: 20,
    shadowColor: "#6200EE",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 8,
  },
  saveButtonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "600",
  },
});
