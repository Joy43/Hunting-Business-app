import React from "react";
import {
  View,
  Image,
  Text,
  StyleSheet,

  ScrollView,
} from "react-native";
import { Colors } from "@/constants/Colors";
import { Link } from "expo-router";

export default function LoginScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={require("./../assets/images/into.gif")}
          style={styles.image}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Link href="/signin" style={styles.button}>
          <Text style={styles.buttonText}>Sign In</Text>
        </Link>
        <Link href="/signup" style={styles.button}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </Link>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>
          Welcome to our community{" "}
          <Text style={{ color: Colors.PRIMARY }}>Business Hunting</Text>
        </Text>
        <Text style={styles.subtitle}>
          Find out the best amazing business and post latest business at moment
          for better way
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  imageContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  image: {
    width: 220,
    height: 450,
    borderRadius: 20,
    borderWidth: 6,
    borderColor: "black",
    shadowColor: "#000",
    shadowOpacity: 0.36,
    shadowRadius: 6.68,
    elevation: 11,
  },
  textContainer: {
    alignItems: "center",
    marginVertical: 20,
  },
  title: {
    textAlign: "center",
    color: "#000",
    fontSize: 30,
    fontFamily: "outfit-bold",
  },
  subtitle: {
    backgroundColor: "#fff",
    padding: 20,
    marginVertical: 15,
    fontSize: 18,
    fontFamily: "outfit",
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  button: {
    backgroundColor: Colors.PRIMARY,
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal: 10,
    shadowColor: "#2146C8",
    shadowOpacity: 0.36,
    shadowRadius: 6.68,
    elevation: 11,
    // te, // This line is removed
  },
  buttonText: {
    textAlign: "center",
    fontSize: 18,
    color: "#2146C8",
    fontFamily: "outfit",
  },
});
