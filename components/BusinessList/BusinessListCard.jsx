import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Linking,
} from "react-native";
import React from "react";
import { router } from "expo-router";
// import Reviews from "./Reviews";

export default function BusinessListCard({ business }) {
  const handlePress = (url) => {
    Linking.openURL(url);
  };

  const handleAddressPress = (address) => {
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      address
    )}`;
    Linking.openURL(url);
  };
  const handleContactPress = (contact) => {
    const url = `tel:${contact}`;
    Linking.openURL(url);
  };

  return (
    <ScrollView>
      <View style={styles.card}>
        {/* --------- */}
        <View style={styles.container}>
          {/* ----------IMAGE------------ */}
          <Image source={{ uri: business.imageUrl }} style={styles.image} />
          {/* ----------- Name--------- */}
          <View style={styles.content}>
            <Text style={styles.name}>{business.name}</Text>
            {/*------------ about--------- */}
            <Text style={styles.about} numberOfLines={2} ellipsizeMode="tail">
              {business.about}
            </Text>

            {/* ----------- Contact Info ----------- */}
            <TouchableOpacity
              style={styles.infoContainer}
              onPress={() => handleContactPress(business.contact)}
            >
              <Image
                source={require("../../assets/images/call.png")}
                style={styles.infoIcon}
              />
              <Text style={styles.infoText}>Contact: {business.contact}</Text>
            </TouchableOpacity>

            {/* ----------- Website Link ----------- */}
            <TouchableOpacity
              style={styles.infoContainer}
              onPress={() => handlePress(business.website)}
            >
              <Image
                source={require("../../assets/images/web.png")}
                style={styles.infoIcon}
              />
              <Text style={styles.infoText}>Website</Text>
            </TouchableOpacity>

            {/* ----------- Address Link ----------- */}
            <TouchableOpacity
              style={styles.infoContainer}
              onPress={() => handleAddressPress(business.adress)}
            >
              <Image
                source={require("../../assets/images/pin.png")}
                style={styles.infoIcon}
              />
              <Text style={styles.infoText}>{business.adress}</Text>
            </TouchableOpacity>
            {/* --------------rating-------- */}
            <View style={styles.ratingContainer}>
              <Image
                source={require("../../assets/images/star.png")}
                style={styles.starImage}
              />
              <Text style={styles.ratingText}>{business.rating || "4.3"}</Text>
            </View>
          </View>
        </View>

        <View>
          {/* -------------- reviews--------- */}
          {/* <Reviews business={business}></Reviews> */}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  card: {
    margin: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  container: {
    flexDirection: "row",
    padding: 10,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 10,
  },
  content: {
    flex: 1,
    marginLeft: 10,
    justifyContent: "center",
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#333",
  },
  infoContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },
  infoIcon: {
    width: 16,
    height: 16,
    marginRight: 5,
  },
  infoText: {
    fontSize: 14,
    color: "#007AFF",
  },
  about: {
    fontSize: 14,
    color: "#777",
    marginBottom: 5,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  starImage: {
    width: 16,
    height: 16,
    marginRight: 5,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
  },
});
