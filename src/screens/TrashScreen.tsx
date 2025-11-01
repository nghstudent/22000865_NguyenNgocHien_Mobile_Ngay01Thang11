import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  FlatList,
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  RefreshControl,
  Alert,
} from "react-native";
import { getDeletedExpenses, deleteExpense, restoreExpense } from "../database/db";
import { Expense } from "../types/Expense";
import ExpenseItem from "../components/ExpenseItem";

export default function TrashScreen({ navigation }: any) {
  const [deletedExpenses, setDeletedExpenses] = useState<Expense[]>([]);
  const [searchText, setSearchText] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  const loadDeleted = () => {
    const data = getDeletedExpenses() as Expense[];
    setDeletedExpenses(data);
  };

  useEffect(() => {
    loadDeleted();
    const unsubscribe = navigation.addListener("focus", loadDeleted);
    return unsubscribe;
  }, [navigation]);

  // Xử lý nhấn lâu: hiển thị 2 lựa chọn
  const handleLongPress = (item: Expense) => {
    Alert.alert(
      "Chọn hành động",
      `Bạn muốn làm gì với "${item.title}"?`,
      [
        {
          text: "Khôi phục",
          onPress: () => {
            restoreExpense(item.id);
            loadDeleted();
          },
        },
        {
          text: "Xóa luôn",
          style: "destructive",
          onPress: () => {
            deleteExpense(item.id);
            loadDeleted();
          },
        },
        { text: "Hủy", style: "cancel" },
      ],
      { cancelable: true }
    );
  };

  const onRefresh = () => {
    setRefreshing(true);
    loadDeleted();
    setRefreshing(false);
  };

  const filteredDeleted = deletedExpenses.filter(e =>
    e.title.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        placeholder="Tìm kiếm..."
        value={searchText}
        onChangeText={setSearchText}
        style={styles.searchInput}
      />

      <FlatList
        data={filteredDeleted}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ExpenseItem
            item={item}
            onPress={() => {}}
            onLongPress={() => handleLongPress(item)}
          />
        )}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Thùng rác trống</Text>
          </View>
        }
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />

      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.addButtonText}>⬅️</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f2f2f2" },
  listContainer: { paddingVertical: 15, paddingHorizontal: 10, paddingBottom: 120 },
  emptyContainer: { flex: 1, alignItems: "center", justifyContent: "center", marginTop: 50 },
  emptyText: { fontSize: 18, color: "#999" },
  backButton: {
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
  addButtonText: { fontSize: 28, color: "#fff", fontWeight: "bold" },
  searchInput: {
    margin: 10,
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#fff",
  },
});
