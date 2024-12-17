import { useExpenseStore } from '@/src/stores/expenseStore';
import { distributeEqualPrice } from '@/src/utilities/expenseUtils';
import { useRef, useState } from 'react';
import { TextInput } from 'react-native';

export enum SPLIT_TYPE {
  EQUALLY = 'equally',
  UNEQUALLY = 'unqually',
  PERCENTAGE = 'percentage',
}

const useAddExpense = () => {
  const [description, setDescription] = useState<string>('');
  const [amount, setAmount] = useState<number | undefined>(undefined);
  const [splitType, setSplitType] = useState<SPLIT_TYPE>(SPLIT_TYPE.EQUALLY);
  const amountRef = useRef<TextInput>(null);

  const { addExpense, expenses } = useExpenseStore();

  const onAddExpense = async () => {
    const personWithPrice = distributeEqualPrice(amount ?? 0, [
      {
        id: '1',
        name: 'Kunal',
      },
      {
        id: '2',
        name: 'Parsediya',
      },
      {
        id: '3',
        name: 'Aditya',
      },
    ]);

    const expense = {
      description: description,
      splitType: splitType,
      amount: amount,
      groupId: '123',
      person: personWithPrice,
      paidBy: '1',
    };

    await addExpense(expense);
  };

  return {
    description,
    setDescription,
    amount,
    setAmount,
    splitType,
    setSplitType,
    amountRef,
    onAddExpense,
  };
};

export { useAddExpense };
