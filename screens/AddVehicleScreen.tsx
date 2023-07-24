import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { Text, Input, Button, makeStyles } from "@rneui/themed";
import { IndexPath, Layout, Select, SelectItem } from "@ui-kitten/components";
import { RootStackParamList } from "../types";
import BackButton from "../components/BackButton";
import Background from "../components/Background";
import { CommonActions } from "@react-navigation/native";
import { useAppSelector } from "../redux/hooks";
import { RootState } from "../redux/store";
import { useCreateUserVehicleMutation } from "../api";
import { CreateUserVehicle } from "../types/apiTypes";
import { showAlert } from "../components/alerts";

type Props = NativeStackScreenProps<RootStackParamList, "AddVehicle">;

export default function AddVehicleScreen({ route, navigation }: Props) {
  const styles = useStyles();
  const [createUserVehicle, { isLoading }] = useCreateUserVehicleMutation();
  const user = useAppSelector((state: RootState) => state.auth.user);
  const [selectedProvinceIndex, setSelectedProvinceIndex] =
    useState<IndexPath>();
  const [driverLicense, setDriverLicense] = useState("");
  const [carLicensePlate, setCarLicensePlate] = useState("");
  const [carModel, setCarModel] = useState("");
  const [carMake, setCarMake] = useState("");
  const [carYear, setCarYear] = useState("");

  const handleRegistrationInfoSubmit = () => {
    createUserVehicle({
      firebaseUserId: user?.firebase_id || "",
      data: {
        vehicle: {
          licence_plate: carLicensePlate,
          province: selectedProvinceIndex
            ? provinces[selectedProvinceIndex.row]
            : "",
          make: carMake,
          model: carModel,
          year: carYear,
        },
      },
    })
      .unwrap()
      .then((res) => {
        navigation.navigate("Main");
      })
      .catch((e) => showAlert("Error", e));
  };

  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <Text h1 style={styles.h1}>
        Register A Vehicle
      </Text>
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
      <Input placeholder="Car Make" value={carMake} onChangeText={setCarMake} />
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
      <Layout style={styles.container} level="1">
        <Select
          value={
            selectedProvinceIndex ? provinces[selectedProvinceIndex.row] : ""
          }
          selectedIndex={selectedProvinceIndex}
          onSelect={(index: any) => setSelectedProvinceIndex(index)}
          placeholder="Select Province"
          label="Province"
          size="large"
        >
          {provinces.map((p) => (
            <SelectItem key={p} title={p} />
          ))}
        </Select>
      </Layout>
      <Button
        title="Add Vehicle"
        onPress={handleRegistrationInfoSubmit}
        style={styles.button}
      />
    </Background>
  );
}

// case sensitive on BE
const provinces = [
  "ontario",
  "quebec",
  // "Alberta",
  // "British Columbia",
  // "Manitoba",
  // "New Brunswick",
  // "Newfoundland and Labrador",
  // "Nova Scotia",
  // "Ontario",
  // "Prince Edward Island",
  // "Quebec",
  // "Saskatchewan",
];

const useStyles = makeStyles((theme) => ({
  container: {
    minHeight: 128,
    width: "100%",
  },
  h1: {
    paddingBottom: 20,
  },
  button: {
    width: 200,
  },
}));
