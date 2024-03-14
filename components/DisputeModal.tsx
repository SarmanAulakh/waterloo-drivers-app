import React, { useEffect, useState } from "react";
import * as Linking from "expo-linking";
import { Alert, StyleSheet, View, ViewProps } from "react-native";
import { Button, Card, Modal, Input, InputProps } from "@ui-kitten/components";
import { Text } from "@rneui/themed";
import { Ticket } from "../types/apiTypes";
import { useStripe } from "@stripe/stripe-react-native";
import {
  useDisputeTicketMutation,
  useGetPaymentSheetParamsQuery,
} from "../api/backendApi";
import Constants from "expo-constants";
import { useAppSelector } from "../redux/hooks";
import { RootState } from "../redux/store";
import { showAlert } from "./alerts";

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
  const [loading, setLoading] = useState(false);
  const user = useAppSelector((state: RootState) => state.auth.user);
  const multilineInputState = useInputState();
  const [disputeTicket, { isLoading }] = useDisputeTicketMutation();

  const handleSubmitDispute = async () => {
    try {
      await disputeTicket({
        firebaseUserId: user?.firebase_id || "",
        ticketId: ticket.id,
        reason: multilineInputState.value || ""
      });

      setVisible(false)
      showAlert('info', 'dispute successfully sent. reply may take a few days')
    } catch (error) {
      showAlert('error', 'dispute could not send. try again later')
    }

  };

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
        onPress={handleSubmitDispute}
        disabled={isLoading}
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
          Dispute Ticket #: {ticket.ticket_number}
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
