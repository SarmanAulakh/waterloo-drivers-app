import { AntDesign } from "@expo/vector-icons";
import React, { useState } from "react";
import { StyleSheet, View, ViewProps } from "react-native";
import { Button, Card, Divider, Modal } from "@ui-kitten/components";
import { Input, Text } from "@rneui/themed";

interface Props {
  visible: boolean;
  setVisible: (v: boolean) => void;
  navigation: any;
}

export default function AddCarModal({ visible, setVisible, navigation }: Props) {
  const [inviteCode, setInviteCode] = useState("");
  const [carLicensePlate, setCarLicensePlate] = useState("");

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

        <View style={styles.divider}>
          <Divider />
          <Text h4>or</Text>
          <Divider />
        </View>

        <Button
          style={styles.footerControl}
          size="small"
          onPress={() => {
            navigation.navigate("AddVehicle")
            setVisible(false)}
          }
        >
          Add New Vehicle
        </Button>
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
