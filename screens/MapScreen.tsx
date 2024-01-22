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
  import { useGetUserTicketsQuery, useGetUserVehiclesQuery } from "../api";
  import { useAppSelector } from "../redux/hooks";
  import { RootState } from "../redux/store";
  import Background from "../components/Background";
  
  type Props = NativeStackScreenProps<TabNavigationParamList, "Ticket">;
  
  export default function MapScreen({ navigation }: Props) {
    const user = useAppSelector((state: RootState) => state.auth.user);
  }
  
  const date = new Date().toLocaleDateString();
  const mapStyle= [
    {elementType: }
  ]