import { View, Text, Image } from "react-native";
import React from "react";

export default function CategoryItem({ category }) {
  console.log(category);
  return (
    <View>
      <View
        style={{
          padding: 15,
          backgroundColor: "#fff",
          borderRadius: 99,
          marginRight: 15,
        }}
      >
        <Image source={{ uri: category.icon }}></Image>
      </View>
      <Text>{category.name}</Text>
    </View>
  );
}
