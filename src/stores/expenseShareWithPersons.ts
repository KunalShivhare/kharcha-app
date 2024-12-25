import { create } from 'zustand';

type EXPENSE_SHARE_STORE = {
  expenseSharesWithPersons: Array<any>;
  addExpenseShareWithPersons: (value: any) => any;
};

const useExpenseShareWithPersonsStore = create<EXPENSE_SHARE_STORE>((set) => ({
  expenseSharesWithPersons: [],
  addExpenseShareWithPersons: (expenseShare: any) => {
    set(() => ({
      expenseSharesWithPersons: expenseShare,
    }));
  },
}));

export { useExpenseShareWithPersonsStore };
