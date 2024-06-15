import { View, Image } from "react-native";
import React from "react";
import { renderer } from "react-test-renderer";

export default function LoginScreen() {
  return (
    <View>
      <View
        View
        style={{
          display: "flex",
          alignItems: "center",
          marginTop: 100,
        }}
      >
        <Image
          source={require("./../assets/images/login.png")}
          style={{
            width: 220,
            height: 450,
            borderRadius: 20,
            borderLeftWidth: 6,

            borderColor: "#000",
          }}
        ></Image>
      </View>
    </View>
  );
}
