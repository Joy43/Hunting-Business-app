import { Image, Text, View, StyleSheet, Button } from "react-native";
import React from "react";

export default function PopularBusiness({ business }) {
  return (
    <View style={styles.card}>
      <Image source={{ uri: business?.imageUrl }} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.name}>{business.name}</Text>
        <Text style={styles.about} numberOfLines={2} ellipsizeMode="tail">
          {business.about}
        </Text>
      </View>
      {/* -------------rating and category----- */}
      <View className="flex justify-around">
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 4,
            alignItems: "center",
          }}
        >
          <Image
            source={require("../../assets/images/star.png")}
            style={{ width: 14, height: 14 }}
          />
          <Text>4.4</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    margin: 10,
    width: 220,
    padding: 10,
  },
  image: {
    width: "100%",
    height: 150,
  },
  textContainer: {
    padding: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  about: {
    fontSize: 14,
    color: "#555",
  },
});
