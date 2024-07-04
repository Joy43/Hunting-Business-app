import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import ProductModal from "./ProductModal";
import { LinearGradient } from "expo-linear-gradient";

export default function ProductCard({ productData }) {
  const [userRating, setUserRating] = useState(1);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleAddToCart = (product) => {
    setSelectedProduct(product);
    setModalVisible(true);
  };

  const handleModalSubmit = (formData) => {
    fetch("https://server-hunting-business.vercel.app/addcart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: selectedProduct.name,
        quantity: formData.quantity,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        alert("Order placed successfully!");
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Failed to place order. Please try again.");
      });
  };

  const renderItem = ({ item: product }) => (
    <TouchableOpacity
      key={product._id}
      style={styles.card}
      onPress={() => handleAddToCart(product)}
    >
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={{ uri: product.imageUrl }}
          resizeMode="contain"
        />
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>{product.name}</Text>
        <View style={styles.rating}>
          {[1, 2, 3, 4, 5].map((star) => (
            <TouchableOpacity key={star} onPress={() => setUserRating(star)}>
              <MaterialIcons
                name={star <= userRating ? "star" : "star-border"}
                size={28}
                color={star <= userRating ? "#FFD700" : "#D3D3D3"}
              />
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.footer}>
          <Text style={styles.price}>${product.prize}</Text>
          <TouchableOpacity onPress={() => handleAddToCart(product)}>
            <LinearGradient
              colors={["#4c669f", "#3b5998", "#192f6a"]}
              style={styles.addToCartButton}
            >
              <Text style={styles.addToCartText}>Add to Cart</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={productData}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.list}
      />
      <ProductModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        product={selectedProduct}
        onSubmit={handleModalSubmit}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    paddingHorizontal: 16,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    shadowColor: "#0000FF",
    shadowOpacity: 0.7,
    shadowRadius: 10,
    elevation: 5,
    marginRight: 20,
    width: 300,
    margin: 5,
  },
  imageContainer: {
    width: "100%",
    height: 200,
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 16,
    backgroundColor: "#F1F5F9",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  content: {
    paddingHorizontal: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    color: "#1F2937",
    marginBottom: 12,
  },
  rating: {
    flexDirection: "row",
    marginBottom: 16,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  price: {
    fontSize: 20,
    fontWeight: "600",
    color: "#4B5563",
  },
  addToCartButton: {
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  addToCartText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
    textAlign: "center",
  },
});
