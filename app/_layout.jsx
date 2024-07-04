import React, { useContext, useState } from "react";
import {
  ActivityIndicator,
  View,
  ScrollView,
  Text,
  TouchableOpacity,
} from "react-native";
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
    <ScrollView style={{ marginBottom: 10 }}>
      {isSignup ? <Signup /> : <Signin />}
      <TouchableOpacity
        style={{
          backgroundColor: "#007bff",
          paddingVertical: 12,
          paddingHorizontal: 24,
          borderRadius: 6,
          marginTop: 10,
          padding: 6,
        }}
        onPress={() => setIsSignup(!isSignup)}
      >
        <Text style={{ color: "#fff", textAlign: "center", fontSize: 16 }}>
          {isSignup
            ? "Already have an account? Sign in"
            : "Don't have an account? Sign up"}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};
