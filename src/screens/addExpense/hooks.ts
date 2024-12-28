import { useAuthorizeNavigation } from '@/src/navigators/navigators';
import { useExpenseStore } from '@/src/stores/expenseStore';
import { useSelfStore } from '@/src/stores/selfStore';
import { distributeEqualPrice } from '@/src/utilities/expenseUtils';
import { faker } from '@faker-js/faker/.';
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
  const { self } = useSelfStore();
  const { addExpense } = useExpenseStore();
  const navigation = useAuthorizeNavigation();

  const onAddExpense = async (members: []) => {
    if (amount === 0) return;
    const { persons: personWithPrice, totalLent } = distributeEqualPrice(amount ?? 0, members);
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
    navigation.goBack();
  };

  const onAddUnequalExpense = async (personWithAmount: any[]) => {
    const totalAmount = personWithAmount.reduce(
      (acc, person) => acc + parseFloat(person.amount),
      0
    );
    const selfAmonuntPerson = personWithAmount.filter(
      (person) => person.phoneNumber === self.phoneNumber
    );

    const expense = {
      id: faker.database.mongodbObjectId(),
      avatar: faker.image.avatar(),
      description: description,
      splitType: splitType,
      amount: amount,
      groupId: groupId,
      person: personWithAmount,
      totalLent: totalAmount - selfAmonuntPerson[0].amount,
      paidBy: '1',
    };

    await addExpense(expense);
    navigation.goBack();
  };

  const onGroupPress = () => {
    navigation.navigate('CustomModal');
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
    onGroupPress,
    onAddUnequalExpense,
  };
};

export { useAddExpense };
