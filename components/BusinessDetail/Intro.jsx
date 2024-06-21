import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";

export default function Intro({ business }) {
  console.log(business);
  return (
    <View>
      <Text>{business.name}</Text>
      <Image source={{ uri: business.imageUrl }} style={styles.image} />
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 300,
    height: 200,
    borderRadius: 15,
    marginTop: 20,
  },
});
