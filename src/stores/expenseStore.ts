import { create } from 'zustand';

type EXPENSE_STORE = {
  expenses: Array<any>;
  addExpense: (value: any) => any;
};

const useExpenseStore = create<EXPENSE_STORE>((set) => ({
  expenses: [],
  addExpense: (expense: any) => {
    set((state) => ({ expenses: [expense, ...state.expenses] }));
  },
}));

export { useExpenseStore };
