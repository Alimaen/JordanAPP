import React, { Component } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import Icon from "react-native-vector-icons/Ionicons";
import WashRoom from "./src/view/WashRoom";
import Event from "./src/view/Events";
import Guide from "./src/view/Guide";
import Restaurant from "./src/view/Restaurant";
import Rent from "./src/view/Rent";

const instructions = Platform.select({
  ios: "Press Cmd+R to reload,\n" + "Cmd+D or shake for dev menu",
  android:
    "Double tap R on your keyboard to reload,\n" +
    "Shake or press menu button for dev menu"
});

type Props = {};
class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to React Native!</Text>
        <Text style={styles.instructions}>To get started, edit App.js</Text>
        <Text style={styles.instructions}>{instructions}</Text>
      </View>
    );
  }
}
class App1 extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to React11 Native!</Text>
        <Text style={styles.instructions}>To get started, edit App.js</Text>
        <Text style={styles.instructions}>{instructions}</Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  }
});

export default createMaterialBottomTabNavigator(
  {
    WashRoom: {
      screen: WashRoom,
      navigationOptions: {
        tabBarLabel: "WashRoom",
        tabBarIcon: ({ tintColor }) => (
          <Icon name="ios-walk" color={tintColor} size={24} />
        )
      }
    },
    Event: {
      screen: Event,
      navigationOptions: {
        tabBarLabel: "Event",
        tabBarIcon: ({ tintColor }) => (
          <Icon name="ios-calendar" color={tintColor} size={24} />
        )
      }
    },
    Guide: {
      screen: Guide,
      navigationOptions: {
        tabBarLabel: "Guide",
        tabBarIcon: ({ tintColor }) => (
          <Icon name="ios-book" color={tintColor} size={24} />
        )
      }
    },
    Restaurant: {
      screen: Restaurant,
      navigationOptions: {
        tabBarLabel: "Restaurant",
        tabBarIcon: ({ tintColor }) => (
          <Icon name="ios-restaurant" color={tintColor} size={24} />
        )
      }
    },
    Rent: {
      screen: Rent,
      navigationOptions: {
        tabBarLabel: "Rent",
        tabBarIcon: ({ tintColor }) => (
          <Icon name="ios-cash" color={tintColor} size={24} />
        )
      }
    }
  },
  {
    initialRouteName: "Guide",
    order: ["WashRoom", "Event", "Guide", "Restaurant", "Rent"],
    shifting: true,
    activeTintColor: "#0F0",
    inactiveTintColor: "#FF6347",
    barStyle: {
      backgroundColor: "white" //color you want to change
    }
  }
);
