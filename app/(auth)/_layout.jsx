import React from "react";
import { Stack } from "expo-router";

const PublicLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: "#6c47ff",
        },
        headerTintColor: "#fff",
        headerBackTitle: "Back",
      }}
    >
      <Stack.Screen
        name="signin"
        options={{
          headerTitle: "Login Now",
        }}
      />
      <Stack.Screen
        name="signup"
        options={{
          headerTitle: "Create Account",
        }}
      />
    </Stack>
  );
};

export default PublicLayout;
