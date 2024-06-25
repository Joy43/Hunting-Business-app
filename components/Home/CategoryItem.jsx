import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";

export default function CategoryItem({ category, onCategoryPress }) {
  return (
    <TouchableOpacity
      onPress={() => onCategoryPress(category)}
      style={styles.cardContainer}
    >
      <View style={styles.imageContainer}>
        <Image source={{ uri: category.icon }} style={styles.categoryImage} />
      </View>
      <Text style={styles.categoryText}>{category.name}</Text>
    </TouchableOpacity>
  );
}

const styles = {
  cardContainer: {
    alignItems: "center",
    marginRight: 20,
    marginBottom: 20,
  },
  imageContainer: {
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 50,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  categoryImage: {
    width: 50,
    height: 50,
  },
  categoryText: {
    fontFamily: "Outfit",
    fontSize: 16,
    textAlign: "center",
    marginTop: 10,
    color: "#333",
  },
};
