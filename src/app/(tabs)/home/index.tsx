import GroupList from '@/src/components/groups/groupList';
import Header from '@/src/components/header/header';
import SummaryCard from '@/src/components/home/summaryCard';
import { COLORS } from '@/src/providers/theme.style';
import { StatusBar, StyleSheet } from 'react-native';
import { useAuth } from '../../../providers/AuthProvider';
import { VStack } from '@/src/components/customUI/VStack';
import { useHome } from './hooks';
import { useTheme } from '@/src/components/themes/hooks';

const Home = () => {
  const {} = useHome();
  const { signOut } = useAuth();
  // const onAddExpense = () => {
  //   router.push('/addExpense');
  // };
  // const onModal = () => {
  //   router.push('/modal');
  // };
  const theme = useTheme();

  return (
    <VStack
      flex={1}
      style={{
        backgroundColor: theme.colors.primaryColor,
      }}
    >
      <StatusBar backgroundColor={theme.colors.primaryColor} barStyle={'light-content'} />
      <Header title="Home" showBackButton={false} />
      <SummaryCard
        own={178.34}
        owed={320.87}
        onBalance={undefined}
        onViewDetails={undefined}
        onSettleUp={undefined}
      />
      <VStack flex={1}>
        <GroupList />
      </VStack>
      {/* <Button title="Add Expense" onPress={onAddExpense}></Button>
      <Button title="logout" onPress={signOut}></Button> */}
    </VStack>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
