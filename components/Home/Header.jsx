import { View, Text, TextInput, Image, StyleSheet } from "react-native";
import React, { useContext } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { AuthContext } from "../../app/authprovider/AuthProvider";
// import defaultimg from "../../assets/images/joy.png";

export default function Header() {
  const { user } = useContext(AuthContext);

  return (
    <View style={styles.header}>
      <Text style={styles.welcomeText}>Welcome to</Text>

      {/* ----------- Profile Section ------------*/}
      <View style={styles.profileContainer}>
        <Image
          source={{ uri: user?.photoURL || "https://via.placeholder.com/150" }}
          style={styles.profileImage}
          resizeMode="cover"
        />
        <Text style={styles.userName}>{user.displayName}</Text>
      </View>

      {/*----------- Search Bar----------- */}
      <View style={styles.searchContainer}>
        <FontAwesome name="search" size={20} color="#888" />
        <TextInput placeholder="Search..." style={styles.searchInput} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    padding: 20,
    paddingTop: 40,
    backgroundColor: "#1E90FF",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  welcomeText: {
    textAlign: "center",
    color: "white",
    fontFamily: "outfit-bold",
    fontSize: 18,
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: "#fff",
  },
  userName: {
    marginLeft: 10,
    color: "#fff",
    fontSize: 18,
    fontFamily: "outfit",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 10,
    marginTop: 15,
    borderRadius: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  searchInput: {
    fontFamily: "outfit",
    fontSize: 16,
    marginLeft: 10,
    flex: 1,
    color: "#333",
  },
});
