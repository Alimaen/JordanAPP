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

const Images = [
  {
    uri:
      "https://lh5.googleusercontent.com/p/AF1QipNePID2rkL6nXtZqdm-AmpWgahAiuiMaV8c6wzP=s0"
  },
  {
    uri:
      "https://lh5.googleusercontent.com/p/AF1QipPEabTqUqSfUa4Xjesyt4LN6Wdu1_HKbVxHu4D5=w408-h306-k-no"
  },
  {
    uri:
      "https://lh5.googleusercontent.com/p/AF1QipMPsY6FSYi8C8KOWc_wp7uttxebl6Mg7EW8gp8m=w411-h200-k-no"
  },
  {
    uri:
      "https://lh5.googleusercontent.com/p/AF1QipPF6GIn2FHVrQax1EFqjy89Ad0-tJSTKJrBrD8S=w408-h233-k-no"
  }
];

const { width, height } = Dimensions.get("window");

const CARD_HEIGHT = height / 4;
const CARD_WIDTH = CARD_HEIGHT - 50;

export default class screens extends Component {
  state = {
    markers: [
      {
        coordinate: {
          latitude: 31.9467336,
          longitude: 35.8890399
        },
        title: "Fakhreldin Restaurant $$",
        description: "This is the best place in Jordan",
        image: Images[0]
      },
      {
        coordinate: {
          latitude: 31.9514809,
          longitude: 35.9143013
        },
        title: "Rosa Damascena $$$",
        description: "This is the second best place in Jordan",
        image: Images[1]
      },
      {
        coordinate: {
          latitude: 31.952595,
          longitude: 35.9355173
        },
        title: "Pizza Roma Cafe",
        description: "This is the third best place in Jordan",
        image: Images[2]
      },
      {
        coordinate: {
          latitude: 31.9467336,
          longitude: 35.8890399
        },
        title: "La Capitale Restaurant",
        description: "This is the fourth best place in Jordan",
        image: Images[3]
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
              <View style={styles.card} key={index}>
                <Image
                  source={marker.image}
                  style={styles.cardImage}
                  resizeMode="cover"
                />
                <View style={styles.textContent}>
                  <Text numberOfLines={1} style={styles.cardtitle}>
                    {marker.title}
                  </Text>
                  <Text numberOfLines={1} style={styles.cardDescription}>
                    {marker.description}
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
    flex: 1
  },
  cardtitle: {
    fontSize: 12,
    marginTop: 5,
    fontWeight: "bold"
  },
  cardDescription: {
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
    borderRadius: 4,
    backgroundColor: "rgba(130,4,150, 0.9)"
  },
  ring: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "rgba(130,4,150, 0.3)",
    position: "absolute",
    borderWidth: 1,
    borderColor: "rgba(130,4,150, 0.5)"
  }
});
