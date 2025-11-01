// App.tsx
import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import { SafeAreaProvider, useSafeAreaInsets } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "./src/screens/HomeScreen";
import AddExpenseScreen from "./src/screens/AddExpenseScreen";
import EditExpenseScreen from "./src/screens/EditExpenseScreen";
import TrashScreen from "./src/screens/TrashScreen";
import { initDatabase } from "./src/database/db";

const Stack = createStackNavigator();

function AppWrapper() {
  const insets = useSafeAreaInsets(); // Lấy padding an toàn của tất cả điện thoại

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: { backgroundColor: "#6200EE" },
          headerTintColor: "#fff",
          headerTitleStyle: { fontWeight: "bold" },
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: "Khoản thu/chi" }} />
        <Stack.Screen name="AddExpense" component={AddExpenseScreen} options={{ title: "Thêm khoản mới" }} />
        <Stack.Screen name="EditExpense" component={EditExpenseScreen} options={{ title: "Sửa khoản" }} />
        <Stack.Screen name="Trash" component={TrashScreen} options={{ title: "Thùng rác" }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  useEffect(() => {
    initDatabase(); // Khởi tạo DB khi app chạy
  }, []);

  return (
    <SafeAreaProvider>
      <AppWrapper />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f2f2f2",
  },
});
