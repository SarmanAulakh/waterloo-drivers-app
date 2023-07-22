import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { firebaseAppAuth } from "../firebaseAuth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";

type Props = NativeStackScreenProps<RootStackParamList, "Login">;

export default function LoginScreen({ navigation }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    signInWithEmailAndPassword(firebaseAppAuth, email, password)
      .then((userCredential) => {
        navigation.navigate("Home");
      })
      .catch((error) => {
        console.log("Login error:", error.message);
      });
  };

  return (
    <SafeAreaView>
      <View>
        <Text>Login Page</Text>
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
        <TouchableOpacity onPress={handleLogin}>
          <Text>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text>Register</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
