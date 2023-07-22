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
  Welcome: undefined;
  Login: undefined;
  Register: undefined;
  RegistrationInfo: undefined;
  Home: undefined;
};

export type TabNavigationParamList = {
  // Welcome: {
  //   name: string,
  //   birthYear: string
  // };
  Login: undefined;
  Register: undefined;
  Home: undefined;
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
