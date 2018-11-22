import React, { Component } from "react";
import { Platform, Text, View } from "react-native";
import { SearchBar } from "react-native-elements";
var stringSimilarity = require("string-similarity");

const start_data = [
  { name: "fishing pole", detail: "need for fishing" },
  { name: "boat", detail: "need for fishing and boating." }
];
export default class Rent extends Component {
  constructor(props) {
    super(props);
    this.state = { data: start_data };
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
    console.log(this.state.data);
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
      </View>
    );
  }
}
