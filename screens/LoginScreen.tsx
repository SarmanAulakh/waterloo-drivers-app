import { firebaseAppAuth } from "../firebaseAuth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useEffect, useState } from "react";
import { Text, Input, Button, makeStyles } from "@rneui/themed";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";
import { showAlert } from "../components/alerts";
import Background from "../components/Background";
import BackButton from "../components/BackButton";
import { setUser } from "../redux/slices/authSlice";
import { useLazyGetUserQuery } from "../api/backendApi";
import { useAppDispatch } from "../redux/hooks";
import * as LocalAuthentication from "expo-local-authentication";
import { fetchData, storeData } from "../utils/localStorage";
import React from "react";
import { TouchableOpacity, View, Image } from "react-native";

type Props = NativeStackScreenProps<RootStackParamList, "Login">;

export default function LoginScreen({ navigation }: Props) {
  const styles = useStyles();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const [trigger, { isLoading }] = useLazyGetUserQuery();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const checkBiometricAvailability = async () => {
    const compatible = await LocalAuthentication.hasHardwareAsync();
    const enrolled = await LocalAuthentication.isEnrolledAsync();

    return compatible && enrolled;
  };

  const authenticateWithBiometrics = async () => {
    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: "Authenticate with biometrics",
    });

    if (result.success) {
      await setLoginInfo();
    } else {
      showAlert("Info", "Biometric authentication failed");
    }
  };

  const handleBiometricAuthentication = async () => {
    const em = await fetchData("email");
    const pwd = await fetchData("password");

    if (!em && !pwd) {
      return showAlert("Info", "must login atleast once to use biometrics");
    }
    const isBiometricAvailable = await checkBiometricAvailability();
    if (isBiometricAvailable) {
      await authenticateWithBiometrics();
    } else {
      showAlert(
        "Info",
        "Biometric authentication is not available on this device"
      );
    }
  };

  async function setLoginInfo() {
    const em = await fetchData("email");
    const pwd = await fetchData("password");

    setEmail(em || "");
    setPassword(pwd || "");
  }

  const handleLogin = async () => {
    setLoading(true);
    await storeData("email", email);
    await storeData("password", password);
    signInWithEmailAndPassword(firebaseAppAuth, email, password)
      .then((userCredential) => {
        const { user } = userCredential;
        setLoading(false);

        trigger(user.uid)
          .then((res) => {
            if (res.data) {
              dispatch(
                setUser({
                  user: res.data,
                  credentials: userCredential,
                })
              );
              setEmail("")
              setPassword("")
              navigation.navigate("Main");
            } else {
              showAlert("Error", "User data was empty");
            }
          })
          .catch((e) => showAlert("Error", e));
      })
      .catch((error) => {
        showAlert("Login error:", error.message);
        setLoading(false);
      });
  };

  return (
    <Background>
      <View
        style={{
          borderColor: "black",
          borderWidth: 2,
          height: 200,
          paddingVertical: 50,
        }}
      >
        <Image
          source={require("../assets/images/misc/login_2.png")}
          style={{ flex: 1, resizeMode: "contain", width: 300 }}
        />
      </View>

      <Text
        style={{
          fontSize: 28,
          fontWeight: "500",
          color: "#333",
          marginBottom: 30,
          marginTop: 20,
        }}
      >
        Waterloo Drivers App
      </Text>

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
        title="Login"
        onPress={() => handleLogin()}
        style={styles.button}
        loading={loading || isLoading}
      />

      <Text style={{ textAlign: "center", color: "#666", marginVertical: 10 }}>
        Or, auto-fill login with biometrics
      </Text>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: 30,
        }}
      >
        <TouchableOpacity
          onPress={() => handleBiometricAuthentication()}
          style={{
            borderColor: "#ddd",
            borderWidth: 2,
            borderRadius: 10,
            paddingHorizontal: 30,
            paddingVertical: 10,
          }}
        >
          <MaterialIcons name="fingerprint" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          marginBottom: 30,
        }}
      >
        <Text>New to the app?</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
          <Text style={{ color: "#AD40AF", fontWeight: "700" }}> Register</Text>
        </TouchableOpacity>
      </View>
    </Background>
  );
}

const useStyles = makeStyles((theme) => ({
  h1: {
    paddingBottom: 20,
  },
  button: {
    width: 200,
    fontWeight: "bold",
    marginVertical: 20,
  },
}));
