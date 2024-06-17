import { View, Text } from "react-native";
import React from "react";

// import LoginScreen from "../../components/LoginScreen";

import Header from "../../components/Home/Header";
import Slider from "../../components/Home/Slider";
import Categorys from "../../components/Home/Categorys";

export default function home() {
  return (
    <View>
      <Header></Header>
      <Slider></Slider>
      <Categorys></Categorys>
    </View>
  );
}
