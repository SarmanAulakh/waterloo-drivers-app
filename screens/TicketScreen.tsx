import { View, ScrollView } from "react-native";
import { Text } from "@rneui/themed";
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
import React from "react";


type Props = NativeStackScreenProps<TabNavigationParamList, "Ticket">;

export default function TicketScreen({ navigation }: Props) {
  const user = useAppSelector((state: RootState) => state.auth.user);

  const { data: userTickets, refetch } = useGetUserTicketsQuery(user?.firebase_id || '', {
    skip: !user,
  });
  const { data: userVehicles } = useGetUserVehiclesQuery(user?.firebase_id || '', {
    skip: !user,
  });

  const renderPendingTickets = userTickets
    ?.filter((t) => t.status === "pending")
    .map((ticket) => (
      <TicketCard
        // key={ticket.id}
        ticket={ticket}
        vehicle={userVehicles?.find((v) => v.id === ticket.vehicle_id)}
        url="Mock Url"
        refetchTicket={refetch}
      />
    ));

  const renderHistoryTickets = userTickets
    ?.filter((t) => t.status !== "pending")
    .map((ticket) => (
      <TicketCard
        // key={ticket.id}
        ticket={ticket}
        vehicle={userVehicles?.find((v) => v.id === ticket.vehicle_id)}
        url="Mock Url"
        refetchTicket={refetch}
      />
    ));

  return (
    <ScrollView>
      <View style={{ padding: 20 }}>
        <Text h4>Unpaid Tickets:</Text>
        <View style={{ marginVertical: 10 }}>
          {renderPendingTickets ?? <Text>Empty</Text>}
        </View>
        <Text h4>Past History:</Text>
        <View style={{ marginVertical: 10 }}>
          {renderHistoryTickets ?? <Text>Empty</Text>}
        </View>
        <Text>Empty</Text>
      </View>
    </ScrollView>
  );
}
