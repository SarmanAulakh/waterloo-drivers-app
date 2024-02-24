import { StyleSheet, View, ViewProps } from "react-native";
import { Button, Card, Text } from "@ui-kitten/components";
import { Ticket, Vehicle } from "../types/apiTypes";
import DisputeModal from "./DisputeModal";
import React, { useState } from "react";

interface Props {
  ticket: Ticket;
  vehicle?: Vehicle;
  url: string;
}

export default function TicketCard({ ticket, vehicle, url }: Props) {
  const [visible, setVisible] = useState(false);
  const Header = (props: ViewProps | undefined): React.ReactElement => (
    <View {...props}>
      <Text category="h6">{ticket.type}</Text>
      <Text category="s1">${ticket.cost}</Text>
    </View>
  );

  const Footer = (props: ViewProps | undefined): React.ReactElement => (
    <View {...props} style={[props?.style, styles.footerContainer]}>
      <Button
        style={styles.footerControl}
        size="small"
        status="basic"
        onPress={() => setVisible(true)}
      >
        DISPUTE
      </Button>
      <Button style={styles.footerControl} size="small">
        PAY
      </Button>
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
  },
});
