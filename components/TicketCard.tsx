import { Alert, StyleSheet, View, ViewProps } from "react-native";
import { Card, Text } from "@ui-kitten/components";
import { Ticket, Vehicle } from "../types/apiTypes";
import DisputeModal from "./DisputeModal";
import React, { useEffect, useState } from "react";
import Constants from "expo-constants";
import * as Linking from "expo-linking";
import { useGetPaymentSheetParamsQuery } from "../api/backendApi";
import { useStripe } from "@stripe/stripe-react-native";
import { useAppSelector } from "../redux/hooks";
import { RootState } from "../redux/store";
import { Button } from "@rneui/themed";

interface Props {
  ticket: Ticket;
  vehicle?: Vehicle;
  url: string;
  refetchTicket: any;
}

export default function TicketCard({ ticket, vehicle, url, refetchTicket }: Props) {
  const [loading, setLoading] = useState(false);
  const { presentPaymentSheet } = useStripe();
  const [visible, setVisible] = useState(false);
  const { initPaymentSheet } = useStripe();
  const user = useAppSelector((state: RootState) => state.auth.user);
  const { data: paymentIntent, error } = useGetPaymentSheetParamsQuery(
    { firebaseUserId: user!.firebase_id, ticketId: ticket.id },
    { skip: !user || !ticket }
  );

  const initializePaymentSheet = async () => {
    setLoading(true);

    console.log("win!", paymentIntent);

    const { error } = await initPaymentSheet({
      merchantDisplayName: "WaterlooDriversApp, Inc.",
      paymentIntentClientSecret: paymentIntent.client_secret,
      // Set `allowsDelayedPaymentMethods` to true if your business can handle payment
      // methods that complete payment after a delay, like SEPA Debit and Sofort.
      // allowsDelayedPaymentMethods: true,
      defaultBillingDetails: {
        name: "Jane Doe",
      },
      returnURL:
        Constants.appOwnership === "expo"
          ? Linking.createURL("/--/")
          : Linking.createURL(""),
    });
    console.log("error2", error);
    if (!error) {
      // setLoading(true);
    }
    setLoading(false);
  };

  const openPaymentSheet = async () => {
    setLoading(true);
    await initializePaymentSheet();
    const { error } = await presentPaymentSheet();
    setLoading(false);
    if (error) {
      Alert.alert(`Error code: ${error.code}`, error.message);
    } else {
      refetchTicket()
      Alert.alert("Success", "Your payment is confirmed!");
    }
  };

  const Header = (props: ViewProps | undefined): React.ReactElement => (
    <View {...props}>
      <Text category="h6">{ticket.type}</Text>
      <Text category="s1">${ticket.cost}</Text>
    </View>
  );

  const Footer = (props: ViewProps | undefined): React.ReactElement => (
    <View {...props} style={[props?.style, styles.footerContainer]}>
      <Button
        title="DISPUTE"
        style={styles.footerControl}
        type="outline"
        onPress={() => setVisible(true)}
      />
      <Button
        title="PAY"
        style={styles.footerControl}
        onPress={openPaymentSheet}
        disabled={loading}
        loading={loading}
      />
    </View>
  );
  return (
    <>
      <Card style={styles.card} header={Header} footer={Footer}>
        <Text>Ticket ID: {ticket.id}</Text>
        <Text>Due Date: {new Date(ticket.due_date).toLocaleDateString()}</Text>
        <Text>
          Issue Date: {new Date(ticket.issue_date).toLocaleDateString()}
        </Text>
        <Text>
          Vehcile:{" "}
          {vehicle
            ? `${vehicle.make} - ${vehicle.model} - ${vehicle.year}`
            : "_"}{" "}
        </Text>
        <Text>License Plate: {vehicle ? vehicle.licence_plate : "_"}</Text>
        <Text>Full Details: {url}</Text>
      </Card>
      <DisputeModal ticket={ticket} visible={visible} setVisible={setVisible} />
    </>
  );
}

const styles = StyleSheet.create({
  topContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  card: {
    flex: 1,
    margin: 2,
  },
  footerContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  footerControl: {
    marginHorizontal: 2,
    minWidth: 80,
  },
});
