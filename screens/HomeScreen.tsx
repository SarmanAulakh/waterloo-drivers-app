import { View, ScrollView, Platform } from "react-native";
import { Avatar, Text, Button, ListItem, makeStyles } from "@rneui/themed";
import React, { useEffect, useRef, useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList, TabNavigationParamList } from "../types";
import {
  useGetUserVehiclesQuery,
  useSetUserPushTokenMutation,
} from "../api/backendApi";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import Colors from "../constants/Colors";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { RootState } from "../redux/store";
import InviteUserModal from "../components/InviteUserModal";
import { logOut } from "../redux/slices/authSlice";
import AddCarModal from "../components/AddCarModal";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import Constants from "expo-constants";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

type Props = NativeStackScreenProps<
  TabNavigationParamList & RootStackParamList,
  "Home"
>;

export default function HomeScreen({ navigation }: Props) {
  const styles = useStyles();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state: RootState) => state.auth.user);
  const [visible, setVisible] = useState(false);
  const [expanded, setExpanded] = useState<number | null>(null);
  const [showAddCar, setShowAddCar] = useState(false);
  // const [notification, setNotification] = useState<Notifications.Notification | null>(null);
  const notificationListener = useRef<Notifications.Subscription | null>(null);
  const responseListener = useRef<Notifications.Subscription | null>(null);

  const [setPushToken] = useSetUserPushTokenMutation();

  const { data } = useGetUserVehiclesQuery(user?.firebase_id!, {
    skip: !user!,
  });

  useEffect(() => {
    if (user && !user?.push_token) {
      registerForPushNotificationsAsync().then((token) => {
        console.log("token", token);
        setPushToken({
          firebaseUserId: user.firebase_id,
          pushToken: token || "",
        })
          .then((e) =>
            console.log("a", {
              firebaseUserId: user.firebase_id,
              pushToken: token || "",
            })
          )
          .catch((e) => console.log("error", e));
        return null;
      });
    }

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        console.log(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      if (notificationListener.current) {
        Notifications.removeNotificationSubscription(
          notificationListener.current
        );
      }
      if (responseListener.current) {
        Notifications.removeNotificationSubscription(responseListener.current);
      }
    };
  }, []);

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
            {vehicle.users?.map((u) => (
              <ListItem.Subtitle key={u}>{u}</ListItem.Subtitle>
            ))}
          </ListItem.Content>
          <Button
            icon={<AntDesign name="adduser" size={24} color="black" />}
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
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                marginLeft: -15,
                marginTop: 20,
              }}
            >
              <FontAwesome name="drivers-license-o" size={24} color="black" />
              <Text style={{ fontSize: 18, marginLeft: 8 }}>
                {user?.drivers_licence_number}
              </Text>
            </View>
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
                color: "#fff",
              }}
              onPress={() => {
                navigation.navigate("Login");
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
              onPress={() => setShowAddCar(true)}
            />
          </View>
        </View>
      </View>
      <AddCarModal
        navigation={navigation}
        visible={showAddCar}
        setVisible={setShowAddCar}
      />
      <ScrollView
        style={{
          flex: 1,
          flexDirection: "column",
          borderRadius: 5,
        }}
      >
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

async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    // Learn more about projectId:
    // https://docs.expo.dev/push-notifications/push-notifications-setup/#configure-projectid
    token = (
      await Notifications.getExpoPushTokenAsync({
        projectId: Constants.expoConfig?.extra?.eas?.projectId,
      })
    ).data;
    console.log(token);
  } else {
    alert("Must use physical device for Push Notifications");
  }

  return token;
}
