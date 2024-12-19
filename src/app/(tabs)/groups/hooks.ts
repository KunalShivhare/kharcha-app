import { useExpenseStore } from '@/src/stores/expenseStore';
import { useGroupStore } from '@/src/stores/groupStore';
import { faker } from '@faker-js/faker/.';
import { router } from 'expo-router';
import { useEffect, useMemo, useState } from 'react';
import { Alert } from 'react-native';

const useGroups = (props?: any) => {
  const groupId = props?.groupId ?? '';
  const owed = 102.28;
  const own = 76.84;
  const groupTypes = [
    {
      name: 'Trip',
    },
    {
      name: 'Home',
    },
    {
      name: 'Couple',
    },
    {
      name: 'Other',
    },
  ];
  const [groupName, setGroupName] = useState<string>('');
  const [selectedGroupType, setGroupType] = useState<string>('');
  const { createGroup } = useGroupStore();
  const groupData = useGroupStore((state) => state.groups.find((item) => item?.id === groupId));
  const expenses = useExpenseStore((state) => state.expenses);

  const expenseData = useMemo(
    () => expenses.filter((item) => item?.groupId === groupId),
    [expenses, groupId]
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (groupData) {
      setLoading(false);
    }
  }, [groupData]);

  const reset = () => {
    setGroupName('');
    setGroupType('');
  };

  const onDonePress = () => {
    if (groupName === '') {
      Alert.alert('Group name is must!');
      return;
    }
    const group = {
      id: faker.database.mongodbObjectId(),
      name: groupName,
      type: selectedGroupType,
      avatar: faker.image.avatar(),
    };

    createGroup(group);
    reset();
    router.back();
  };

  const onSettleUp = () => {
    console.log('Settle up');
  };

  const onViewDetails = () => {
    console.log('View details');
  };

  const onBalance = () => {
    console.log('Balance');
  };

  const onPressGroupCard = (group: { avatar: string; id: string; name: string; type: string }) => {
    router.push({
      pathname: '/groups/groupDetails',
      params: {
        groupId: group?.id,
      },
    });
  };

  const onAdd = (groupId: string) => {
    router.push({
      pathname: '/addExpense',
      params: {
        groupId: groupId,
      },
    });
  };

  return {
    owed,
    own,
    onBalance,
    onSettleUp,
    onViewDetails,
    groupTypes,
    groupName,
    setGroupName,
    selectedGroupType,
    setGroupType,
    onDonePress,
    onPressGroupCard,
    onAdd,
    groupData,
    expenseData,
  };
};

export { useGroups };
