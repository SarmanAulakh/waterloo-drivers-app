import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { firebaseAppAuth } from "../firebaseAuth";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";

type Props = NativeStackScreenProps<RootStackParamList, "Register">;

export default function RegisterScreen({ navigation }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = () => {
    createUserWithEmailAndPassword(firebaseAppAuth, email, password)
      .then((userCredential) => {
        navigation.navigate("RegistrationInfo");
      })
      .catch((error) => {
        console.log("Signup error:", error.message);
      });
  };

  return (
    <SafeAreaView>
      <View>
        <Text>Signup Page</Text>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TouchableOpacity onPress={handleSignup}>
          <Text>Register</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text>Login</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
