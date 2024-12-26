import { BottomTabBarProps, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../app/(tabs)/home';
import Friends from '../app/(tabs)/friends';
import Activity from '../app/(tabs)/activity';
import Account from '../app/(tabs)/account';

export type TabStackParamList = {
  Home: undefined;
  Friends: undefined;
  Activity: undefined;
  Account: undefined;
};

type TabParamList = keyof TabStackParamList;

export const TabScreens: { [key: string]: TabParamList } = {
  Home: 'Home',
  Friends: 'Friends',
  Activity: 'Activity',
  Account: 'Account',
};

const Tab = createBottomTabNavigator<TabStackParamList>();

// const renderTabs = (props: BottomTabBarProps) => <CustomTabBar {...props} />;

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen
        name={TabScreens.Home}
        component={Home}
        options={{ tabBarLabel: TabScreens.HOME }}
      />

      <Tab.Screen
        name={TabScreens.Friends}
        component={Friends}
        options={{ tabBarLabel: TabScreens.BUY }}
      />

      <Tab.Screen
        name={TabScreens.Activity}
        component={Activity}
        options={{ tabBarLabel: TabScreens.SELL }}
      />

      <Tab.Screen
        name={TabScreens.Account}
        component={Account}
        options={{ tabBarLabel: TabScreens.LOAN }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
