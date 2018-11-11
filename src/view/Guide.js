import React, { Component } from "react";
import { Text, View } from "react-native";

export default class Guide extends Component {
  render() {
    return (
      <View>
        <Text> Guide1 {new Date().toLocaleString()}</Text>
      </View>
    );
  }
}
