import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { persistor } from "../redux/store";
import Colors from "../constants/Colors";
import { RootStackParamList } from "../types";
import RegisterScreen from "../screens/RegisterScreen";
import BottomTabs from "./BottomTabs";
import { PersistGate } from "redux-persist/integration/react";
import { ActivityIndicator, View, StyleSheet } from "react-native";
import RegistrationInfoScreen from "../screens/RegistrationInfoScreen";
import WelcomeScreen from "../screens/WelcomeScreen";
import LoginScreen from "../screens/LoginScreen";

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: Colors.background,
  },
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export type StackNavigationArray = Array<
  React.ComponentProps<typeof Stack.Screen>
>;

export default function Navigation() {
  return (
    <NavigationContainer theme={theme}>
      <PersistGate
        loading={
          // eslint-disable-next-line react/jsx-wrap-multilines
          <View style={styles.container}>
            <ActivityIndicator color="red" />
          </View>
        }
        persistor={persistor}
      >
        <Stack.Navigator
          initialRouteName="Welcome"
          screenOptions={{
            headerShown: true,
          }}
        >
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen
            name="RegistrationInfo"
            component={RegistrationInfoScreen}
          />
          <Stack.Screen name="Home" component={BottomTabs} />
        </Stack.Navigator>
      </PersistGate>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
});