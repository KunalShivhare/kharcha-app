import { useAuthorizeNavigation } from '@/src/navigators/navigators';
import { useExpenseStore } from '@/src/stores/expenseStore';
import { useShallow } from 'zustand/react/shallow';

const useExpenseDetails = ({ expenseId }: { expenseId: string }) => {
  const [expenseDetail, deleteExpense] = useExpenseStore(
    useShallow((state) => [state.getExpense(expenseId), state.deleteExpense])
  );
  const navigation = useAuthorizeNavigation();
  const handleEdit = () => {
    navigation.navigate('AddExpense', {
      expenseId: expenseId,
      groupId: expenseDetail?.groupId,
    });
  };

  const handleDelete = (expenseId: string) => {
    deleteExpense(expenseId);
    navigation.goBack();
  };

  return { expenseDetail, handleEdit, handleDelete };
};

export { useExpenseDetails };
