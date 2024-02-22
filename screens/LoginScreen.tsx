import { firebaseAppAuth } from "../firebaseAuth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useEffect, useState } from "react";
import { Text, Input, Button, makeStyles } from "@rneui/themed";
import { AntDesign } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";
import { showAlert } from "../components/alerts";
import Background from "../components/Background";
import BackButton from "../components/BackButton";
import { setUser } from "../redux/slices/authSlice";
import { useLazyGetUserQuery } from "../api/backendApi";
import { useAppDispatch } from "../redux/hooks";
import * as LocalAuthentication from 'expo-local-authentication';
import { fetchData, storeData } from "../utils/localStorage";

type Props = NativeStackScreenProps<RootStackParamList, "Login">;

export default function LoginScreen({ navigation }: Props) {
  const styles = useStyles();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const [trigger, { isLoading }] = useLazyGetUserQuery();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [biometricType, setBiometricType] = useState(null);

  const checkBiometricAvailability = async () => {
    const compatible = await LocalAuthentication.hasHardwareAsync();
    const enrolled = await LocalAuthentication.isEnrolledAsync();
    
    if (compatible && enrolled) {
      // Biometric authentication is available and enrolled
      return true;
    } else {
      // Biometric authentication is not available or not enrolled
      return false;
    }
  };

  const authenticateWithBiometrics = async () => {
    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: 'Authenticate with biometrics',
    });
  
    if (result.success) {
      // Biometric authentication successful
      console.log('Biometric authentication successful');
      await setLoginInfo()
    } else {
      // Biometric authentication failed
      console.log('Biometric authentication failed');
    }
  };

  const handleBiometricAuthentication = async () => {
    const em = await fetchData('email')
    const pwd = await fetchData('password')

    if (!em && !pwd) {
      return showAlert('Info', 'must login atleast once to use biometrics')
    }
    const isBiometricAvailable = await checkBiometricAvailability();
    if (isBiometricAvailable) {
      await authenticateWithBiometrics();
    } else {
      console.log('Biometric authentication is not available on this device');
    }
  };
  
  async function setLoginInfo() {
    const em = await fetchData('email')
    const pwd = await fetchData('password')

    setEmail(em || "")
    setPassword(pwd || "")
  }

  const handleLogin = async() => {
    setLoading(true);
    await storeData('email', email)
    await storeData('password', password)
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
      <BackButton goBack={navigation.goBack} />
      <Text h1 style={styles.h1}>
        Welcome back,
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
        onPress={handleLogin}
        style={styles.button}
        loading={loading || isLoading}
      />
      <Button 
        title="Login with Biometrics"
        onPress={() => handleBiometricAuthentication()}
        style={styles.button}
      />
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
