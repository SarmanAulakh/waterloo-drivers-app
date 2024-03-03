import {
  Alert,
  StyleSheet,
  Touchable,
  TouchableOpacity,
  View,
  ViewProps,
} from "react-native";
import { Card, Text, styled } from "@ui-kitten/components";
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
  completed: boolean;
}

export default function TicketCard({
  ticket,
  vehicle,
  url,
  refetchTicket,
  completed = false,
}: Props) {
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

    if (Constants.appOwnership === "expo") {
      const { error } = await initPaymentSheet({
        merchantDisplayName: "WaterlooDriversApp, Inc.",
        paymentIntentClientSecret: paymentIntent.client_secret,
        defaultBillingDetails: {
          name: "Jane Doe",
        },
        returnURL:
          Constants.appOwnership === "expo"
            ? Linking.createURL("/--/")
            : Linking.createURL(""),
      });
      console.log("error2", error);
    } else {
      const { error } = await initPaymentSheet({
        merchantDisplayName: "WaterlooDriversApp, Inc.",
        paymentIntentClientSecret: paymentIntent.client_secret,
        defaultBillingDetails: {
          name: "Jane Doe",
        },
      });
      console.log("error2", error);
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
      refetchTicket();
      Alert.alert("Success", "Your payment is confirmed!");
    }
  };

  const Header = (props: ViewProps | undefined): React.ReactElement => (
    <View
      {...props}
      style={{
        flexDirection: "row",
        alignItems: "center",
        padding: 20,
      }}
    >
      <Text category="h6" style={styles.penalty_type}>
        {capitalizeFirstLetter(ticket.penalty_type)} -{" "}
      </Text>
      <Text category="s1" style={completed ? styles.paid : styles.price}>
        ${ticket.cost}
      </Text>
    </View>
  );

  const Footer = (props: ViewProps | undefined): React.ReactElement => {
    if (completed || ticket?.status === "in_dispute") return <></>;
    return (
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
  };
  return (
    <>
      <Card style={styles.card} header={Header} footer={Footer}>
        <View
          style={{
            flexDirection: "row",
            marginBottom: 10,
            alignItems: "center",
          }}
        >
          <Text style={styles.title}>Ticket #: </Text>
          <Text>{ticket.ticket_number}</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            marginBottom: 10,
            alignItems: "center",
          }}
        >
          <Text style={styles.title}>Due Date: </Text>
          <Text>{new Date(ticket.due_date).toLocaleDateString()}</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            marginBottom: 10,
            alignItems: "center",
          }}
        >
          <Text style={styles.title}>Issue Date: </Text>
          <Text>{new Date(ticket.issue_date).toLocaleDateString()}</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            marginBottom: 10,
            alignItems: "center",
          }}
        >
          <Text style={styles.title}>Vehcile: </Text>
          <Text>
            {vehicle
              ? `${vehicle.make} - ${vehicle.model} - ${vehicle.year}`
              : "_"}{" "}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            marginBottom: 10,
            alignItems: "center",
          }}
        >
          <Text style={styles.title}>License Plate: </Text>
          <Text>{vehicle ? vehicle.licence_plate : "_"}</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            marginBottom: 10,
            alignItems: "center",
          }}
        >
          <Text style={styles.title}>Status: </Text>
          <Text>{ticket ? ticket.status : "_"}</Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            marginBottom: 10,
          }}
        >
          <Text style={styles.title}>Full Details: </Text>
          <TouchableOpacity
            onPress={() =>
              Linking.openURL(
                "https://www.paytickets.ca/paytickets/services/static/image/0001.jpg"
              )
            }
          >
            <Text
              style={{
                textDecorationLine: "underline",
                color: "blue",
              }}
            >
              Link
            </Text>
          </TouchableOpacity>
        </View>
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
  title: {
    fontWeight: "bold",
    fontSize: 16,
  },
  price: {
    fontWeight: "bold",
    fontSize: 20,
    color: "red",
  },
  paid: {
    fontSize: 18,
    color: "green",
  },
  penalty_type: {
    fontWeight: "bold",
    fontSize: 20,
  },
});

export const capitalizeFirstLetter = (s: string) => {
  return s.charAt(0).toUpperCase() + s.slice(1);
};
