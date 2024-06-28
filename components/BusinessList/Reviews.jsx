import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React, { useState, useContext } from "react";
import { Rating } from "react-native-ratings";
import { Colors } from "@/constants/Colors";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "../../configs/FirebaseConfig";
import { AuthContext } from "./../../app/authprovider/AuthProvider";

export default function Reviews({ businesss }) {
  const [rating, setRating] = useState(4);
  const [Userinput, setUserinput] = useState();
  const { user } = useContext(AuthContext);

  const onSubmit = async () => {
    const docRef = doc(db, "BusinessList", businesss?.id);
    await updateDoc(docRef, {
      reviews: arrayUnion({
        rating: rating,
        commit: Userinput,
        userName: user?.displayName,
        userImage: user?.photoURL,
        userEmail: user?.email,
      }),
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Reviews</Text>
      <View>
        <Rating
          imageSize={20}
          showRating={false}
          onFinishRating={(rating) => setRating(rating)}
          style={styles.rating}
        />
        <TextInput
          numberOfLines={4}
          style={styles.textInput}
          onChangeText={(text) => setUserinput(text)}
          placeholder="Write your commit"
        />
        <TouchableOpacity
          disabled={!Userinput}
          style={styles.button}
          onPress={onSubmit}
        >
          <Text style={styles.buttonText}>SUBMIT</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
  },
  headerText: {
    fontFamily: "outfit-bold",
    textAlign: "center",
    fontSize: 20,
  },
  rating: {
    paddingVertical: 10,
  },
  textInput: {
    textAlign: "center",
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    borderColor: "gray",
    textAlignVertical: "top",
  },
  button: {
    backgroundColor: "blue",
    borderRadius: 6,

    paddingVertical: 10,
    paddingHorizontal: 20,

    shadowColor: "#2146C8",
    marginTop: 10,

    shadowRadius: 6.68,
    elevation: 11,
    // te, // This line is removed
  },
  buttonText: {
    textAlign: "center",
    fontSize: 18,
    color: "#fff",
    fontFamily: "outfit-bold",
  },
});
