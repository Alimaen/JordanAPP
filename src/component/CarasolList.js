import React, { Component } from "react";
import { Text, View, Dimensions, FlatList, StyleSheet } from "react-native";
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
  componentDidUpdate() {
    this.setState({ data: this.props.data, childern: this.props.children });
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
                imageStyle={styles.cardImage}
                containerStyle={styles.card}>
                <Text
                  style={{
                    alignItems: "center",
                    textAlign: "center",
                    marginBottom: 10,
                    fontSize: 20,
                    fontWeight: "bold"
                  }}>
                  {rowData.title}
                </Text>
                <Text
                  style={{
                    alignItems: "center",
                    textAlign: "center"
                  }}>
                  {rowData.description}
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
const CARD_HEIGHT = (height * 2) / 3;
const CARD_WIDTH = (width * 8) / 9;
const styles = StyleSheet.create({
  cardImage: {
    width: CARD_WIDTH - 20,
    height: CARD_HEIGHT / 3,
    alignSelf: "center"
  },
  card: {
    padding: 10,
    elevation: 2,
    backgroundColor: "#FFF",
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowRadius: 5,
    shadowOpacity: 0.3,
    shadowOffset: { x: 2, y: -2 },
    height: CARD_HEIGHT,
    width: CARD_WIDTH
  }
});
