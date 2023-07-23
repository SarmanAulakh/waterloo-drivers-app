import { Text, Input, Button, makeStyles } from "@rneui/themed";
import React, { useState } from "react";
import { firebaseAppAuth } from "../firebaseAuth";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";
import { AntDesign } from "@expo/vector-icons";
import BackButton from "../components/BackButton";
import Background from "../components/Background";

type Props = NativeStackScreenProps<RootStackParamList, "Register">;

export default function RegisterScreen({ navigation }: Props) {
  const styles = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

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
    <Background>
      <BackButton goBack={navigation.goBack} />
      <Text h1 style={styles.h1}>
        Create Account
      </Text>
      <Input
        placeholder="Name"
        value={name}
        onChangeText={setName}
        leftIcon={<AntDesign name="user" size={24} color="black" />}
      />
      <Input
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        leftIcon={<AntDesign name="mail" size={24} color="black" />}
      />
      <Input
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        leftIcon={<AntDesign name="lock" size={24} color="black" />}
      />
      <Button title="Register" onPress={handleSignup} style={styles.button} />
      <Button
        title="Login"
        onPress={() => navigation.navigate("Login")}
        style={styles.button}
        type="clear"
      />
    </Background>
  );
}

const useStyles = makeStyles((theme) => ({
  h1: {
    paddingBottom: 20,
  },
  button: {
    width: 200,
  },
}));
