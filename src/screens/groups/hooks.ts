import { useAuthorizeNavigation } from '@/src/navigators/navigators';
import { useContactStore } from '@/src/stores/contactStore';
import { useExpenseStore } from '@/src/stores/expenseStore';
import { useGroupStore } from '@/src/stores/groupStore';
import { useSelfStore } from '@/src/stores/selfStore';
import { faker } from '@faker-js/faker/.';
import { useEffect, useMemo, useState } from 'react';
import { Alert } from 'react-native';
import { useShallow } from 'zustand/react/shallow';

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
  const navigation = useAuthorizeNavigation();
  const [groupName, setGroupName] = useState<string>('');
  const [selectedGroupType, setGroupType] = useState<string>('');
  const { createGroup, editGroup } = useGroupStore();
  const groupData = useGroupStore((state) => state.getGroup(groupId));
  const expenses = useExpenseStore((state) => state.expenses);
  const [selectedContacts, resetSelectedContacts] = useContactStore(
    useShallow((state) => [state.selectedContacts, state.resetSelectedContacts])
  );
  const { self } = useSelfStore();
  const expenseData = useMemo(
    () => expenses.filter((item) => item?.groupId === groupId),
    [expenses, groupId]
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (groupData) {
      setLoading(false);
      setGroupName(groupData?.name);
      setGroupType(groupData?.type);
    }
  }, [groupData]);

  const reset = () => {
    setGroupName('');
    setGroupType('');
    resetSelectedContacts();
  };

  const onDonePress = () => {
    if (groupId) {
      const group = {
        ...groupData,
        name: groupName,
        type: selectedGroupType,
      };
      editGroup(group);
      reset();
      navigation.pop();
      return;
    }
    if (groupName === '') {
      Alert.alert('Group name is must!');
      return;
    }
    const group = {
      id: faker.database.mongodbObjectId(),
      name: groupName,
      type: selectedGroupType,
      avatar: faker.image.avatar(),
      members: [...selectedContacts, self],
    };

    createGroup(group);
    reset();
    navigation.replace('BottomTabNavigator');
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
    navigation.navigate('GroupDetails', {
      groupId: group?.id,
    });
  };

  const onAdd = (groupId: string) => {
    navigation.navigate('AddExpense', {
      groupId: groupId,
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
