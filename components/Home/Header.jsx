import { View, Text } from "react-native";
import React from "react";
import { Image } from "react-native-web";
import { useUser } from "@clerk/clerk-expo";

export default function Header() {
  const { user } = useUser();
  return (
    <View>
      <View>
        <Image
          source={{ uri: user?.imageUrl }}
          style={{
            width: 45,
            height: 45,
            boderRadius: 90,
          }}
        ></Image>
      </View>
    </View>
  );
}
