import React, { Component } from "react";
import { View, StyleSheet } from "react-native";

import Input from "../component/Input";
import CarasolList from "../component/CarasolList";
const data = [
  {
    imageUrl:
      "https://static1.squarespace.com/static/55c37beae4b0336075603f86/55c3cd80e4b01531b3208f2e/5603032be4b008bd0ad4e6fb/1486126957019/?format=2500w",
    title: "Concert by Led Zeppelin",
    date: "October 21"
  },
  {
    imageUrl:
      "http://disabilityemployment.org.au/file/5f661aeb90da1d2655916a83c62e568179a50837/deaday1-337lr.jpg",
    title: "Mansaf vs Falafel",
    date: "March 1 - 4"
  },
  {
    imageUrl: "http://via.placeholder.com/160x160",
    title: "something three"
  },
  {
    imageUrl: "http://via.placeholder.com/160x160",
    title: "something four"
  },
  {
    imageUrl: "http://via.placeholder.com/160x160",
    title: "something five"
  },
  {
    imageUrl: "http://via.placeholder.com/160x160",
    title: "something six"
  }
];
export default class Events extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: data
    };
  }
  render() {
    return (
      <View style={{ flex: 5, marginTop: 50 }}>
        <CarasolList
          style={{ flex: 1, alignItems: "center" }}
          data={this.state.data}
          children={<View />}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  separator: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: "#8E8E8E"
  }
});
