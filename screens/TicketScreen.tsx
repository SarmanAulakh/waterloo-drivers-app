import { View, ScrollView, StyleSheet } from "react-native";
import { ListItem, Text } from "@rneui/themed";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { TabNavigationParamList } from "../types";
import TicketCard from "../components/TicketCard";
import {
  useGetPaymentSheetParamsQuery,
  useGetUserTicketsQuery,
  useGetUserVehiclesQuery,
} from "../api/backendApi";
import { useAppSelector } from "../redux/hooks";
import { RootState } from "../redux/store";
import React, { useState } from "react";

type Props = NativeStackScreenProps<TabNavigationParamList, "Ticket">;

export default function TicketScreen({ navigation }: Props) {
  const user = useAppSelector((state: RootState) => state.auth.user);
  const [expandUnpaid, setexpandUnpaid] = useState(true);
  const [expandOld, setexpandOld] = useState(false);

  const { data: userTickets, refetch } = useGetUserTicketsQuery(
    user?.firebase_id || "",
    {
      skip: !user,
    }
  );
  const { data: userVehicles } = useGetUserVehiclesQuery(
    user?.firebase_id || "",
    {
      skip: !user,
    }
  );

  const renderPendingTickets = userTickets
    ?.filter((t) => !["paid", "cancelled"].includes(t.status))
    .map((ticket) => (
      <TicketCard
        // key={ticket.id}
        ticket={ticket}
        vehicle={userVehicles?.find((v) => v.id === ticket.vehicle_id)}
        url="Mock Url"
        refetchTicket={refetch}
        completed={false}
      />
    ));

  const renderHistoryTickets = userTickets
    ?.filter((t) => ["paid", "cancelled"].includes(t.status))
    .map((ticket) => (
      <TicketCard
        // key={ticket.id}
        ticket={ticket}
        vehicle={userVehicles?.find((v) => v.id === ticket.vehicle_id)}
        url="Mock Url"
        refetchTicket={refetch}
        completed
      />
    ));

  return (
    <ScrollView>
      <View style={{ paddingVertical: 20 }}>
        <ListItem.Accordion
          content={
            <>
              <ListItem.Content>
                <ListItem.Title>Past History</ListItem.Title>
              </ListItem.Content>
            </>
          }
          isExpanded={expandOld}
          onPress={() => {
            setexpandOld(!expandOld);
          }}
          style={styles.container}
        >
          <View style={{ marginVertical: 10 }}>
            {renderHistoryTickets ?? <Text>Empty</Text>}
          </View>
        </ListItem.Accordion>
        <ListItem.Accordion
          content={
            <>
              <ListItem.Content>
                <ListItem.Title>Unpaid Tickets</ListItem.Title>
              </ListItem.Content>
            </>
          }
          isExpanded={expandUnpaid}
          onPress={() => {
            setexpandUnpaid(!expandUnpaid);
          }}
          style={styles.container}
        >
          <View style={{ marginVertical: 10 }}>
            {renderPendingTickets ?? <Text>Empty</Text>}
          </View>
        </ListItem.Accordion>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f0f0f0",
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
  },
});
