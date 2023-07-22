import {  SafeAreaView, StyleSheet, Text, View, TouchableOpacity  } from "react-native";
import React from "react";
import { RootStackParamList } from "../types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

type Props = NativeStackScreenProps<RootStackParamList, "Welcome">;

export default function WelcomeScreen({ navigation }: Props) {
  return (
    <SafeAreaView>
      <View>
        <Text>Welcome Page</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
          <Text>Register</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
