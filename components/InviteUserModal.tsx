import { useState } from "react";
import { Alert, StyleSheet, View, ViewProps } from "react-native";
import { Card, Modal } from "@ui-kitten/components";
import { Input, Text, Button } from "@rneui/themed";
import { Ticket, User, Vehicle } from "../types/apiTypes";
import { AntDesign } from "@expo/vector-icons";
import { useInviteUserToVehicleMutation } from "../api/backendApi";
import { showAlert } from "./alerts";
import { useAppSelector } from "../redux/hooks";
import { RootState } from "../redux/store";
import React from "react";

interface Props {
  visible: boolean;
  setVisible: (v: boolean) => void;
  vehicle: Vehicle;
}

const useInputState = (initialValue = "") => {
  const [value, setValue] = useState(initialValue);
  return { value, onChangeText: setValue };
};

export default function InviteUserModal({
  visible,
  setVisible,
  vehicle,
}: Props) {
  const user = useAppSelector((state: RootState) => state.auth.user);
  const emailState = useInputState();
  const [inviteUser, { isLoading }] = useInviteUserToVehicleMutation();

  const handleInvite = async () => {
    if (!user || !emailState.value) {
      return showAlert("Error", "invalid email");
    }

    try {
      await inviteUser({
        users_vehicle: {
          email: emailState.value,
          vehicle_id: vehicle.id,
          user_id: user.firebase_id,
        },
      });
      showAlert("Invite Sent", "email sent successfully");
    } catch (e: any) {
      console.log(e);
    } finally {
      setVisible(false);
    }
  };

  const Footer = (props: ViewProps | undefined): React.ReactElement => (
    <View {...props} style={[props?.style, styles.footerContainer]}>
      <Button
        title="CANCEL"
        style={styles.footerControl}
        // size="small"
        // status="basic"
        onPress={() => setVisible(false)}
      />
      <Button
        title="INVITE"
        style={styles.footerControl}
        // size="small"
        onPress={() => handleInvite()}
        loading={isLoading}
      />
    </View>
  );

  return (
    <Modal
      visible={visible}
      backdropStyle={styles.backdrop}
      onBackdropPress={() => setVisible(false)}
    >
      <Card disabled={true} style={styles.card} footer={Footer}>
        <Text h4 style={{ paddingBottom: 20 }}>
          Invite User To Vehicle
        </Text>

        <Text>
          Vehicle: {vehicle.make} - {vehicle.model}
        </Text>
        <Text style={{ paddingBottom: 20 }}>
          License Plate: {vehicle.licence_plate}
        </Text>

        <Input
          placeholder="Email"
          keyboardType="email-address"
          leftIcon={<AntDesign name="mail" size={24} color="black" />}
          autoCapitalize="none"
          {...emailState}
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
});
