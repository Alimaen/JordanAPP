import React, { Component } from "react";
import { Text, View, Platform } from "react-native";
import MapView from "react-native-maps";
export default class Restaurant extends Component {
  render() {
    return (
      <View>
        <Text> Guide </Text>
        {/* <MapView
          mapType={Platform.OS == "android" ? "none" : "standard"}
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
          }}
        /> */}
      </View>
    );
  }
}
