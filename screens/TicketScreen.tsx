import {
  SafeAreaView,
  View,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  FlatList,
  ListRenderItem,
  ScrollView,
} from "react-native";
import {
  Text,
  Button,
  Icon,
  Image,
  ListItem,
  Theme,
  makeStyles,
  withTheme,
} from "@rneui/themed";
import { firebaseAppAuth } from "../firebaseAuth";
import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList, TabNavigationParamList } from "../types";
import { Ticket, Vehicle } from "../types/apiTypes";
import { AntDesign } from "@expo/vector-icons";
import Colors from "../constants/Colors";
import TicketCard from "../components/TicketCard";
import {
  useGetUserTicketsQuery,
  useGetUserVehiclesQuery,
} from "../api/backendApi";
import { useAppSelector } from "../redux/hooks";
import { RootState } from "../redux/store";
import Background from "../components/Background";

type Props = NativeStackScreenProps<TabNavigationParamList, "Ticket">;

export default function TicketScreen({ navigation }: Props) {
  const user = useAppSelector((state: RootState) => state.auth.user);

  const { data: userTickets } = useGetUserTicketsQuery(user!.firebase_id, {
    skip: !user!,
  });
  const { data: userVehicles } = useGetUserVehiclesQuery(user!.firebase_id, {
    skip: !user!,
  });

  const renderPendingTickets = userTickets
    ?.filter((t) => t.status === "pending")
    .map((ticket) => (
      <TicketCard
        key={ticket.id}
        ticket={ticket}
        vehicle={userVehicles?.find((v) => v.id === ticket.vehicle_id)}
        url="Mock Url"
      />
    ));

  const renderHistoryTickets = userTickets
    ?.filter((t) => t.status !== "pending")
    .map((ticket) => (
      <TicketCard
        key={ticket.id}
        ticket={ticket}
        vehicle={userVehicles?.find((v) => v.id === ticket.vehicle_id)}
        url="Mock Url"
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

// const date = new Date().toLocaleDateString();
// const tickets: Ticket[] = [
//   {
//     id: 1,
//     vehicle_id: 7,
//     cost: 52.16,
//     type: "Parking",
//     issue_date: date,
//     due_date: date,
//     created_at: date,
//     updated_at: date,
//   },
//   {
//     id: 2,
//     vehicle_id: 7,
//     cost: 52.16,
//     type: "Parking",
//     issue_date: date,
//     due_date: date,
//     created_at: date,
//     updated_at: date,
//   },
// ];
