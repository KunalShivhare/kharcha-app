import { Button, StatusBar, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../../../providers/AuthProvider';
import { Link, router } from 'expo-router';
import { COLORS } from '@/src/providers/theme.style';
import Header from '@/src/components/header/header';
import SummaryCard from '@/src/components/home/summaryCard';

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
      {/* <Button title="Add Expense" onPress={onAddExpense}></Button> */}
      {/* <Button title="Open modal" onPress={onModal}></Button> */}
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
