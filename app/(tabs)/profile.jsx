import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { ScrollView } from "react-native";
import Intoprofile from "../../components/profile/intoprofile";

export default function profile() {
  return (
    <ScrollView>
      <View style={styles.container}>
        <Intoprofile></Intoprofile>
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f2f2f2",
    margin: 10,
    shadowRadius: 10,
    shadowColor: "blue",
  },
});
