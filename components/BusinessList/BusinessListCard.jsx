import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";

export default function BusinessListCard({ business }) {
  return (
    <View style={styles.card}>
      <Image source={{ uri: business.imageUrl }} style={styles.image} />
      <Text style={styles.name}>{business.name}</Text>
      {business.description && (
        <Text style={styles.description}>{business.description}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 10,
    margin: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 1,
    elevation: 2,
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
  },
  description: {
    fontSize: 14,
    color: "#666",
    marginTop: 5,
  },
});
