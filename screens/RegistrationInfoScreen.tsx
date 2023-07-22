import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import { RootStackParamList } from "../types";

type Props = NativeStackScreenProps<RootStackParamList, "RegistrationInfo">;

export default function RegistrationInfoScreen({ navigation }: Props) {
  const [driverLicense, setDriverLicense] = useState("");
  const [carInsurance, setCarInsurance] = useState("");

  const handleRegistrationInfoSubmit = () => {
    console.log("Driver License:", driverLicense);
    console.log("Car Insurance:", carInsurance);

    navigation.navigate("Home");
  };

  return (
    <View>
      <Text>Driver License Information</Text>
      <TextInput
        placeholder="Enter Driver License Number"
        value={driverLicense}
        onChangeText={setDriverLicense}
      />

      <Text>Car Insurance Information</Text>
      <TextInput
        placeholder="Enter Car Insurance Details"
        value={carInsurance}
        onChangeText={setCarInsurance}
      />

      <TouchableOpacity onPress={handleRegistrationInfoSubmit}>
        <Text>Complete Registration</Text>
      </TouchableOpacity>
    </View>
  );
}
