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
  return { description, setDescription, amount, setAmount, splitType, setSplitType, amountRef };
};

export { useAddExpense };
