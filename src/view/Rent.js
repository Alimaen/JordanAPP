import React, { Component } from "react";
import { Platform, Text, View, FlatList, Dimensions } from "react-native";
import { SearchBar } from "react-native-elements";
import { Card } from "react-native-elements";
let { width, height } = Dimensions.get("window");

var stringSimilarity = require("string-similarity");

const start_data = [
  {
    name: "Fishing Pole",
    detail: "Need for fishing",
    price: 10,
    location: "At Amman park"
  },
  {
    name: "Boat",
    detail: "Need for fishing and boating.",
    price: 10,
    location: "At Amman park"
  }
];
export default class Rent extends Component {
  constructor(props) {
    super(props);
    this.state = { data: start_data, itemList: new Set() };
  }

  Search = searchText => {
    console.log(searchText);
    ranks_result = [];
    start_data.map((rentalItem, index) => {
      nameSimilarity = stringSimilarity.compareTwoStrings(
        searchText,
        rentalItem.name
      );
      detailSimilarity = stringSimilarity.compareTwoStrings(
        searchText,
        rentalItem.detail
      );
      if (nameSimilarity > 0.5 || detailSimilarity > 0.3) {
        ranks_result.push({
          key: nameSimilarity + detailSimilarity,
          item: rentalItem
        });
      }
      ranks_result.sort(function(a, b) {
        // Compare the 2 dates
        if (a.key > b.key) return -1;
        if (a.key < b.key) return 1;
        return 0;
      });
    });
    this.changeData(ranks_result);
  };
  changeData = newData => {
    itemData = [];
    newData.map((itemPacket, index) => {
      itemData.push(itemPacket.item);
    });
    this.setState({ data: itemData });
  };
  render() {
    return (
      <View>
        <SearchBar
          lightTheme
          round
          showLoading
          platform={Platform.OS}
          cancelButtonTitle="Cancel"
          placeholder="Search"
          onChangeText={this.Search}
        />
        <FlatList
          data={this.state.data}
          renderItem={({ item: rowData }) => {
            return (
              <Card
                title={rowData.name}
                containerStyle={{
                  padding: 0,
                  width: width,
                  height: height / 4
                }}>
                <Text
                  style={{
                    alignItems: "center",
                    textAlign: "center",
                    marginBottom: 10,
                    fontSize: 15
                  }}>
                  ${rowData.price} per hour
                </Text>
                <View
                  style={{
                    alignItems: "center",
                    textAlign: "center",
                    marginBottom: 10,
                    fontStyle: "italic"
                  }}>
                  <Text>{22 - Math.ceil(Math.random() * 20)} left</Text>
                  <Text>{rowData.detail}</Text>
                  <Text style={{ fontWeight: "bold" }}>{rowData.location}</Text>
                </View>
              </Card>
            );
          }}
          keyExtractor={(item, index) => "g" + index}
        />
      </View>
    );
  }
}
