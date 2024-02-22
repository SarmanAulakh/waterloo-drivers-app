import { SafeAreaView, StyleSheet, View, Image, Platform, Text } from "react-native";
import React, { useState, useEffect } from "react";
import { RootStackParamList, TabNavigationParamList } from "../types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { makeStyles, Button } from "@rneui/themed";
import Background from "../components/Background";
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { useGetMapMarkersQuery } from "../api/backendApi";
import { MapMarkers } from "../types/apiTypes";
import * as Location from 'expo-location';

type Props = NativeStackScreenProps<TabNavigationParamList, "Map">;
export default function MapScreen({ navigation }: Props) {
    const styles = useStyles();

    const [location, setLocation] = useState<Location.LocationObject | null>(null);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    useEffect(() => {
        (async () => {
          
          let { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
            return;
          }
    
          let location = await Location.getCurrentPositionAsync({});
          setLocation(location);
        })();
      }, []);
    const { data, isLoading } = useGetMapMarkersQuery(null);
    if (!data) {
        return;
    }
    let text = 'Waiting..';
    var curr_latitude = 0;
    var curr_longitude = 0;
    if (errorMsg) {
        text = errorMsg;
        } else if (location) {
        text = JSON.stringify(location);
        curr_latitude = JSON.parse(text)["coords"]["latitude"];
        curr_longitude = JSON.parse(text)["coords"]["longitude"];
        return (
            <Background>
                <View style={styles.container}>
                        <MapView
                            provider={PROVIDER_GOOGLE}
                            style={styles.mapStyle}
                            initialRegion={{
                                latitude: curr_latitude,
                                longitude: curr_longitude,
                                latitudeDelta: 0.0922,
                                longitudeDelta: 0.0421,
                            }}
                            >
                            <Marker
                                key={9999}
                                coordinate={{
                                    latitude: curr_latitude,
                                    longitude: curr_longitude
                                }}
                                title={"Your Location"}
                            ></Marker>

                            {data.map((marker, index) => {
                                return <Marker
                                    key={index}
                                    coordinate={{
                                        latitude: marker.latitude,
                                        longitude: marker.longitude
                                    }}
                                    title={marker.name}
                                    description={marker.icon_type}
                                >
                                    <Image
                                        source={marker_images[marker.icon_type]}
                                        style={styles.markerImage}
                                    />
                                </Marker>
                            })}
                        </MapView>
                    </View>
            </Background>
        );
    }
    console.log("No location yet.")
}
  
const image_path = "../assets/images/";
const marker_images: Record<string, any> = {
    redlight: require(image_path + "redlight.png"),
    speedtrap: require(image_path + "speedtrap.png"),
    parking: require(image_path + "parking.png")
}

const useStyles = makeStyles((theme) => ({
    container: {
        justifyContent: "space-between",
        alignItems: "center",
        alignSelf: "center",
        width: "100%",
        height: "100%",
        padding: 0,
        margin: 0,
    },
    button: {
        width: 200,
    },
    title: {
        paddingVertical: 20,
    },
    mapStyle: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        padding: 0,
        margin: 0,
    },
    markerImage: {
        width: 35,
        height: 35,
    }
}));

const date = new Date().toLocaleDateString();
const mapStyle = [
    { elementType: 'geometry', stylers: [{ color: '#242f3e' }] },
    { elementType: 'labels.text.fill', stylers: [{ color: '#746855' }] },
    { elementType: 'labels.text.stroke', stylers: [{ color: '#242f3e' }] },
    {
        featureType: 'administrative.locality',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#d59563' }],
    },
    {
        featureType: 'poi',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#d59563' }],
    },
    {
        featureType: 'poi.park',
        elementType: 'geometry',
        stylers: [{ color: '#263c3f' }],
    },
    {
        featureType: 'poi.park',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#6b9a76' }],
    },
    {
        featureType: 'road',
        elementType: 'geometry',
        stylers: [{ color: '#38414e' }],
    },
    {
        featureType: 'road',
        elementType: 'geometry.stroke',
        stylers: [{ color: '#212a37' }],
    },
    {
        featureType: 'road',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#9ca5b3' }],
    },
    {
        featureType: 'road.highway',
        elementType: 'geometry',
        stylers: [{ color: '#746855' }],
    },
    {
        featureType: 'road.highway',
        elementType: 'geometry.stroke',
        stylers: [{ color: '#1f2835' }],
    },
    {
        featureType: 'road.highway',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#f3d19c' }],
    },
    {
        featureType: 'transit',
        elementType: 'geometry',
        stylers: [{ color: '#2f3948' }],
    },
    {
        featureType: 'transit.station',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#d59563' }],
    },
    {
        featureType: 'water',
        elementType: 'geometry',
        stylers: [{ color: '#17263c' }],
    },
    {
        featureType: 'water',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#515c6d' }],
    },
    {
        featureType: 'water',
        elementType: 'labels.text.stroke',
        stylers: [{ color: '#17263c' }],
    },
];
