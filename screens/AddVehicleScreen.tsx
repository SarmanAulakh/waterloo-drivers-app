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
import { useCreateUserVehicleMutation } from "../api/backendApi";
import { CreateUserVehicle } from "../types/apiTypes";
import { showAlert } from "../components/alerts";
import { useGetAllCarModelsQuery } from "../api/carModelApi";
import { Dropdown } from "react-native-element-dropdown";
import { CarModel } from "../types/externalApiTypes";
import { View } from "react-native";

type Props = NativeStackScreenProps<RootStackParamList, "AddVehicle">;

export default function AddVehicleScreen({ route, navigation }: Props) {
  const styles = useStyles();
  const [createUserVehicle, { isLoading }] = useCreateUserVehicleMutation();
  const { data, isLoading: loadingCarData } = useGetAllCarModelsQuery({
    limit: 100000,
    skip: 0,
  });
  const user = useAppSelector((state: RootState) => state.auth.user);
  const [selectedProvince, setSelectedProvince] = useState("");
  const [carLicensePlate, setCarLicensePlate] = useState("");
  const [carModel, setCarModel] = useState("");
  const [carMake, setCarMake] = useState("");
  const [carYear, setCarYear] = useState("");

  const handleRegistrationInfoSubmit = () => {
    if (!user) {
      return showAlert('Error', 'user not found')
    }
    createUserVehicle({
      firebaseUserId: user.firebase_id,
      data: {
        vehicle: {
          licence_plate: carLicensePlate,
          province: selectedProvince,
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
        placeholder="Car License Plate"
        value={carLicensePlate}
        onChangeText={setCarLicensePlate}
      />
      <View style={{ paddingHorizontal: 6, width: "100%" }}>
        <Dropdown
          labelField="label"
          valueField="value"
          placeholder="Select Province"
          value={selectedProvince}
          onChange={(item) => setSelectedProvince(item.value)}
          data={[
            { label: "Ontario", value: "ontario" },
            { label: "Quebec", value: "quebec" },
          ]}
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
        />
        <Dropdown
          labelField="label"
          valueField="value"
          search
          placeholder="Car Make"
          searchPlaceholder="Search Car Make..."
          value={carMake}
          onChange={(item) => setCarMake(item.value)}
          data={Array.from(new Set(data?.results?.map((c) => c.Make)))
            .sort()
            .map((make) => ({
              label: make,
              value: make,
            }))}
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
        />
        <Dropdown
          labelField="label"
          valueField="value"
          search
          placeholder="Car Model"
          searchPlaceholder="Search Car Model..."
          value={carModel}
          onChange={(item) => setCarModel(item.value)}
          data={Array.from(
            new Set(
              data?.results
                ?.filter((c) => c.Make === carMake)
                .map((c) => c.Model)
            )
          )
            .sort()
            .map((model) => ({
              label: model,
              value: model,
            }))}
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
        />
        <Dropdown
          labelField="label"
          valueField="value"
          search
          placeholder="Car Year"
          searchPlaceholder="Search Car Year..."
          value={carYear}
          onChange={(item) => setCarYear(item.value)}
          data={Array.from(
            new Set(
              data?.results
                ?.filter((c) => c.Make === carMake && c.Model === carModel)
                .map((c) => c.Year)
            )
          )
            .sort()
            .map((year) => ({
              label: year,
              value: String(year),
            }))}
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
        />
        <Button
          title="Add Vehicle"
          onPress={handleRegistrationInfoSubmit}
          style={styles.button}
          loading={isLoading}
        />
      </View>
    </Background>
  );
}

const useStyles = makeStyles((theme) => ({
  container: {
    minHeight: 128,
    width: "100%",
  },
  h1: {
    paddingBottom: 40,
  },
  h4: {
    marginTop: 10,
    fontSize: 24,
    textAlign: "left",
    width: "100%",
  },
  button: {
    width: 200,
    marginTop: 24,
    alignSelf: "center",
    fontWeight: "bold",
  },
  dropdown: {
    marginVertical: 16,
    paddingHorizontal: 10,
    height: 50,
    width: "100%",
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 8,
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
}));
