import {SafeAreaView, StyleSheet, View } from "react-native";
import React from "react";
import { RootStackParamList, TabNavigationParamList } from "../types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { makeStyles, Text, Button } from "@rneui/themed";
import Background from "../components/Background";
import MapView, {Marker} from 'react-native-maps';

type Props = NativeStackScreenProps<TabNavigationParamList, "Ticket">;

const endpointUrl = 'https://rails-ticket-server-d195e679f8ce.herokuapp.com/api/v1/map_markers';

// Make the GET request using the fetch function


export default function MapScreen({ navigation }: Props) {
    const styles = useStyles();

    // const promise = fetch(endpointUrl);
    // // do stuff
    // promise.then(data => {
    //     data
    // })

    // retrieve markers from an endpoint
    fetch(endpointUrl)
        .then(response => {
            // Check if the response status is OK (status code 200-299)
            if (!response.ok) {
                throw new Error(`Network response was not ok; status: ${response.status}`);
            }

            // Parse the JSON data from the response
            return response.json();
        })
        .then(data => {
            // Handle the data here
            console.log('Response:', data);
        })
        .catch(error => {
            // Handle errors here
            console.error('Error:', error.message);
        });

    return (
        <Background>
            <View style={styles.container}>
                <Text h3>City of Waterloo Map</Text>
                
            </View>

            {/* lat and long values to be changed in the future */}
            <SafeAreaView style = {{flex: 1}}>
                <View style = {stylesMap.container}>
                    <MapView
                        style = {stylesMap.mapStyle}
                        initialRegion = {{
                            latitude: 37.78825,
                            longitude: -122.4324,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                        }}
                        customMapStyle = {mapStyle}>
                    <Marker
                        draggable
                        coordinate = {{
                            latitude: 37.78825,
                            longitude: -122.4324,
                        }}
                        onDragEnd = {
                            (e) => alert(JSON.stringify(e.nativeEvent.coordinate))
                        }
                        title = {'Test Marker'}
                        description = {'This is a description of the marker'}
                    />
                    </MapView>
                </View>
            </SafeAreaView>
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
const mapStyle = [
    {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
    {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
    {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
    {
        featureType: 'administrative.locality',
        elementType: 'labels.text.fill',
        stylers: [{color: '#d59563'}],
    },
    {
        featureType: 'poi',
        elementType: 'labels.text.fill',
        stylers: [{color: '#d59563'}],
    },
    {
        featureType: 'poi.park',
        elementType: 'geometry',
        stylers: [{color: '#263c3f'}],
    },
    {
        featureType: 'poi.park',
        elementType: 'labels.text.fill',
        stylers: [{color: '#6b9a76'}],
    },
    {
        featureType: 'road',
        elementType: 'geometry',
        stylers: [{color: '#38414e'}],
    },
    {
        featureType: 'road',
        elementType: 'geometry.stroke',
        stylers: [{color: '#212a37'}],
    },
    {
        featureType: 'road',
        elementType: 'labels.text.fill',
        stylers: [{color: '#9ca5b3'}],
    },
    {
        featureType: 'road.highway',
        elementType: 'geometry',
        stylers: [{color: '#746855'}],
    },
    {
        featureType: 'road.highway',
        elementType: 'geometry.stroke',
        stylers: [{color: '#1f2835'}],
    },
    {
        featureType: 'road.highway',
        elementType: 'labels.text.fill',
        stylers: [{color: '#f3d19c'}],
    },
    {
        featureType: 'transit',
        elementType: 'geometry',
        stylers: [{color: '#2f3948'}],
    },
    {
        featureType: 'transit.station',
        elementType: 'labels.text.fill',
        stylers: [{color: '#d59563'}],
    },
    {
        featureType: 'water',
        elementType: 'geometry',
        stylers: [{color: '#17263c'}],
    },
    {
        featureType: 'water',
        elementType: 'labels.text.fill',
        stylers: [{color: '#515c6d'}],
    },
    {
        featureType: 'water',
        elementType: 'labels.text.stroke',
        stylers: [{color: '#17263c'}],
    },
  ];
  
const stylesMap = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    mapStyle: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
});
