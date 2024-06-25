import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React from "react";
import { Rating, AirbnbRating } from "react-native-ratings";
import { useState } from "react";
import { Colors } from "@/constants/Colors";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../configs/FirebaseConfig";
import { useUser } from "@clerk/clerk-expo";

export default function Reviews({ businesss }) {
  const [rating, setRating] = useState(4);
  const [Userinput, setUserinput] = useState();
  const { user } = useUser();
  const onSubmit = async () => {
    const docRef = doc(db, "BusinessList", businesss?.id);
    await updateDoc(docRef, {
      reviews: arrayUnion({
        rating: rating,
        commit: Userinput,
        userName: user?.fullName,
        userName: user?.imageUrl,
        userEmail: user?.primaryEmailAddress?.emailAddress,
      }),
    });
  };
  return (
    <View style={{ paddingg: 20, backgroundColor: "#fff", padding: 20 }}>
      <Text
        style={{ fontFamily: "outfit-bold", textAlign: "center", fontSize: 20 }}
      >
        Reviews
      </Text>

      <View>
        <Rating
          imageSize={20}
          showRating={false}
          onFinishRating={(rating) => setRating(rating)}
          style={{ paddingVertical: 10 }}
        />
        <TextInput
          numberOfLines={4}
          style={{
            textAlign: "center",
            borderWidth: 1,
            padding: 10,
            borderRadius: 10,
            borderBlockColor: "gray",
            textAlignVertical: "top",
          }}
          onChangeText={() => onSubmit()}
          placeholder="Write your commit"
        ></TextInput>
        <TouchableOpacity
          style={{
            padding: 10,
            backgroundColor: Colors.PRIMARY,
            justifyContent: "center",
            marginTop: 10,
            padding: 6,
            borderColor: "green",
            shadowColor: "yellow",
          }}
        >
          <Text
            style={{
              textAlign: "center",
              fontFamily: "outfit-bold",
              fontSize: 20,
              color: "white",
              padding: 2,
              borderColor: "blue",
            }}
          >
            Submit
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
