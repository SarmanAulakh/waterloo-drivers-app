import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import WelcomeScreen from '../screens/WelcomeScreen';
import LoginScreen from '../screens/LoginScreen';
import { TabNavigationParamList } from '../types';

const Tab = createBottomTabNavigator<TabNavigationParamList>();

// tabBarOptions={{style: {height: Platform.OS === 'ios' ? 90 : 50}}}

export default function BottomTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Welcome" component={WelcomeScreen} />
      <Tab.Screen name="Login" component={LoginScreen} />
    </Tab.Navigator>
  );
};
