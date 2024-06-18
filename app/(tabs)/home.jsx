import { View, Text, ScrollView } from "react-native";
import React from "react";

// import LoginScreen from "../../components/LoginScreen";

import Header from "../../components/Home/Header";
import Slider from "../../components/Home/Slider";
import Categorys from "../../components/Home/Categorys";
import Businesslist from "../../components/Home/Businesslist";

export default function home() {
  return (
    <ScrollView>
      <Header></Header>
      <Slider></Slider>
      <Categorys></Categorys>
      <Businesslist></Businesslist>
    </ScrollView>
  );
}
