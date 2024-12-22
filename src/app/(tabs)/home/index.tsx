import GroupList from '@/src/components/groups/groupList';
import Header from '@/src/components/header/header';
import SummaryCard from '@/src/components/home/summaryCard';
import { COLORS } from '@/src/providers/theme.style';
import { router } from 'expo-router';
import { StatusBar, StyleSheet, View } from 'react-native';
import { useAuth } from '../../../providers/AuthProvider';
import Button from '@/src/components/buttons/button';
import { useEffect } from 'react';
import * as Contacts from 'expo-contacts';

const Home = () => {
  const { signOut } = useAuth();
  const onAddExpense = () => {
    router.push('/addExpense');
  };
  const onModal = () => {
    router.push('/modal');
  };

  return (
    <View>
      <StatusBar backgroundColor={COLORS.darkBackground} barStyle={'light-content'} />
      <Header title="Home" showBackButton={false} />
      <SummaryCard
        own={178.34}
        owed={320.87}
        onBalance={undefined}
        onViewDetails={undefined}
        onSettleUp={undefined}
      />
      <GroupList />
      {/* <Button title="Add Expense" onPress={onAddExpense}></Button>
      <Button title="logout" onPress={signOut}></Button> */}
    </View>
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
