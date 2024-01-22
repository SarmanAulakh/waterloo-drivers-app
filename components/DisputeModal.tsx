import { useState } from "react";
import { StyleSheet, View, ViewProps } from "react-native";
import { Button, Card, Modal, Input, InputProps } from "@ui-kitten/components";
import { Text } from "@rneui/themed";
import { Ticket } from "../types/apiTypes";

interface Props {
  visible: boolean;
  setVisible: (v: boolean) => void;
  ticket: Ticket;
}

const useInputState = (initialValue = ""): InputProps => {
  const [value, setValue] = useState(initialValue);
  return { value, onChangeText: setValue };
};

export default function DisputeModal({ visible, setVisible, ticket }: Props) {
  const multilineInputState = useInputState();

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
        DISPUTE
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
          Dispute Ticket ID: {ticket.id}
        </Text>

        <Input
          multiline={true}
          textStyle={styles.inputTextStyle}
          placeholder="Please explain reason for dispute"
          {...multilineInputState}
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
