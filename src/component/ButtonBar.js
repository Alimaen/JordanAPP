import React, { Component } from "react";
import { Icon, View, StyleSheet,TouchableHighlight } from "react-native";

export default class ButtonBar extends Component {
    let changeView =  ()=>{return true;}
  render() {
    return (
      <View>
        <TouchableHighlight onPress={changeView("WashRoom")}>
          <View>
            <Icon />
          </View>
        </TouchableHighlight>
        <TouchableHighlight onPress={changeView("Renting")}>
          <View>
            <Icon />
          </View>
        </TouchableHighlight>
        <TouchableHighlight onPress={changeView("Guide")}>
          <View>
            <Icon />
          </View>
        </TouchableHighlight>
        <TouchableHighlight onPress={changeView("Restaurant")}>
          <View>
            <Icon />
          </View>
        </TouchableHighlight>
        <TouchableHighlight onPress={changeView("Renting")}>
          <View>
            <Icon />
          </View>
        </TouchableHighlight>
      </View>
    );
  }
}
const styles = StyleSheet.create({
Icon:{},
Button:{},
ButtonBar:{}

})