import React, { Component } from "react";
import { Text, View, Dimensions, FlatList } from "react-native";
import { Card } from "react-native-elements";
let { width, height } = Dimensions.get("window");

const data = [
  {
    picture:
      "http://www.thesourcechiropractic.com/wp-content/uploads/2014/03/headshot-jordan.jpg",
    name: "Jordan Jordan",
    experience: " Some thing about the guide",
    pay: "$ 15 per hour"
  },
  {
    picture: "https://www.jordanmatter.com/images/gallery/Samira_Wiley.jpg",
    name: "Samira Wiley",
    experience: " Some thing about the guide",
    pay: "$ 100 per person"
  },
  {
    picture: "http://via.placeholder.com/160x160",
    name: "John Doe",
    experience: " Some thing about the guide"
  },
  {
    picture: "http://via.placeholder.com/160x160",
    name: "John Doe",
    experience: " Some thing about the guide"
  },
  {
    picture: "http://via.placeholder.com/160x160",
    name: "John Doe",
    experience: " Some thing about the guide"
  },
  {
    picture: "http://via.placeholder.com/160x160",
    name: "John Doe",
    experience: " Some thing about the guide"
  }
];

export default class Guide extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: data,
      children: this.props.children
    };
  }
  render() {
    return (
      <View>
        <FlatList
          data={this.state.data}
          renderItem={({ item: rowData }) => {
            return (
              <Card
                title={rowData.name}
                image={{ uri: rowData.picture }}
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
                  {rowData.pay}
                </Text>
                <Text>BIO</Text>
                <Text>
                  Mega Bio with bolded features :
                  <Text style={{ fontWeight: "bold" }}>BIO2</Text>
                </Text>
              </Card>
            );
          }}
          keyExtractor={(item, index) => "g" + index}
        />
      </View>
    );
  }
}
