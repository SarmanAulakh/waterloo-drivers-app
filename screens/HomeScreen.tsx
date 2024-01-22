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
  Avatar,
  Text,
  Button,
  Icon,
  Image,
  ListItem,
  Theme,
  makeStyles,
  withTheme,
} from "@rneui/themed";
import React, { useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList, TabNavigationParamList } from "../types";
import { useGetUserVehiclesQuery } from "../api";
import { AntDesign } from "@expo/vector-icons";
import Colors from "../constants/Colors";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { RootState } from "../redux/store";
import InviteUserModal from "../components/InviteUserModal";
import { logOut } from "../redux/slices/authSlice";

type Props = NativeStackScreenProps<
  TabNavigationParamList & RootStackParamList,
  "Home"
>;

export default function HomeScreen({ navigation }: Props) {
  const styles = useStyles();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state: RootState) => state.auth.user);
  const [visible, setVisible] = useState(false);

  const { data, refetch, isLoading } = useGetUserVehiclesQuery(
    user!.firebase_id,
    {
      skip: !user!,
    }
  );

  console.log(data);

  const [expanded, setExpanded] = useState<number | null>(null);

  const renderListCards = () => {
    return data?.map((vehicle, index) => (
      <ListItem.Accordion
        key={vehicle.licence_plate}
        content={
          <>
            <View style={{ marginHorizontal: 15 }}>
              <AntDesign name="car" size={24} color="black" />
            </View>
            <ListItem.Content>
              <ListItem.Title>
                {vehicle.make} - {vehicle.model}
              </ListItem.Title>
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
            <ListItem.Title>{vehicle.licence_plate}</ListItem.Title>
            <ListItem.Subtitle>{vehicle.year}</ListItem.Subtitle>
            <ListItem.Title style={{ paddingTop: 5 }}>
              Other Drivers:
            </ListItem.Title>
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
            onPress={() => setVisible(true)}
          />
        </ListItem>
        <InviteUserModal
          vehicle={vehicle}
          visible={visible}
          setVisible={setVisible}
        />
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
              paddingTop: 20,
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
            <Text style={{ fontSize: 25, marginLeft: -15 }}>{user?.name}</Text>
            <Text style={{ fontSize: 18, marginLeft: -15 }}>{user?.email}</Text>
            <Text style={{ fontSize: 18, marginLeft: -15, marginTop: 15 }}>
              {user?.drivers_licence_number}
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
              title="Logout"
              titleStyle={{
                fontSize: 16,
                fontWeight: "bold",
                color: Colors.primaryText,
              }}
              onPress={() => {
                navigation.navigate("Welcome");
                dispatch(logOut());
              }}
            />
          </View>
          <View style={{ flex: 1, alignItems: "center" }}>
            <Button
              title="Add Vehicle"
              buttonStyle={styles.addVehicleButton}
              titleStyle={{
                fontSize: 16,
                fontWeight: "bold",
                color: Colors.primaryText,
              }}
              onPress={() => navigation.navigate("AddVehicle")}
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
