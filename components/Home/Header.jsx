import { View, Text, TextInput } from "react-native";
import React from "react";
// import { Image } from "react-native-web";
//  import { useUser } from "@clerk/clerk-expo";
// import { SearchBar } from 'react-native-elements';
import { FontAwesome } from "@expo/vector-icons";
import { Link } from "expo-router";

export default function Header() {
  // const { user } = useUser();

  return (
    <View
      style={{
        padding: 20,
        paddingTop: 40,
        backgroundColor:'blue'
      }}
    >
      {/* --------sign up----------- */}

      {/* <Link href="/login">
        <Text>Sign up</Text>
      </Link> */}

      <View
        style={{
          display: "flex",
          flexDirection: "row",
          gap: 10,
          display: "inline-flex",
          alignItems: "center",
          backgroundColor: "#fff",
          padding: 10,
          marginTop: 15,
          marginVertical: 10,
          borderBottomRightRadius: 20,
        }}
      >
        <FontAwesome name="search" size={24} color="black" />
        <TextInput
          placeholder="Search......."
          style={{ fontFamily: "outfit", fontSize: 16 }}
        ></TextInput>
      </View>
    </View>
  );
}
