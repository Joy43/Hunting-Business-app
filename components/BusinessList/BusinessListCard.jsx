import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React from "react";
import { router } from "expo-router";
// onPress={() => router.push(`/businessdetail/${business.id}`)}
export default function BusinessListCard({ business }) {
  return (
    <ScrollView>
      <View style={styles.card}>
        <View style={styles.container}>
          {/* ----------IMAGE------------ */}
          <Image source={{ uri: business.imageUrl }} style={styles.image} />
          {/* ----------- CONTENT--------- */}
          <View style={styles.content}>
            <Text style={styles.name}>{business.name}</Text>
            <Text style={styles.address}>{business.address}</Text>
            <Text style={styles.about}>{business.about}</Text>
            <View style={styles.ratingContainer}>
              <Image
                source={require("../../assets/images/star.png")}
                style={styles.starImage}
              />
              <Text style={styles.ratingText}>{business.rating || "4.4"}</Text>
            </View>
          </View>
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
  address: {
    fontSize: 14,
    color: "#777",
    marginBottom: 5,
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
