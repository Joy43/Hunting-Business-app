import React, { useContext, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import Toast from "react-native-toast-message";
import { AuthContext } from "./../authprovider/AuthProvider";

const image_hosting_key = "66636ce87626845ca56075b8019b545b";
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

export default function Signup() {
  const { createUser, updateUserProfile } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [imageURL, setImageURL] = useState("");
  const [error, setError] = useState("");

  const handleImageUpload = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const source = { uri: result.assets[0].uri };
      setImage(source.uri);

      const formData = new FormData();
      formData.append("image", {
        uri: source.uri,
        type: result.assets[0].type,
        name: result.assets[0].fileName,
      });

      axios
        .post(image_hosting_api, formData)
        .then((response) => {
          setImageURL(response.data.data.url);
          Toast.show({
            type: "success",
            text1: "Image Upload",
            text2: "Image upload successful",
          });
        })
        .catch((error) => {
          console.error("Error uploading image:", error);
          Toast.show({
            type: "error",
            text1: "Image Upload",
            text2: "Failed to upload image. Please try again.",
          });
        });
    }
  };

  const handleSignup = async () => {
    setError("");
    try {
      const result = await createUser(email, password);
      const loggedUser = result.user;
      await updateUserProfile(name, imageURL);
      const userInfo = {
        name,
        email,
        photoURL: imageURL,
      };
      Toast.show({
        type: "success",
        text1: "Signup Success",
        text2: "Account created successfully! 👋",
      });
    } catch (err) {
      setError(err.message);
      Toast.show({
        type: "error",
        text1: "Signup Error",
        text2: err.message,
      });
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.topContainer}>
        <Image
          source={require("../../assets/images/into.gif")}
          style={styles.image}
        />
      </View>
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={name}
          onChangeText={setName}
        />
        <TouchableOpacity
          style={styles.imageUploadButton}
          onPress={handleImageUpload}
        >
          <Text style={styles.buttonText}>Upload Image</Text>
        </TouchableOpacity>
        {image && (
          <Image source={{ uri: image }} style={styles.selectedImage} />
        )}
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        {error ? <Text style={styles.error}>{error}</Text> : null}
        <TouchableOpacity style={styles.button} onPress={handleSignup}>
          <Text style={styles.buttonText}>Signup</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#f9fafd",
    paddingVertical: 10,
    paddingHorizontal: 10,
    margin: 10,
    shadowRadius: 10,
    shadowColor: "blue",
  },
  topContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  formContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 20,
    borderRadius: 8,
    backgroundColor: "#fff",
  },
  error: {
    color: "red",
    marginBottom: 20,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#1e90ff",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  imageUploadButton: {
    backgroundColor: "#1e90ff",
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
    alignItems: "center",
  },
  image: {
    width: 400,
    height: 400,
    resizeMode: "cover",
    marginBottom: 20,
    borderRadius: 10,
  },
  selectedImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: "center",
    marginBottom: 20,
  },
});
