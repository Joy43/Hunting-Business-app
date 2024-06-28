import React, { useContext } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { AuthContext } from "../../app/authprovider/AuthProvider";

export default function Intoprofile() {
  const { user, logOut } = useContext(AuthContext);

  const handleLogout = () => {
    logOut()
      .then(() => {})
      .catch((error) => console.error(error));
  };

  // Extract creationTime and lastSignInTime from user.metadata
  const creationTime = user?.metadata?.creationTime;
  const lastSignInTime = user?.metadata?.lastSignInTime;

  return (
    <View>
      <View style={styles.card}>
        <Image
          source={{ uri: user?.photoURL || "https://via.placeholder.com/150" }}
          style={styles.image}
        />
        <Text style={styles.name}>{user?.displayName || "No Name"}</Text>
        <Text style={styles.email}>{user?.email || "No Email"}</Text>
        <Text style={styles.creationTime}>
          <Text style={styles.boldText}> Account Created:</Text>{" "}
          {creationTime || "Unknown"}
        </Text>
        <Text style={styles.creationTime}>
          <Text style={styles.boldText}> Last Sign-In:</Text>{" "}
          {lastSignInTime || "Unknown"}
        </Text>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 320,
    padding: 25,
    backgroundColor: "#fff",
    borderRadius: 15,
    alignItems: "center",
    shadowColor: "blue",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 8,
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: "#d9d9d9",
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  email: {
    fontSize: 18,
    color: "#777",
    marginBottom: 15,
  },
  creationTime: {
    fontSize: 16,
    color: "#777",
    marginBottom: 5,
  },
  boldText: {
    fontFamily: "outfit-bold",
  },
  logoutButton: {
    backgroundColor: "#ff4d4d",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 20,
  },
  logoutButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
