import { SafeAreaView, StyleSheet, View, Image } from "react-native";
import React from "react";
import { RootStackParamList, TabNavigationParamList } from "../types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { makeStyles, Text, Button } from "@rneui/themed";
import Background from "../components/Background";
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { useGetMapMarkersQuery } from "../api/backendApi";
import { MapMarkers } from "../types/apiTypes";

type Props = NativeStackScreenProps<TabNavigationParamList, "Map">;
export default function MapScreen({ navigation }: Props) {
    const styles = useStyles();

    const { data, isLoading } = useGetMapMarkersQuery(null);
    if (!data) {
        return;
    }

    return (
        <Background>
            <View style={styles.container}>
                    <MapView
                        provider={PROVIDER_GOOGLE}
                        style={styles.mapStyle}
                        initialRegion={{
                            latitude: 43.46450,
                            longitude: -80.52509,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                        }}
                        // customMapStyle={mapStyle}
                        >

                        {data.map((marker, index) => {
                            console.log(marker);
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
                                    source="require(../assets/images/flying-rocket-png.jpeg"
                                    style={styles.markerImage}
                                />
                            </Marker>
                        })}
                    </MapView>
                </View>
            {/* </SafeAreaView> */}
        </Background>
    );
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
