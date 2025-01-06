import { useAuthorizeNavigation } from '@/src/navigators/navigators';
import { useExpenseStore } from '@/src/stores/expenseStore';
import { useGroupStore } from '@/src/stores/groupStore';
import { useSelfStore } from '@/src/stores/selfStore';
import { distributeEqualPrice } from '@/src/utilities/expenseUtils';
import { faker } from '@faker-js/faker/.';
import { useEffect, useRef, useState } from 'react';
import { TextInput } from 'react-native';

export enum SPLIT_TYPE {
  EQUALLY = 'equally',
  UNEQUALLY = 'unqually',
  // PERCENTAGE = 'percentage',
}

const useAddExpense = ({ groupId }: { groupId?: string }) => {
  const [description, setDescription] = useState<string>('');
  const [amount, setAmount] = useState<number | undefined>(undefined);
  const [splitType, setSplitType] = useState<SPLIT_TYPE>(SPLIT_TYPE.EQUALLY);
  const amountRef = useRef<TextInput>(null);
  const { self } = useSelfStore();
  const { addExpense } = useExpenseStore();
  const navigation = useAuthorizeNavigation();
  const [membersList, setMembersList] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState();
  const [paidByUser, setPaidByUser] = useState(self);
  const group = useGroupStore((state) => state.groups.find((item) => item.id === groupId));
  const expenseType = paidByUser?.phoneNumber === self?.phoneNumber ? 'LENT' : 'OWED';

  useEffect(() => {
    if (group) {
      let members = group?.members?.map((member: any) => {
        return {
          ...member,
          amount: 0,
        };
      });
      setSelectedGroup(group);
      setMembersList(members);
    }
  }, [group]);

  const onEndEditing = () => {
    const { persons }: { persons: any } = distributeEqualPrice(amount ?? 0, membersList);
    setMembersList([...persons]);
  };

  const onAddExpense = async () => {
    if (amount === 0) return;

    if (splitType === SPLIT_TYPE.UNEQUALLY) {
      const unqualAmpuntSum = membersList.reduce(
        (acc, member) => acc + parseFloat(member.amount),
        0
      );
      if (unqualAmpuntSum > Number(amount)) {
        alert('Amount should be equal to sum of all members');
        return;
      }
    }
    const personalAmount = membersList.find((member) => member?.phoneNumber === self?.phoneNumber);
    let totalLent = null;
    let totalOwed = null;
    if (expenseType === 'LENT') {
      totalLent = Number(amount) - personalAmount?.amount;
    } else {
      totalOwed = personalAmount?.amount;
    }
    const expense = {
      id: faker.database.mongodbObjectId(),
      avatar: faker.image.avatar(),
      description: description,
      splitType: splitType,
      amount: amount,
      groupId: groupId,
      person: membersList,
      totalLent: totalLent ?? null,
      totalOwed: totalOwed ?? null,
      expenseType: expenseType,
      paidByUser: paidByUser,
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
    // navigation.navigate('CustomModal', {});
  };

  const inputExpense = (member: any, amount: number) => {
    setMembersList((prev: any) =>
      prev.map((item: any) => {
        if (item?.phoneNumber === member?.phoneNumber) {
          return {
            ...item,
            amount: amount,
          };
        }
        return item;
      })
    );
  };

  const removeMemberFromExpense = (member: any) => {
    setMembersList((prev) => prev.filter((item: any) => item?.phoneNumber !== member?.phoneNumber));
  };

  const handleSetUnequally = (item: SPLIT_TYPE) => {
    setSplitType(item);
    if (item === SPLIT_TYPE.EQUALLY) {
      const { persons }: { persons: any } = distributeEqualPrice(amount ?? 0, membersList);
      setMembersList([...persons]);
    }
    if (item === SPLIT_TYPE.UNEQUALLY) {
      const persons = membersList.map((item: any) => {
        return {
          ...item,
          amount: 0,
        };
      });
      setMembersList([...persons]);
    }
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
    membersList,
    selectedGroup,
    removeMemberFromExpense,
    paidByUser,
    setPaidByUser,
    inputExpense,
    onEndEditing,
    handleSetUnequally,
  };
};

export { useAddExpense };
