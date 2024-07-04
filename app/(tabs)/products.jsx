import { View, Text } from "react-native";
import React from "react";

import { ScrollView } from "react-native";
import ProductContainer from "../../components/Products/Poduct";
import LoginScreen from "../../components/LoginScreen";

export default function products() {
  return (
    <ScrollView>
      <LoginScreen></LoginScreen>
      <ProductContainer></ProductContainer>
      <View style={{ height: 100 }}></View>
    </ScrollView>
  );
}
