// src/types/Expense.ts
export interface Expense {
  id: number;
  title: string;
  amount: number;
  type: "Thu" | "Chi";
  createdAt: string; // ISO string
  deleted?: boolean;
}
