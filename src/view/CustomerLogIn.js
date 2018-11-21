import React, from "react";
import { StyleSheet,  } from "react-native";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import Icon from "react-native-vector-icons/Ionicons";
import WashRoom from "./WashRoom";
import Event from "./Events";
import Guide from "./Guide";
import Restaurant from "./Restaurant";
import Rent from "./Rent";

type Props = {};

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
    activeTintColor: "#217EFF",
    inactiveTintColor: "#DBC6C3",
    barStyle: {
      backgroundColor: "white" //color you want to change
    }
  }
);
