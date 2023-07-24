import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  FlatList,
  ListRenderItem,
  ScrollView,
} from "react-native";
import {
  Avatar,
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
import { Vehicle } from "../types/apiTypes";
import { AntDesign } from "@expo/vector-icons";
import Colors from "../constants/Colors";

type Props = NativeStackScreenProps<TabNavigationParamList, "Ticket">;

export default function TicketScreen({ navigation }: Props) {
  const styles = useStyles();
  const [expanded, setExpanded] = useState<number | null>(null);
  const renderListCards = () => {
    return [].map((vehicle, index) => (
      <ListItem.Accordion
        content={
          <>
            <View style={{ marginHorizontal: 15 }}>
              <AntDesign name="car" size={24} color="black" />
            </View>
            <ListItem.Content>
              <ListItem.Title></ListItem.Title>
            </ListItem.Content>
          </>
        }
        isExpanded={expanded === index}
        onPress={() => {
          setExpanded((prev) => (prev == null ? index : null));
        }}
        bottomDivider
        topDivider
        containerStyle={{ backgroundColor: Colors.secondary }}
      >
        <ListItem bottomDivider>
          <ListItem.Content>
            {/* <ListItem.Title>{vehicle.licence_plate}</ListItem.Title> */}
            {/* <ListItem.Subtitle>{vehicle.year}</ListItem.Subtitle> */}
            <ListItem.Title>Other Drivers:</ListItem.Title>
            <ListItem.Subtitle>Driver A</ListItem.Subtitle>
            <ListItem.Subtitle>Driver B</ListItem.Subtitle>
          </ListItem.Content>
          <Button
            icon={
              <Icon
                name="md-person-add"
                type="ionicon"
                color="black"
                size={24}
              />
            }
            buttonStyle={{ backgroundColor: Colors.tertiary }}
          />
        </ListItem>
      </ListItem.Accordion>
    ));
  };

  return (
    <>
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          borderRadius: 5,
          alignItems: "center",
          marginHorizontal: 10,
          height: 250,
          marginBottom: 10,
        }}
      >
        <View style={{ flex: 3, flexDirection: "row" }}>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Avatar
              size={145}
              source={{
                uri: "https://randomuser.me/api/portraits/lego/1.jpg",
              }}
              // activeOpacity={0.7}
              avatarStyle={{
                borderRadius: 145 / 2,
                borderColor: "black",
                borderWidth: 0.5,
              }}
              overlayContainerStyle={{ backgroundColor: "transparent" }}
            />
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              // alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 25, marginLeft: -15 }}>Paul Allen</Text>
            <Text style={{ fontSize: 18, marginLeft: -15 }}>
              test@email.com
            </Text>
            <Text style={{ fontSize: 18, marginLeft: -15, marginTop: 15 }}>
              S8033-01040-10226
            </Text>
          </View>
        </View>
        <View
          style={{
            width: 300,
            borderWidth: 0.5,
            borderColor: "rgba(222, 223, 226, 1)",
            marginHorizontal: 20,
            height: 1,
            marginVertical: 10,
          }}
        />
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <View style={{ flex: 1, alignItems: "center" }}>
            <Button
              title="Add Vehicle"
              buttonStyle={styles.addVehicleButton}
              titleStyle={{
                fontSize: 16,
                fontWeight: "bold",
                color: Colors.primaryText,
              }}
              onPress={() => console.log("aye")}
            />
          </View>
        </View>
      </View>
      <ScrollView>
        <View style={{ marginVertical: 10 }}>{renderListCards()}</View>
      </ScrollView>
    </>
  );
}

const useStyles = makeStyles((theme) => ({
  addVehicleButton: {
    backgroundColor: Colors.primary,
    height: 42,
    width: 142,
    borderRadius: 5,
    paddingVertical: 5,
  },
}));

type UserData = {
  name: string;
  avatar: string;
  value: string;
  positive: boolean;
};
