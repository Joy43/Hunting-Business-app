import { View, Text } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Color, Colors } from "../../constants/Colors";
import { MaterialIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.PRIMARY,
        tabBarLabelStyle: { fontSize: 14 },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color }) => (
            <Ionicons name="home" size={26} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="products"
        options={{
          tabBarLabel: "Product",
          tabBarIcon: ({ color }) => (
            <Entypo name="shopping-cart" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ color }) => (
            <Ionicons name="people-circle" size={26} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="developer"
        options={{
          tabBarLabel: "About Developer",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="developer-mode" size={26} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
