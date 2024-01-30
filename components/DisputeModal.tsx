import { useEffect, useState } from "react";
import * as Linking from 'expo-linking';
import { Alert, StyleSheet, View, ViewProps } from "react-native";
import { Button, Card, Modal, Input, InputProps } from "@ui-kitten/components";
import { Text } from "@rneui/themed";
import { Ticket } from "../types/apiTypes";
import { useStripe } from "@stripe/stripe-react-native";
import { useGetPaymentSheetParamsQuery } from "../api/backendApi";
import Constants from "expo-constants";

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
  const multilineInputState = useInputState();
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const { data: params } = useGetPaymentSheetParamsQuery(null);

  const initializePaymentSheet = async () => {
    const paymentIntent = params?.paymentIntent;
    const ephemeralKey = params?.ephemeralKey;
    const customer = params?.ephemeralKey;

    const { error } = await initPaymentSheet({
      merchantDisplayName: "WaterlooDriversApp, Inc.",
      customerId: customer,
      customerEphemeralKeySecret: ephemeralKey,
      paymentIntentClientSecret: paymentIntent,
      // Set `allowsDelayedPaymentMethods` to true if your business can handle payment
      // methods that complete payment after a delay, like SEPA Debit and Sofort.
      allowsDelayedPaymentMethods: true,
      defaultBillingDetails: {
        name: "Jane Doe",
      },
      returnURL:
        Constants.appOwnership === "expo"
          ? Linking.createURL("/--/")
          : Linking.createURL(""),
    });
    if (!error) {
      setLoading(true);
    }
  };

  useEffect(() => {
    initializePaymentSheet();
  }, []);

  const openPaymentSheet = async () => {
    const { error } = await presentPaymentSheet();

    if (error) {
      Alert.alert(`Error code: ${error.code}`, error.message);
    } else {
      Alert.alert("Success", "Your order is confirmed!");
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
        onPress={openPaymentSheet}
        disabled={!loading}
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
