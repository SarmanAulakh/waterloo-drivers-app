import React, { useState } from "react";
import { StyleSheet, View, ViewProps } from "react-native";
import { Card, Divider, Modal } from "@ui-kitten/components";
import { Input, Text, Button } from "@rneui/themed";
import { useCreateUserVehicleConnectionMutation } from "../api/backendApi";
import { showAlert } from "./alerts";
import { useAppSelector } from "../redux/hooks";
import { RootState } from "../redux/store";

interface Props {
  visible: boolean;
  setVisible: (v: boolean) => void;
  navigation: any;
}

export default function AddCarModal({
  visible,
  setVisible,
  navigation,
}: Props) {
  const user = useAppSelector((state: RootState) => state.auth.user);
  const [inviteCode, setInviteCode] = useState("");
  const [carLicensePlate, setCarLicensePlate] = useState("");
  const [joinVehicle, { isLoading }] = useCreateUserVehicleConnectionMutation();

  const handleJoin = async () => {
    if (!user || !inviteCode || !carLicensePlate) {
      return showAlert("Error", "invalid data");
    }

    try {
      await joinVehicle({
        users_vehicle: {
          code: inviteCode,
          licence_plate: carLicensePlate,
          user_id: user.firebase_id,
        },
      })
      showAlert("Info", "Vechile was joined successfully");
    } catch (e: any) {
      console.log(e);
    } finally {
      setVisible(false);
    }
  };

  return (
    <Modal
      visible={visible}
      backdropStyle={styles.backdrop}
      onBackdropPress={() => setVisible(false)}
    >
      <Card disabled={true} style={styles.card}>
        <Text h4 style={{ paddingBottom: 20 }}>
          Join an Existing Vehicle
        </Text>

        <Input
          placeholder="Invite Code"
          value={inviteCode}
          onChangeText={setInviteCode}
        />

        <Input
          placeholder="License Plate"
          value={carLicensePlate}
          onChangeText={setCarLicensePlate}
        />

        <Button
          title="Join Vehicle"
          style={styles.footerControl}
          // size="small"
          onPress={handleJoin}
          loading={isLoading}
        />

        <View style={styles.divider}>
          <Divider />
          <Text h4>or</Text>
          <Divider />
        </View>

        <Button
          title="Add New Vehicle"
          style={styles.footerControl}
          // size="small"
          onPress={() => {
            navigation.navigate("AddVehicle");
            setVisible(false);
          }}
        />
      </Card>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  topContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  card: {
    width: 350,
    flex: 1,
    margin: 2,
  },
  footerContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  footerControl: {
    marginHorizontal: 2,
  },
  input: {
    marginVertical: 2,
  },
  inputTextStyle: {
    minHeight: 64,
  },
  divider: {
    display: "flex",
    gap: 2,
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
});
