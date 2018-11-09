import React, { Component } from "react";
import { Button, View } from "react-native";

export default class LogIn extends Component {
  constructor(props) {
    super(props);
    this.state = { guide: this.props.guide, tourist: this.props.tourist };
  }
  render() {
    return (
      <View>
        <View>
          <Button label="Guide" />
          <Button label="Tourist" />
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  Button: {},
  Container: {},
  Main: {}
});
