import { View, Text } from "react-native";
import React from "react";

export default function Businesslist() {
  return (
    <View>
      <View
        style={{
          padding: 20,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontSize: 20,
            fontFamily: "outfit-bold",
            marginTop: 10,
          }}
        >
          Popular BusinessList
        </Text>
        <Text style={{ fontFamily: "outfit-bold", color: "blue" }}>
          View All
        </Text>
      </View>
    </View>
  );
}
