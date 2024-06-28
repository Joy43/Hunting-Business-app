// src/layouts/RootLayout.js
import React, { useContext, useState } from "react";
import { ActivityIndicator, View, Button, ScrollView } from "react-native";
import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import AuthProvider, { AuthContext } from "../app/authprovider/AuthProvider";

import Signup from "./(auth)/signup";

import Signin from "./(auth)/signin";

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    outfit: require("../assets/fonts/Outfit-Regular.ttf"),
    "outfit-medium": require("../assets/fonts/Outfit-Bold.ttf"),
    "outfit-bold": require("../assets/fonts/Outfit-ExtraBold.ttf"),
  });

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <AuthProvider>
      <AppNavigator />
    </AuthProvider>
  );
}

const AppNavigator = () => {
  const { user, loading } = useContext(AuthContext);
  const [isSignup, setIsSignup] = useState(true);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (user) {
    return (
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
      </Stack>
    );
  }

  return (
    <ScrollView style={{marginBottom:10}}>
      {isSignup ? <Signup /> : <Signin />}
      <Button
        title={
          isSignup
            ? "Already have an account? Sign in"
            : "Don't have an account? Sign up"
        }
        onPress={() => setIsSignup(!isSignup)}
      />
    </ScrollView>
  );
};
