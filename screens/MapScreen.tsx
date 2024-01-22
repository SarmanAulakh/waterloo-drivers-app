import { View } from "react-native";
import React from "react";
import { RootStackParamList } from "../types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { makeStyles, Text, Button } from "@rneui/themed";
import Background from "../components/Background";
  
type Props = NativeStackScreenProps<TabNavigationParamList, "Ticket">;

export default function MapScreen({ navigation }: Props) {
    const styles = useStyles();
    return 
}

const date = new Date().toLocaleDateString();
const mapStyle = []