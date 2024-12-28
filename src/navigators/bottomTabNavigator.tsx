import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../app/(tabs)/home';
import Friends from '../app/(tabs)/friends';
import Activity from '../app/(tabs)/activity';
import Account from '../app/(tabs)/account';
import { resize } from '../utils/deviceDimentions';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '../components/themes/hooks';
import { COLORS } from '../providers/theme.style';

export type TabStackParamList = {
  Home: undefined;
  Friends: undefined;
  Activity: undefined;
  Account: undefined;
};

type TabParamList = keyof TabStackParamList;

export const TabScreens: { [K in TabParamList]: K } = {
  Home: 'Home',
  Friends: 'Friends',
  Activity: 'Activity',
  Account: 'Account',
};

const Tab = createBottomTabNavigator<TabStackParamList>();

const hideTabBarRoutes = [
  '/groups/createGroup',
  '/addExpense',
  '/contacts/contactList',
  '/contacts/selectedContactList',
];

// const renderTabs = (props: BottomTabBarProps) => <CustomTabBar {...props} />;

const BottomTabNavigator = () => {
  const pathName = '';
  const theme = useTheme();
  return (
    <Tab.Navigator
      backBehavior="history"
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: resize(60),
          display: hideTabBarRoutes.includes(pathName) ? 'none' : 'flex',
          backgroundColor: theme.colors.primaryColor,
        },
        tabBarActiveTintColor: COLORS.primary,
      }}
    >
      <Tab.Screen
        name={TabScreens.Home}
        component={Home}
        options={{
          tabBarLabel: TabScreens.Home,
          tabBarIcon: ({ size, color }) => <MaterialIcons name="home" size={32} color={color} />,
        }}
      />

      <Tab.Screen
        name={TabScreens.Friends}
        component={Friends}
        options={{
          tabBarLabel: TabScreens.Friends,
          tabBarIcon: ({ size, color }) => <MaterialIcons name="people" size={32} color={color} />,
        }}
      />

      <Tab.Screen
        name={TabScreens.Activity}
        component={Activity}
        options={{
          tabBarLabel: TabScreens.Activity,
          tabBarIcon: ({ size, color }) => (
            <MaterialIcons name="auto-graph" size={32} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name={TabScreens.Account}
        component={Account}
        options={{
          tabBarLabel: TabScreens.Account,
          tabBarIcon: ({ size, color }) => <MaterialIcons name="person" size={32} color={color} />,
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
