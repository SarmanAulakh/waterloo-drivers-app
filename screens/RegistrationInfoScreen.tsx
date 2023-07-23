import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { Text, Input, Button, makeStyles } from "@rneui/themed";
import { RootStackParamList } from "../types";
import { AntDesign } from "@expo/vector-icons";
import BackButton from "../components/BackButton";
import Background from "../components/Background";
import { CommonActions } from "@react-navigation/native";

type Props = NativeStackScreenProps<RootStackParamList, "RegistrationInfo">;

export default function RegistrationInfoScreen({ navigation }: Props) {
  const styles = useStyles();
  const [driverLicense, setDriverLicense] = useState("");
  const [carLicensePlate, setCarLicensePlate] = useState("");
  const [carModel, setCarModel] = useState("");
  const [carYear, setCarYear] = useState("");

  const handleRegistrationInfoSubmit = () => {
    


    // navigate to home and clear nav histroy (can't go back to login/register)
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'Home' }],
      })
    )
  };

  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <Text h1 style={styles.h1}>Register A Vehicle</Text>
      <Input
        placeholder="Drivers License"
        value={driverLicense}
        onChangeText={setDriverLicense}
        keyboardType="email-address"
      />
      <Input
        placeholder="Car License Plate"
        value={carLicensePlate}
        onChangeText={setCarLicensePlate}
      />
      <Input
        placeholder="Car Model"
        value={carModel}
        onChangeText={setCarModel}
      />
      <Input
        placeholder="Car Year"
        value={carYear}
        onChangeText={setCarYear}
        keyboardType="numeric"
      />
      <Button title="Add Vehicle" onPress={handleRegistrationInfoSubmit} style={styles.button} />
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