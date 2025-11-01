import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
  TextInput,
  RefreshControl,
} from "react-native";
import ExpenseItem from "../components/ExpenseItem";
import { Expense } from "../types/Expense";
import { getAllExpenses, softDeleteExpense } from "../database/db";

export default function HomeScreen({ navigation }: any) {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [searchText, setSearchText] = useState("");
  const [filterType, setFilterType] = useState<"Tất cả" | "Thu" | "Chi">("Tất cả");
  const [refreshing, setRefreshing] = useState(false);

  const loadExpenses = () => {
    const data = getAllExpenses() as Expense[];
    setExpenses(data);
  };

  useEffect(() => {
    loadExpenses();
    const unsubscribe = navigation.addListener("focus", loadExpenses);
    return unsubscribe;
  }, [navigation]);

  const handleSoftDelete = (item: Expense) => {
    softDeleteExpense(item.id);
    loadExpenses();
  };

  const onRefresh = () => {
    setRefreshing(true);
    loadExpenses();
    setRefreshing(false);
  };

  const filteredExpenses = expenses
    .filter(e =>
      filterType === "Tất cả" ? true : e.type === filterType
    )
    .filter(e =>
      e.title.toLowerCase().includes(searchText.toLowerCase())
    );

  return (
    <SafeAreaView style={styles.container}>
      {/* Search input */}
      <TextInput
        placeholder="Tìm kiếm..."
        value={searchText}
        onChangeText={setSearchText}
        style={styles.searchInput}
      />

      {/* Filter buttons */}
      <View style={styles.filterContainer}>
        {["Tất cả", "Thu", "Chi"].map((type) => (
          <TouchableOpacity
            key={type}
            style={[
              styles.filterButton,
              filterType === type && styles.filterButtonActive,
            ]}
            onPress={() => setFilterType(type as any)}
          >
            <Text
              style={[
                styles.filterText,
                filterType === type && styles.filterTextActive,
              ]}
            >
              {type}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Expense list */}
      <FlatList
        data={filteredExpenses}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ExpenseItem
            item={item}
            onPress={() => navigation.navigate("EditExpense", { expense: item })}
            onLongPress={() => handleSoftDelete(item)}
          />
        )}
        contentContainerStyle={styles.listContainer}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />

      <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate("AddExpense")}>
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.trashButton} onPress={() => navigation.navigate("Trash")}>
        <Text style={styles.addButtonText}>🗑️</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f2f2f2" },
  listContainer: { paddingVertical: 15, paddingHorizontal: 10, paddingBottom: 120 },
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
  trashButton: {
    position: "absolute",
    right: 100,
    bottom: 30,
    backgroundColor: "#f44336",
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#f44336",
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
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginHorizontal: 10,
    marginBottom: 10,
  },
  filterButton: {
    paddingVertical: 6,
    paddingHorizontal: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#6200EE",
    backgroundColor: "#fff",
  },
  filterButtonActive: {
    backgroundColor: "#6200EE",
  },
  filterText: { color: "#6200EE", fontWeight: "600" },
  filterTextActive: { color: "#fff" },
});
