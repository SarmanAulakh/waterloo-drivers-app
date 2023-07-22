import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  FlatList,
  ListRenderItem,
} from "react-native";
import { firebaseAppAuth } from "../firebaseAuth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";
import { useGetVehiclesQuery } from "../api";
import { Vehicle } from "../types/apiTypes";

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

export default function HomeScreen({ navigation }: Props) {
  const { data, isLoading, isError } = useGetVehiclesQuery();

  if (isLoading) {
    return <ActivityIndicator size="large" />;
  }

  if (isError) {
    return <Text>Error: server is down</Text>;
  }

  const renderVehicleItem: ListRenderItem<Vehicle> = ({ item }) => (
    <View>
      <Text>Ticket ID: {item.id}</Text>
      <Text>Amount: {item.make}</Text>
      {/* Add more ticket details here */}
    </View>
  );

  const vehicles = data || [];

  return (
    <SafeAreaView>
      <View>
      {vehicles.length > 0 ? (
        <FlatList
          data={vehicles}
          renderItem={renderVehicleItem}
          keyExtractor={(item) => item.id.toString()}
        />
      ) : (
        <Text>No unpaid tickets</Text>
      )}
        
        {/* {data?.map((vehicle: Vehicle) => {
           <Text>ve</Text>
        })} */}
        {/* <Text>Unpaid Tickets</Text>
        {unpaidTickets.length > 0 ? (
          <FlatList
            data={unpaidTickets}
            renderItem={renderTicketItem}
            keyExtractor={(item) => item.id.toString()}
          />
        ) : (
          <Text>No unpaid tickets</Text>
        )}

        <Text>Paid Tickets</Text>
        {paidTickets.length > 0 ? (
          <FlatList
            data={paidTickets}
            renderItem={renderTicketItem}
            keyExtractor={(item) => item.id.toString()}
          />
        ) : (
          <Text>No paid tickets</Text>
        )} */}
      </View>
    </SafeAreaView>
  );
}
