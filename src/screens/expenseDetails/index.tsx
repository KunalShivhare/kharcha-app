import ThemeWrapper from '@/src/HOCs/ThemeWrapper';
import { HStack } from '@/src/components/customUI/HStack';
import { VStack } from '@/src/components/customUI/VStack';
import Header from '@/src/components/header/header';
import { Layout } from '@/src/components/themes/globalStyles';
import { useTheme } from '@/src/components/themes/hooks';
import { AuthorizeNavigationProp } from '@/src/navigators/authorizeStack';
import { useAuthorizeNavigation } from '@/src/navigators/navigators';
import { useExpenseStore } from '@/src/stores/expenseStore';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import { useRoute } from '@react-navigation/native';
import React from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const ExpenseDetails = () => {
  const theme = useTheme();
  const styles = StyleSheet.create({
    fontWhite: {
      color: '#fff',
    },
    expenseContainer: {
      height: 160,
      justifyContent: 'flex-end',
      paddingHorizontal: 16,
      paddingVertical: 12,
    },
    expenseAmount: { fontSize: 32, fontWeight: '400' },
    expenseDescription: { fontSize: 32, fontWeight: '200', marginBottom: 4 },
    expenseDetailsContainer: {
      flex: 1,
      borderWidth: 1,
      borderColor: 'white',
      borderTopLeftRadius: 28,
      borderTopRightRadius: 28,
      backgroundColor: 'white',
    },
    members: {
      padding: 20,
      fontSize: 20,
      fontWeight: '600',
      color: theme.colors.darkBorder1,
      textTransform: 'uppercase',
    },
    fontBlack: { color: '#060606' },
    memberImage: { height: 60, width: 60, borderRadius: 50, borderWidth: 1, borderColor: 'white' },
    listContainer: {
      paddingHorizontal: 16,
      paddingVertical: 4,
      alignItems: 'center',
      gap: 4,
    },
    memberDetails: {
      justifyContent: 'space-between',
      gap: 4,
    },
    memberName: { fontSize: 16, fontWeight: '500' },
    expenseTypes: { fontSize: 16, fontWeight: '400', fontStyle: 'italic' },
    date: {
      fontStyle: 'italic',
    },
    addedUpdatedBY: {
      fontWeight: '300',
    },
  });
  const navigation = useAuthorizeNavigation();
  const { params } = useRoute<AuthorizeNavigationProp<'ExpenseDetails'>>();
  const { expenseId } = params;
  const { expenses } = useExpenseStore();
  const expense = expenses.filter((expense) => expense.id === expenseId)[0];
  const members = expense.person;
  const paidByUser = expense.paidByUser;
  const createdAt = new Date(expense.createdAt).toDateString();
  const updatedAt = new Date(expense.updatedAt).toDateString();

  const renderItem = ({ item }: { item: any }) => {
    const paidFlag = paidByUser.phoneNumber === item.phoneNumber;
    return (
      <HStack style={styles.listContainer}>
        <Image style={styles.memberImage} source={{ uri: 'https://picsum.photos/200' }} />
        <VStack style={styles.memberDetails}>
          <Text style={[styles.fontBlack, styles.memberName]}>{item?.name}</Text>
          <Text
            style={[
              styles.fontBlack,
              styles.expenseTypes,
              { color: paidFlag ? theme.colors.darkGreenText : `#E31B54` },
            ]}
          >
            {paidFlag ? `Owe ` : `Owes `}₹{item.amount}
          </Text>
        </VStack>
      </HStack>
    );
  };

  const handleEdit = () => {
    console.log('Edited');
    navigation.navigate('AddExpense', {
      expenseId: expenseId,
    });
  };

  const handleDelete = (expenseId: string) => {
    // Add delete methods for expenses.
    navigation.goBack();
  };

  return (
    <ThemeWrapper>
      <View style={[Layout.container]}>
        <Header title={'Expense'} />
        <VStack style={styles.expenseContainer}>
          <HStack style={{ justifyContent: 'space-between', alignItems: 'center' }}>
            <Text style={[styles.fontWhite, styles.expenseAmount]}>{`₹ ${expense.amount}`}</Text>
            <HStack style={{ alignItems: 'center', gap: 12 }}>
              <TouchableOpacity onPress={() => handleDelete(expense.id)}>
                <FontAwesome name="trash-o" size={24} color="white" />
              </TouchableOpacity>
              <TouchableOpacity onPress={handleEdit}>
                <SimpleLineIcons name="pencil" size={20} color="white" />
              </TouchableOpacity>
            </HStack>
          </HStack>
          <Text style={[styles.fontWhite, styles.expenseDescription]}>{expense.description}</Text>
          <VStack>
            <HStack>
              <Text style={[styles.fontWhite, styles.addedUpdatedBY]}>
                Added by {[paidByUser.firstName]} on{' '}
              </Text>
              <Text style={[styles.fontWhite, styles.date]}>{createdAt}</Text>
            </HStack>
            <HStack>
              <Text style={[styles.fontWhite, styles.addedUpdatedBY]}>
                Updated by {[paidByUser.firstName]} on{' '}
              </Text>
              <Text style={[styles.fontWhite, styles.date]}>{updatedAt}</Text>
            </HStack>
          </VStack>
        </VStack>
        <View style={styles.expenseDetailsContainer}>
          <VStack>
            <Text style={styles.members}>Members</Text>
            <FlatList
              data={members}
              keyExtractor={(member) => member.id}
              renderItem={renderItem}
              showsVerticalScrollIndicator={false}
            />
          </VStack>
        </View>
      </View>
    </ThemeWrapper>
  );
};

export default ExpenseDetails;
