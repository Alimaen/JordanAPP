import React, { Component } from "react";
import { Text, View, Dimensions, FlatList } from "react-native";
import { Card } from "react-native-elements";
let { width, height } = Dimensions.get("window");

export default class CarasolList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data,
      childern: this.props.children
    };
  }
  render() {
    return (
      <View>
        <FlatList
          horizontal
          data={this.state.data}
          renderItem={({ item: rowData }) => {
            return (
              <Card
                title={rowData.date}
                image={{ uri: rowData.imageUrl }}
                containerStyle={{
                  padding: 0,
                  width: width - 50,
                  height: height - 120
                }}>
                <Text
                  style={{
                    alignItems: "center",
                    textAlign: "center",
                    marginBottom: 10
                  }}>
                  {rowData.title}
                </Text>
              </Card>
            );
          }}
          keyExtractor={(item, index) => index}
        />
      </View>
    );
  }
}
