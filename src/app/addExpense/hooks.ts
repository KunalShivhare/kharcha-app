import { useExpenseStore } from '@/src/stores/expenseStore';
import { distributeEqualPrice } from '@/src/utilities/expenseUtils';
import { faker } from '@faker-js/faker/.';
import { router } from 'expo-router';
import { useRef, useState } from 'react';
import { TextInput } from 'react-native';

export enum SPLIT_TYPE {
  EQUALLY = 'equally',
  UNEQUALLY = 'unqually',
  PERCENTAGE = 'percentage',
}

const useAddExpense = ({ groupId }: { groupId?: string }) => {
  const [description, setDescription] = useState<string>('');
  const [amount, setAmount] = useState<number | undefined>(undefined);
  const [splitType, setSplitType] = useState<SPLIT_TYPE>(SPLIT_TYPE.EQUALLY);
  const amountRef = useRef<TextInput>(null);

  const { addExpense, expenses } = useExpenseStore();

  const onAddExpense = async () => {
    if (amount === 0) return;
    const { persons: personWithPrice, totalLent } = distributeEqualPrice(amount ?? 0, [
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
    console.log('🚀 ~ onAddExpense ~ personWithPrice:', personWithPrice);

    const expense = {
      id: faker.database.mongodbObjectId(),
      avatar: faker.image.avatar(),
      description: description,
      splitType: splitType,
      amount: amount,
      groupId: groupId,
      person: personWithPrice,
      totalLent: totalLent,
      paidBy: '1',
    };

    await addExpense(expense);
    router.back();
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
