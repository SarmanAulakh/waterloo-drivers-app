import { firebaseAppAuth } from "../firebaseAuth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { Text, Input, Button, makeStyles } from "@rneui/themed";
import { AntDesign } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";
import Background from "../components/Background";
import BackButton from "../components/BackButton";

type Props = NativeStackScreenProps<RootStackParamList, "Login">;

export default function LoginScreen({ navigation }: Props) {
  const styles = useStyles();
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
    <Background>
      <BackButton goBack={navigation.goBack} />
      <Text h1 style={styles.h1}>Welcome back,</Text>
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
      <Button title="Login" onPress={handleLogin} style={styles.button} />
      <Button
        title="Register"
        onPress={() => navigation.navigate("Register")}
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
