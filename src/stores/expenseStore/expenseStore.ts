import { create } from 'zustand';

interface expenseStore {
  expenses: [];
  addExpense: (expense: []) => void;
}

const useExpenseStore = create((set) => ({
  expenses: [],
  addExpense: (expense: any) => set((state: any) => ({ expenses: [...state.expenses, expense] })),
}));

export { useExpenseStore };
