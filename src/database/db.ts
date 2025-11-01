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
    console.log('Database initialized');
  } catch (error) {
    console.error('Error initializing database:', error);
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
    console.log('Expense added with ID:', result.lastInsertRowId);
    return result.lastInsertRowId;
  } catch (error) {
    console.error('Error adding expense:', error);
    return null;
  }
};

// Lấy danh sách khoản thu/chi chưa xóa
export const getAllExpenses = () => {
  try {
    return db.getAllSync('SELECT * FROM expenses WHERE deleted = 0 ORDER BY id DESC');
  } catch (error) {
    console.error('Error fetching expenses:', error);
    return [];
  }
};

// Cập nhật khoản thu/chi
export const updateExpense = (id: number, title: string, amount: number, type: "Thu" | "Chi") => {
  try {
    db.runSync(
      'UPDATE expenses SET title = ?, amount = ?, type = ? WHERE id = ?',
      [title, amount, type, id]
    );
    console.log("Expense updated:", id);
    return true;
  } catch (error) {
    console.error("Error updating expense:", error);
    return false;
  }
};

export default db;
