// SplashScreen.js
import React from "react";
import { View, StyleSheet } from "react-native";
import LottieView from "lottie-react-native";

const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <LottieView source={require("../assets/splash.json")} autoPlay loop  style={{width:400}}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default SplashScreen;
