import React, { Component } from "react";
import { View, StyleSheet, Dimensions, FlatList, Text } from "react-native";
import { Calendar, CalendarList, Agenda } from "react-native-calendars";
import { Card } from "react-native-elements";
import Input from "../component/Input";
import CarasolList from "../component/CarasolList";
let { width, height } = Dimensions.get("window");

const CARD_HEIGHT = (height * 2) / 3;
const CARD_WIDTH = (width * 8) / 9;
const data = [
  {
    imageUrl:
      "https://static1.squarespace.com/static/55c37beae4b0336075603f86/55c3cd80e4b01531b3208f2e/5603032be4b008bd0ad4e6fb/1486126957019/?format=2500w",
    title: "Concert by Led Zeppelin",
    date: "November 29",
    dateString: ["2018-11-29"],
    description: "Come listen to a world fameous band"
  },
  {
    imageUrl:
      "http://disabilityemployment.org.au/file/5f661aeb90da1d2655916a83c62e568179a50837/deaday1-337lr.jpg",
    title: "Mansaf vs Falafel",
    date: "March 1 - 4",
    dateString: ["2018-3-1", "2018-3-2", "2018-3-3", "2018-3-4"],
    description: "Come listen to a talk on best foods in Jordan"
  },
  {
    imageUrl: "http://via.placeholder.com/160x160",
    title: "FireWorks",
    date: "December 10 - 12",
    dateString: ["2018-12-10", "2018-12-11", "2018-12-12"],
    description: "Come and enjoy beautiful firework in Amman"
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
const date = new Date().getUTCDate();
export default class Events extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: data
    };
  }
  dateChanged(day) {
    newData = [];
    for (var event in data) {
      event = data[event];
      if (event.dateString) {
        if (event.dateString.includes(day)) {
          newData.push(event);
        }
      }
    }
    this.setState({ data: newData });
    console.log(this.state.data);
  }

  render() {
    return (
      <View>
        <Calendar
          style={{
            borderWidth: 1,
            borderColor: "gray",
            height: 350
          }}
          markedDates={{
            [this.state.selected]: {
              selected: true,
              disableTouchEvent: true,
              selectedDotColor: "orange"
            }
          }}
          // Specify theme properties to override specific styles for calendar parts. Default = {}
          theme={{
            backgroundColor: "#ffffff",
            calendarBackground: "#ffffff",
            textSectionTitleColor: "#b6c1cd",
            selectedDayBackgroundColor: "#00adf5",
            selectedDayTextColor: "#ffffff",
            todayTextColor: "#00adf5",
            dayTextColor: "#2d4150",
            textDisabledColor: "#d9e1e8",
            dotColor: "#00adf5",
            selectedDotColor: "#ffffff",
            arrowColor: "orange",
            monthTextColor: "blue",
            textDayFontFamily: "monospace",
            textMonthFontFamily: "monospace",
            textDayHeaderFontFamily: "monospace",
            textMonthFontWeight: "bold",
            textDayFontSize: 16,
            textMonthFontSize: 16,
            textDayHeaderFontSize: 16
          }}
          minDate={"2012-05-10"}
          maxDate={"2020-05-30"}
          // selected={this.state.selected}
          onDayPress={day => {
            this.setState({
              selected: day.dateString
            });
            this.dateChanged(day.dateString);
          }}
          onDayLongPress={day => {}}
          monthFormat={"MMM yyyy"}
          onMonthChange={month => {}}
          hideExtraDays={true}
          disableMonthChange={true}
          firstDay={1}
          onPressArrowLeft={substractMonth => substractMonth()}
          onPressArrowRight={addMonth => addMonth()}
        />
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
      </View>
    );
  }
}

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
  },
  separator: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: "#8E8E8E"
  }
});
