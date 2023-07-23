import { View } from "react-native";
import React from "react";
import { RootStackParamList } from "../types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { makeStyles, Text, Button } from "@rneui/themed";
import Background from "../components/Background";

type Props = NativeStackScreenProps<RootStackParamList, "Welcome">;

export default function WelcomeScreen({ navigation }: Props) {
  const styles = useStyles();
  return (
    <Background>
      <View style={styles.container}>
        <Text h3>Waterloo Drivers App</Text>
        <Button
          title="Login"
          onPress={() => navigation.navigate("Login")}
          style={styles.button}
        />
        <Button
          title="Register"
          onPress={() => navigation.navigate("Register")}
          style={styles.button}
          type="outline"
        />
      </View>
    </Background>
  );
}

const useStyles = makeStyles((theme) => ({
  container: {
    height: 200,
    justifyContent: "space-between",
    alignItems: "center",
    alignSelf: "center",
    padding: 20,
  },
  button: {
    width: 200,
  },
}));
