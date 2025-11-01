import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabaseSync("expenses.db");

// Khởi tạo bảng
export const initDatabase = () => {
  try {
    db.execSync(`
      CREATE TABLE IF NOT EXISTS expenses (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        amount REAL NOT NULL,
        type TEXT NOT NULL,
        createdAt TEXT NOT NULL,
        deleted INTEGER DEFAULT 0
      );
    `);
    console.log("✅ Database initialized");
  } catch (error) {
    console.error("❌ Error initializing database:", error);
  }
};

// Thêm khoản
export const addExpense = (title: string, amount: number, type: "Thu" | "Chi") => {
  try {
    const createdAt = new Date().toISOString();
    const result = db.runSync(
      "INSERT INTO expenses (title, amount, type, createdAt, deleted) VALUES (?, ?, ?, ?, 0)",
      [title, amount, type, createdAt]
    );
    return result.lastInsertRowId;
  } catch (error) {
    console.error("❌ Error adding expense:", error);
    return null;
  }
};

// Lấy danh sách chưa xóa
export const getAllExpenses = () => {
  try {
    const data = db.getAllSync("SELECT * FROM expenses WHERE deleted=0 ORDER BY id DESC");
    return data.map((e: any) => ({ ...e, deleted: false }));
  } catch (error) {
    console.error("❌ Error fetching expenses:", error);
    return [];
  }
};

// Cập nhật khoản
export const updateExpense = (id: number, title: string, amount: number, type: "Thu" | "Chi") => {
  try {
    db.runSync("UPDATE expenses SET title=?, amount=?, type=? WHERE id=?", [title, amount, type, id]);
    return true;
  } catch (error) {
    console.error("❌ Error updating expense:", error);
    return false;
  }
};

// Xóa mềm (soft delete)
export const softDeleteExpense = (id: number) => {
  try {
    db.runSync("UPDATE expenses SET deleted=1 WHERE id=?", [id]);
    return true;
  } catch (error) {
    console.error("❌ Error soft deleting expense:", error);
    return false;
  }
};

// Lấy danh sách đã xóa
export const getDeletedExpenses = () => {
  try {
    const data = db.getAllSync("SELECT * FROM expenses WHERE deleted=1 ORDER BY id DESC");
    return data.map((e: any) => ({ ...e, deleted: true }));
  } catch (error) {
    console.error("❌ Error fetching deleted expenses:", error);
    return [];
  }
};

// Xóa vĩnh viễn
export const deleteExpense = (id: number) => {
  try {
    db.runSync("DELETE FROM expenses WHERE id=?", [id]);
    return true;
  } catch (error) {
    console.error("❌ Error permanently deleting expense:", error);
    return false;
  }
};

export default db;
