import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";

const imageHostingApi =
  "https://api.imgbb.com/1/upload?key=9d48573c2a9818e58066067ce937065f";

const AddProductCard = () => {
  const [previewImage, setPreviewImage] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    prize: "",
    category: "",
    date: "",
    textarea: "",
    imageUrl: "",
  });

  const categories = ["Electronics", "Mobile", "Tv"];

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      const localUri = result.assets[0].uri;
      setPreviewImage(localUri);
      uploadImage(localUri);
    }
  };

  const uploadImage = async (uri) => {
    const formData = new FormData();
    formData.append("image", {
      uri,
      name: "photo.jpg",
      type: "image/jpeg",
    });

    try {
      const response = await axios.post(imageHostingApi, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      const imageUrl = response.data.data.display_url;
      setFormData((prevData) => ({
        ...prevData,
        imageUrl,
      }));
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const handleInputChange = (key, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  const handleFormSubmit = async () => {
    try {
      const response = await axios.post(
        "https://server-hunting-business.vercel.app/product",
        formData
      );

      if (response.status === 200) {
        alert("Upload successful");
      } else {
        alert("Something went wrong");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.flexInput}>
          <Text style={styles.label}>Name</Text>
          <TextInput
            placeholder="Name"
            value={formData.name}
            onChangeText={(value) => handleInputChange("name", value)}
            style={styles.input}
          />
        </View>

        <View style={styles.flexInput}>
          <Text style={styles.label}>prize</Text>
          <TextInput
            placeholder="$3"
            value={formData.prize}
            onChangeText={(value) => handleInputChange("prize", value)}
            style={styles.input}
          />
        </View>
      </View>

      <Text style={styles.label}>Category</Text>
      <View style={styles.row}>
        {categories.map((category, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.categoryButton,
              formData.category === category && styles.selectedCategory,
            ]}
            onPress={() => handleInputChange("category", category)}
          >
            <Text
              style={[
                styles.categoryText,
                formData.category === category && styles.selectedCategoryText,
              ]}
            >
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.row}>
        <View style={styles.flexInput}>
          <Text style={styles.label}>Date</Text>
          <TextInput
            placeholder="YYYY-MM-DD"
            value={formData.date}
            onChangeText={(value) => handleInputChange("date", value)}
            style={styles.input}
          />
        </View>

        <View style={styles.flexInput}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            placeholder="Description"
            value={formData.textarea}
            onChangeText={(value) => handleInputChange("textarea", value)}
            style={styles.input}
          />
        </View>
      </View>

      <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
        <Ionicons name="image" size={24} color="blue" />
        <Text style={styles.imagePickerText}>Upload Image</Text>
      </TouchableOpacity>

      {previewImage ? (
        <Image source={{ uri: previewImage }} style={styles.imagePreview} />
      ) : null}

      <Button title="Submit" onPress={handleFormSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    margin: 10,
    marginTop: 20,
    paddingLeft: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  flexInput: {
    flex: 1,
    marginRight: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  input: {
    borderBottomWidth: 1,
    borderColor: "#ccc",
    padding: 8,
  },
  categoryButton: {
    padding: 10,
    margin: 5,
    borderRadius: 5,
    backgroundColor: "#f0f0f0",
  },
  selectedCategory: {
    backgroundColor: "#007bff",
  },
  categoryText: {
    color: "#000",
  },
  selectedCategoryText: {
    color: "#fff",
  },
  imagePicker: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  imagePickerText: {
    color: "blue",
    marginLeft: 5,
  },
  imagePreview: {
    width: 100,
    height: 100,
    marginBottom: 15,
  },
});

export default AddProductCard;
