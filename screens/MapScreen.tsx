import { View } from "react-native";
import React from "react";
import { RootStackParamList } from "../types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { makeStyles, Text, Button } from "@rneui/themed";
import Background from "../components/Background";
  
type Props = NativeStackScreenProps<TabNavigationParamList, "Ticket">;

export default function MapScreen({ navigation }: Props) {
    const styles = useStyles();
    return (
        <Background>
            <View style={styles.container}>
                <Text h3>City of Waterloo Map</Text>
                
            </View>
        </Background>
    );
}

const useStyles = makeStyles((theme) => ({
    container: {
        height: 200,
        justifyContent: "space-between",
        alignItems: "center",
        alignSelf: "center",
        padding: 20,
    },
    button: {
        width: 200,
    },
}));

const date = new Date().toLocaleDateString();
const mapStyle = []