import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import WelcomeScreen from '../screens/WelcomeScreen';
import LoginScreen from '../screens/LoginScreen';
import { TabNavigationParamList } from '../types';
import HomeScreen from '../screens/HomeScreen';

const Tab = createBottomTabNavigator<TabNavigationParamList>();

// tabBarOptions={{style: {height: Platform.OS === 'ios' ? 90 : 50}}}

export default function BottomTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
    </Tab.Navigator>
  );
};
