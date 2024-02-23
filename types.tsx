/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { NativeStackScreenProps } from "@react-navigation/native-stack";

// declare global {
//   namespace ReactNavigation {
//     interface RootParamList extends RootStackParamList {}
//   }
// }

export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Main: undefined;
  AddVehicle: undefined; // NOTE: you cannot pass unserializable data as params such as a function
  // Home: undefined; // only here so login and register can navigate to it
};

export type TabNavigationParamList = {
  Home: undefined;
  Ticket: undefined;
};

// For a scenario where our Settings Screen requires the userID as a parameter, our param list would be like this:

// export type RootStackParamList = {
//   Home: undefined;
//   Profile: undefined;
//   Settings: {
//     userId: number;
//   };
// };
// navigation.navigate('Settings', { userId: 4})

// export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
//   NativeStackScreenProps<RootStackParamList, Screen>;
