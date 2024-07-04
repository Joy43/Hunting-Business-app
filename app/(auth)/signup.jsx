import React, { useContext, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";

import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import { AuthContext } from "../authprovider/AuthProvider";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

const Signup = () => {
  const { createUser } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [image, setImage] = useState(null);
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // const image_hosting_key = "9d48573c2a9818e58066067ce937065f";
  const image_hosting_api =
    "https://api.imgbb.com/1/upload?key=9d48573c2a9818e58066067ce937065f";
  const defaultphotoURL = "https://i.ibb.co/p1WYkgs/avater.jpg";

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleRegister = async () => {
    let photoURL = defaultphotoURL;

    if (image) {
      const formData = new FormData();
      formData.append("image", {
        uri: image,
        name: "profile.jpg",
        type: "image/jpeg",
      });

      try {
        const imgResponse = await axios.post(image_hosting_api, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        photoURL = imgResponse.data.data.url;
      } catch (error) {
        console.error(
          "Image upload error: ",
          error.response ? error.response.data : error.message
        );
        alert("Error uploading image. Default image will be used.");
      }
    }

    try {
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      await updateProfile(user, {
        displayName: displayName,
        photoURL: photoURL,
      });

      console.log("Attempting to register user...");
      console.log({ uid: user.uid, displayName, email, photoURL });

      const response = await axios.post(
        "https://server-hunting-business.vercel.app/user",
        {
          uid: user.uid,
          displayName: displayName,
          email: email,
          password: password,
          photoURL: photoURL,
          isAdmin: false,
        }
      );

      console.log("Server response:", response.data);
      alert("Registration successful!");
    } catch (error) {
      console.error(
        "Registration error: ",
        error.response ? error.response.data : error.message
      );
      alert("Error during registration. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign up for an account</Text>
      <TouchableOpacity onPress={pickImage}>
        <Image
          source={
            image
              ? { uri: image }
              : require("../../assets/images/placeholder.png")
          }
          style={styles.image}
        />
      </TouchableOpacity>
      <TextInput
        placeholder="Display Name"
        style={styles.input}
        value={displayName}
        onChangeText={setDisplayName}
      />
      <TextInput
        placeholder="Email"
        style={styles.input}
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        placeholder="Password"
        style={styles.input}
        secureTextEntry={!showPassword}
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
        <Text>{showPassword ? "Hide" : "Show"}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    margin: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    color: "#6200ee",
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
    borderColor: "#ccc",
    borderWidth: 1,
  },
  input: {
    width: "80%",
    padding: 10,
    marginVertical: 10,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: "#f9f9f9",
  },
  button: {
    marginTop: 20,
    padding: 15,
    backgroundColor: "#6200ee",
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default Signup;
