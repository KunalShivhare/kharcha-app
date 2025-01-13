import { create } from 'zustand';

type EXPENSE_STORE = {
  expenses: Array<any>;
  addExpense: (value: any) => any;
  getExpense: (expenseId: string) => any;
  deleteExpense: (expenseId: string) => void;
};

const useExpenseStore = create<EXPENSE_STORE>((set, get) => ({
  expenses: [],
  addExpense: (expense: any) => {
    set((state) => ({ expenses: [expense, ...state.expenses] }));
  },
  deleteExpense: (expenseId: string) => {
    set((state) => ({ expenses: state.expenses.filter((expense) => expense?.id !== expenseId) }));
  },
  getExpense: (expenseId: string) => {
    if (expenseId === '') return;
    const state = get();
    return state.expenses.find((expense) => expense.id === expenseId);
  },
}));

export { useExpenseStore };
