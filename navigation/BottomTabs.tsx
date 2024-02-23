import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { TabNavigationParamList } from "../types";
import HomeScreen from "../screens/HomeScreen";
import React from "react";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import Colors from "../constants/Colors";
import TicketScreen from "../screens/TicketScreen";
import MapScreen from "../screens/MapScreen";

const Tab = createBottomTabNavigator<TabNavigationParamList>();

export default function BottomTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: true,
        headerStyle: { backgroundColor: Colors.tertiary },
        tabBarActiveTintColor: "blue",
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="home" size={size} color={color} />
          ),
          tabBarStyle: { backgroundColor: Colors.secondary },
        }}
      />
      <Tab.Screen
        name="Ticket"
        component={TicketScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="ticket-outline" size={size} color={color} />
          ),
          tabBarStyle: { backgroundColor: Colors.secondary },
        }}
      />
      <Tab.Screen
        name="Map"
        component={MapScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="map" size={size} color={color} />
          ),
          tabBarStyle: { backgroundColor: Colors.secondary },
        }}
      />
    </Tab.Navigator>
  );
}
