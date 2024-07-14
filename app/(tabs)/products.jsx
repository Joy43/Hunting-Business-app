import { View, Text } from "react-native";
import React from "react";

import { ScrollView } from "react-native";
import ProductContainer from "../../components/Products/Poduct";
import CustomSwiper from "../../components/Products/CustomSwiper";






export default function products() {
  return (
    <ScrollView>
      <View style={{ height: 100 }}></View>
<CustomSwiper></CustomSwiper>
      <ProductContainer></ProductContainer>
      <View style={{ height: 100 }}></View>
    </ScrollView>
  );
}
