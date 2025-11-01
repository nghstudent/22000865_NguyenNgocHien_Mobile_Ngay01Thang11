// src/database/db.ts
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabaseSync('expenses.db');

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
    console.log('✅ Database initialized');
  } catch (error) {
    console.error('❌ Error initializing database:', error);
  }
};

// Thêm khoản thu/chi mới
export const addExpense = (title: string, amount: number, type: "Thu" | "Chi") => {
  try {
    const createdAt = new Date().toISOString();
    const result = db.runSync(
      'INSERT INTO expenses (title, amount, type, createdAt, deleted) VALUES (?, ?, ?, ?, 0)',
      [title, amount, type, createdAt]
    );
    console.log('✅ Expense added with ID:', result.lastInsertRowId);
    return result.lastInsertRowId;
  } catch (error) {
    console.error('❌ Error adding expense:', error);
    return null;
  }
};

// Lấy danh sách khoản thu/chi chưa xóa (sẽ dùng cho màn hình chính)
export const getAllExpenses = () => {
  try {
    return db.getAllSync('SELECT * FROM expenses WHERE deleted = 0 ORDER BY id DESC');
  } catch (error) {
    console.error('❌ Error fetching expenses:', error);
    return [];
  }
};

export default db;
