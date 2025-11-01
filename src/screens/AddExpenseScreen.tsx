import React, { useRef, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { addExpense } from "../database/db";

export default function AddExpenseScreen({ navigation }: any) {
  const titleRef = useRef<TextInput>(null);
  const amountRef = useRef<TextInput>(null);

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState<"Thu" | "Chi">("Chi");

  const handleSave = () => {
    if (!title || !amount) {
      Alert.alert("Lỗi", "Vui lòng nhập đầy đủ thông tin");
      return;
    }
    const id = addExpense(title, parseFloat(amount), type);
    if (id) {
      setTitle("");
      setAmount("");
      titleRef.current?.clear();
      amountRef.current?.clear();
      navigation.goBack();
    } else {
      Alert.alert("Lỗi", "Không thể lưu khoản thu/chi");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Tên khoản</Text>
      <TextInput
        ref={titleRef}
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="Nhập tên khoản"
        placeholderTextColor="#aaa"
      />

      <Text style={styles.label}>Số tiền</Text>
      <TextInput
        ref={amountRef}
        style={styles.input}
        value={amount}
        onChangeText={setAmount}
        placeholder="Nhập số tiền"
        placeholderTextColor="#aaa"
        keyboardType="numeric"
      />

      <Text style={styles.label}>Loại</Text>
      <View style={styles.typeRow}>
        <TouchableOpacity
          style={[styles.typeButton, type === "Thu" && styles.typeButtonIncome]}
          onPress={() => setType("Thu")}
        >
          <Text style={[styles.typeText, type === "Thu" && styles.typeTextActive]}>Thu</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.typeButton, type === "Chi" && styles.typeButtonExpense]}
          onPress={() => setType("Chi")}
        >
          <Text style={[styles.typeText, type === "Chi" && styles.typeTextActive]}>Chi</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Lưu khoản</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#F5F5F5" },
  label: { fontSize: 16, fontWeight: "500", marginTop: 15 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 12,
    marginTop: 5,
    backgroundColor: "#fff",
    fontSize: 16,
  },
  typeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 20,
  },
  typeButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    marginHorizontal: 5,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  typeButtonIncome: { backgroundColor: "#E8F5E9", borderColor: "#4CAF50" },
  typeButtonExpense: { backgroundColor: "#FFEBEE", borderColor: "#F44336" },
  typeText: { fontSize: 16, fontWeight: "500", color: "#555" },
  typeTextActive: { fontWeight: "600" },
  saveButton: {
    backgroundColor: "#6200EE",
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
    shadowColor: "#6200EE",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
  },
  saveButtonText: { color: "#fff", fontSize: 18, fontWeight: "600" },
});
