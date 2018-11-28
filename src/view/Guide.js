import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Linking,
  ScrollView,
  Animated,
  Image,
  Dimensions,
  TouchableOpacity
} from "react-native";

import MapView, { PROVIDER_GOOGLE } from "react-native-maps";

const { width, height } = Dimensions.get("window");

const CARD_HEIGHT = height / 3.5;
const CARD_WIDTH = (width * 8) / 9;

export default class screens extends Component {
  state = {
    markers: [
      {
        coordinate: {
          latitude: 31.9467336,
          longitude: 35.8890399
        },
        name: "Jordan Jordan",
        experience: " Some thing about the guide",
        pay: "$ 15 per hour",
        nationalNumber: "12345678958",
        contacts: "240-7888996",
        image: {
          uri:
            "http://www.thesourcechiropractic.com/wp-content/uploads/2014/03/headshot-jordan.jpg"
        }
      },
      {
        coordinate: {
          latitude: 31.9514809,
          longitude: 35.9143013
        },
        name: "Samira Wiley",
        experience: " Some thing about the guide",
        pay: "$ 15 per hour",
        nationalNumber: "12345678958",
        contacts: "240-7888996",
        image: {
          uri: "https://www.jordanmatter.com/images/gallery/Samira_Wiley.jpg"
        }
      },
      {
        coordinate: {
          latitude: 31.952595,
          longitude: 35.9355173
        },
        name: "izza Roma ",
        experience: " Some thing about the guide",
        pay: "$ 15 per hour",
        nationalNumber: "12345678958",
        contacts: "240-7888996",
        image: { uri: "http://via.placeholder.com/160x160" }
      },
      {
        coordinate: {
          latitude: 31.9467336,
          longitude: 35.8890399
        },
        name: "itale rant",
        experience: " Some thing about the guide",
        pay: "$ 15 per hour",
        nationalNumber: "12345678958",
        contacts: "240-7888996",
        image: { uri: "http://via.placeholder.com/160x160" }
      }
    ],
    region: {
      latitude: 31.9467336,
      longitude: 35.8890399,
      latitudeDelta: 0.04864195044303443,
      longitudeDelta: 0.040142817690068
    }
  };

  componentWillMount() {
    this.index = 0;
    this.animation = new Animated.Value(0);
  }
  componentDidMount() {
    // We should detect when scrolling has stopped then animate
    // We should just debounce the event listener here
    this.animation.addListener(({ value }) => {
      let index = Math.floor(value / CARD_WIDTH + 0.3); // animate 30% away from landing on the next item
      if (index >= this.state.markers.length) {
        index = this.state.markers.length - 1;
      }
      if (index <= 0) {
        index = 0;
      }

      clearTimeout(this.regionTimeout);
      this.regionTimeout = setTimeout(() => {
        if (this.index !== index) {
          this.index = index;
          const { coordinate } = this.state.markers[index];
          this.map.animateToRegion(
            {
              ...coordinate,
              latitudeDelta: this.state.region.latitudeDelta,
              longitudeDelta: this.state.region.longitudeDelta
            },
            350
          );
        }
      }, 10);
    });
  }
  openMap = coordinates => {
    console.log("open directions");
    let f = Platform.select({
      ios: () => {
        Linking.openURL(
          `http://maps.apple.com/maps?daddr=${coordinates.latitude},${
            coordinates.longitude
          }`
        );
      },
      android: () => {
        console.log("ANDROID");
        Linking.openURL(
          `http://maps.google.com/maps?daddr=${coordinates.latitude},${
            coordinates.longitude
          }`
        ).catch(err => console.error("An error occurred", err));
      }
    });

    f();
  };
  render() {
    const interpolations = this.state.markers.map((marker, index) => {
      const inputRange = [
        (index - 1) * CARD_WIDTH,
        index * CARD_WIDTH,
        (index + 1) * CARD_WIDTH
      ];
      const scale = this.animation.interpolate({
        inputRange,
        outputRange: [1, 2.5, 1],
        extrapolate: "clamp"
      });
      const opacity = this.animation.interpolate({
        inputRange,
        outputRange: [0.35, 1, 0.35],
        extrapolate: "clamp"
      });
      return { scale, opacity };
    });

    return (
      <View style={styles.container}>
        <MapView
          provider={PROVIDER_GOOGLE}
          ref={map => (this.map = map)}
          initialRegion={this.state.region}
          style={styles.container}>
          {this.state.markers.map((marker, index) => {
            const scaleStyle = {
              transform: [
                {
                  scale: interpolations[index].scale
                }
              ]
            };
            const opacityStyle = {
              opacity: interpolations[index].opacity
            };
            return (
              <MapView.Marker key={index} coordinate={marker.coordinate}>
                <Animated.View style={[styles.markerWrap, opacityStyle]}>
                  <Animated.View style={[styles.ring, scaleStyle]} />
                  <View style={styles.marker} />
                </Animated.View>
              </MapView.Marker>
            );
          })}
        </MapView>
        <Animated.ScrollView
          horizontal
          scrollEventThrottle={1}
          showsHorizontalScrollIndicator={false}
          snapToInterval={CARD_WIDTH}
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: {
                    x: this.animation
                  }
                }
              }
            ],
            { useNativeDriver: true }
          )}
          style={styles.scrollView}
          contentContainerStyle={styles.endPadding}>
          {this.state.markers.map((marker, index) => (
            <TouchableOpacity
              onPress={this.openMap.bind(this, marker.coordinate)}>
              <View style={styles.card} key={"r" + index}>
                <Image
                  source={marker.image}
                  style={styles.cardImage}
                  resizeMode="cover"
                />
                <View style={styles.textContent}>
                  <Text numberOfLines={1} style={styles.cardtitle}>
                    {marker.name}
                  </Text>
                  <Text numberOfLines={1} style={styles.cardDescription}>
                    {marker.experience}
                  </Text>
                  <Text numberOfLines={1} style={styles.cardDescription}>
                    <Text style={styles.cardtitle}> N#</Text>
                    {marker.nationalNumber} --{" "}
                    <Text style={styles.cardtitle}>Pay:</Text>
                    {marker.pay}
                  </Text>
                  <Text numberOfLines={1} style={styles.cardtitle}>
                    Contact: {marker.contacts}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </Animated.ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  scrollView: {
    position: "absolute",
    bottom: 30,
    left: 0,
    right: 0,
    paddingVertical: 10
  },
  endPadding: {
    paddingRight: width - CARD_WIDTH
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
    width: CARD_WIDTH,
    overflow: "hidden"
  },
  cardImage: {
    flex: 3,
    width: "100%",
    height: "100%",
    alignSelf: "center"
  },
  textContent: {
    textAlign: "center",
    flex: 2
  },
  cardtitle: {
    textAlign: "center",
    fontSize: 12,
    marginTop: 5,
    fontWeight: "bold"
  },
  cardDescription: {
    textAlign: "center",
    fontSize: 12,
    color: "#444"
  },
  markerWrap: {
    alignItems: "center",
    justifyContent: "center"
  },
  marker: {
    width: 8,
    height: 8,
    borderRadius: 20,
    backgroundColor: "rgba(130,4,150, 0.9)"
  },
  ring: {
    width: 50,
    height: 100,
    borderRadius: 50,
    backgroundColor: "rgba(130,4,150, 0.3)",
    position: "absolute",
    borderWidth: 1,
    borderColor: "rgba(130,4,150, 0.5)"
  }
});
