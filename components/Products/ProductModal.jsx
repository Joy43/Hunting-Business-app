import React, { useState, useEffect } from "react";
import { View, Text, Image, TextInput, TouchableOpacity, Modal, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

export default function ProductModal({ visible, onClose, product, onSubmit }) {
  const [formData, setFormData] = useState({
    name: "",
    quantity: 1,
    email: "",
    phoneNumber: "",
  });

  useEffect(() => {
    if (product) {
      setFormData({ ...formData, name: product.name });
    }
  }, [product]);

  const handleSubmit = () => {
    if (!formData.email || !formData.phoneNumber) {
      alert("Please fill in all required fields.");
      return;
    }
    onSubmit(formData);
    onClose();
  };

  return (
    <Modal animationType="slide" transparent={true} visible={visible} onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Icon name="close" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          {product && (
            <View style={styles.productContainer}>
              <Image style={styles.modalImage} source={{ uri: product.imageUrl }} resizeMode="contain" />
              <Text style={styles.modalTitle}>{product.name}</Text>
              <Text style={styles.modalPrice}>${product.prize}</Text>
              <Text>{product.textarea}</Text>
            </View>
          )}
          <Text style={styles.sectionTitle}>Enter Order Details</Text>
          <TextInput
            style={styles.input}
            placeholder="Name"
            value={formData.name}
            onChangeText={(text) => setFormData({ ...formData, name: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={formData.email}
            onChangeText={(text) => setFormData({ ...formData, email: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Phone Number"
            keyboardType="phone-pad"
            value={formData.phoneNumber}
            onChangeText={(text) => setFormData({ ...formData, phoneNumber: text })}
          />
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    paddingHorizontal: 20,
  },
  modalContent: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    padding: 20,
    width: "100%",
    maxWidth: 600,
    position: "relative",
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "#FF5A5F",
    borderRadius: 50,
    padding: 5,
  },
  productContainer: {
    alignItems: "center",
  },
  modalImage: {
    width: "100%",
    height: 150,
    borderRadius: 8,
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1F2937",
    marginBottom: 8,
  },
  modalPrice: {
    fontSize: 20,
    fontWeight: "600",
    color: "#4B5563",
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#1F2937",
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    padding: 10,
    marginBottom: 16,
  },
  submitButton: {
    backgroundColor: "#4CAF50",
    borderRadius: 4,
    padding: 10,
    alignItems: "center",
  },
  submitButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});
