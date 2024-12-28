import GroupList from '@/src/components/groups/groupList';
import Header from '@/src/components/header/header';
import SummaryCard from '@/src/components/home/summaryCard';
import { StatusBar, StyleSheet } from 'react-native';
import { VStack } from '@/src/components/customUI/VStack';
import { useHome } from './hooks';
import { useTheme } from '@/src/components/themes/hooks';
import { useAuth } from '@/src/providers/AuthProvider';
import { useAuthorizeNavigation } from '@/src/navigators/navigators';
import Button from '@/src/components/buttons/button';

const Home = () => {
  const {} = useHome();
  const { signOut } = useAuth();
  const navigation = useAuthorizeNavigation();
  // const onAddExpense = () => {
  // navigation.navigate('AddExpense', {});
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
      {/* <Button title="Add Expense" onPress={onAddExpense}></Button> */}
      {/* <Button
        textVariant="label3_regular"
        title="logout"
        onPress={signOut}
        type={'Primary'}
        size={'long'}
      ></Button> */}
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
