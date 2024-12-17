import { useGroupStore } from '@/src/stores/groupStore';
import { faker } from '@faker-js/faker/.';
import { router } from 'expo-router';
import { useState } from 'react';
import { Alert } from 'react-native';

const useGroups = () => {
  const owed = 102.28;
  const own = 76.84;
  const [groupName, setGroupName] = useState<string>('');
  const [selectedGroupType, setGroupType] = useState<string>('');
  const { createGroup } = useGroupStore();

  const onDonePress = () => {
    if (groupName === '') {
      Alert.alert('Group name is must!');
      return;
    }
    const group = {
      id: faker.database.mongodbObjectId(),
      name: groupName,
      type: groupType,
      avatar: faker.image.avatar(),
    };

    createGroup(group);
    router.back();
  };
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

  const onSettleUp = () => {
    console.log('Settle up');
  };

  const onViewDetails = () => {
    console.log('View details');
  };

  const onBalance = () => {
    console.log('Balance');
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
  };
};

export { useGroups };
