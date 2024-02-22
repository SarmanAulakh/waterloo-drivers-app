import { Text, Input, Button, makeStyles } from "@rneui/themed";
import React, { useState } from "react";
import { firebaseAppAuth } from "../firebaseAuth";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";
import { AntDesign } from "@expo/vector-icons";
import BackButton from "../components/BackButton";
import Background from "../components/Background";
import { useCreateUserMutation } from "../api/backendApi";
import { setUser } from "../redux/slices/authSlice";
import { showAlert } from "../components/alerts";
import { CreateUser } from "../types/apiTypes";
import { useAppDispatch } from "../redux/hooks";

type Props = NativeStackScreenProps<RootStackParamList, "Register">;

export default function RegisterScreen({ navigation }: Props) {
  const styles = useStyles();
  const dispatch = useAppDispatch();
  const [createUser, { isLoading }] = useCreateUserMutation();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [license, setLicense] = useState("");

  const handleSignup = () => {
    setLoading(true);
    createUserWithEmailAndPassword(firebaseAppAuth, email, password)
      .then((userCredential) => {
        setLoading(false);
        const { user } = userCredential;
        const body: CreateUser = {
          user: {
            firebase_id: user.uid,
            name,
            email,
            drivers_licence_number: license,
          },
        };

        console.log(body)

        createUser(body)
          .unwrap()
          .then((userRes) => {
            dispatch(
              setUser({
                user: userRes,
                credentials: userCredential,
              })
            );
            navigation.navigate("Main");
          })
          .catch((e) => showAlert("Error", e));
      })
      .catch((error) => {
        showAlert("Signup error:", error.message);
        setLoading(false);
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
        autoCapitalize="none"
      />
      <Input
        placeholder="Drivers License Number"
        value={license}
        onChangeText={setLicense}
        leftIcon={<AntDesign name="car" size={24} color="black" />}
        autoCapitalize="none"
      />
      <Input
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        leftIcon={<AntDesign name="mail" size={24} color="black" />}
        autoCapitalize="none"
      />
      <Input
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        leftIcon={<AntDesign name="lock" size={24} color="black" />}
        autoCapitalize="none"
      />
      <Button
        title="Register"
        onPress={handleSignup}
        style={styles.button}
        loading={loading || isLoading}
      />
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
