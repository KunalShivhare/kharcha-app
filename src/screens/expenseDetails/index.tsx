import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useRoute } from '@react-navigation/native';
import { AuthorizeNavigationProp } from '@/src/navigators/authorizeStack';
import { useExpenseStore } from '@/src/stores/expenseStore';

const ExpenseDetails = () => {
  const { params } = useRoute<AuthorizeNavigationProp<'ExpenseDetails'>>();
  const { expenseId } = params;
  console.log('🚀 ~ ExpenseDetails ~ expenseId:', expenseId);
  const { expenses } = useExpenseStore();
  const expense = expenses.filter((expense) => {
    console.log('🚀 ~ ExpenseDetails ~ expense:', expense);
    return expense.id === expenseId;
  });
  return (
    <View>
      <Text>ExpenseDetails</Text>
    </View>
  );
};

export default ExpenseDetails;

const styles = StyleSheet.create({});
