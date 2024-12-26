import { useGroupStore } from '@/src/stores/groupStore';
import React, { useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import Button from '../buttons/button';
import InputWithLabel from '../inputs/InputWithLabel';
import { useExpenseShareWithPersonsStore } from '@/src/stores/expenseShareWithPersons';

interface DataItem {
  id: string;
  member: string;
  amount: string;
}

const MemberList = (props: any) => {
  const { groupId, amount } = props;
  const { groups } = useGroupStore();
  const group = groups.find((group) => group.id === groupId);
  const members = group?.members ?? [];
  const { addExpenseShareWithPersons } = useExpenseShareWithPersonsStore();

  const [data, setData] = useState<DataItem[]>(
    members.map((member: any, index: any) => ({
      id: `${index}`,
      amount: 0,
      ...(({ amount, ...rest }) => rest)(member),
    }))
  );

  const handleChange = (id: string, amount: string) => {
    setData((prevData) =>
      prevData.map((item) => (item.id === id ? { ...item, amount: amount } : item))
    );
  };

  const renderItem = ({ item }: any) => {
    return (
      <InputWithLabel
        member={item.name}
        amount={item.amount}
        onChange={(amount) => handleChange(item.id, amount)}
      />
    );
  };

  const handleSaveExpense = () => {
    // check empty values
    const isShareEmpty = data.some((item) => {
      if (parseFloat(item.amount) === 0) {
        return true;
      }
    });
    if (isShareEmpty) {
      alert('Amount Should not be zero');
      return;
    }

    // check distributed amount should not be greater than actual amount
    const checkAmount = data.reduce((acc, item) => acc + parseFloat(item.amount), 0);
    if (checkAmount > parseFloat(amount)) {
      alert('Amount Should not greater to the total amount');
      return;
    }

    // proceed with adding expense.
    const personArray: any[] = [];
    data.forEach((item) => {
      const { id, ...rest } = item;
      return personArray.push({ ...rest, amount: item.amount });
    });
    addExpenseShareWithPersons(personArray);
    // router.back();
  };

  return (
    <View>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListFooterComponent={
          <View style={{ padding: 8 }}>
            <Button title="Save" type="Primary" size="long" onPress={handleSaveExpense} />
          </View>
        }
      />
    </View>
  );
};

export default MemberList;

const styles = StyleSheet.create({});
