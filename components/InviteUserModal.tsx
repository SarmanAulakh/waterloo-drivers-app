import { useState } from "react";
import { StyleSheet, View, ViewProps } from "react-native";
import { Button, Card, Modal } from "@ui-kitten/components";
import { Input, Text } from "@rneui/themed";
import { Ticket, Vehicle } from "../types/apiTypes";
import { AntDesign } from "@expo/vector-icons";

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
  const emailState = useInputState();

  const Footer = (props: ViewProps | undefined): React.ReactElement => (
    <View {...props} style={[props?.style, styles.footerContainer]}>
      <Button
        style={styles.footerControl}
        size="small"
        status="basic"
        onPress={() => setVisible(false)}
      >
        CANCEL
      </Button>
      <Button
        style={styles.footerControl}
        size="small"
        onPress={() => setVisible(false)}
      >
        INVITE
      </Button>
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
