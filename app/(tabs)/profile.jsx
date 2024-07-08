import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import Intoprofile from "../../components/profile/intoprofile";
import MenuList from "../../components/profile/MenuList";

export default function Profile() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(
          "https://server-hunting-business.vercel.app/user"
        );
        const data = await response.json();
        setUsers(data);
        setLoading(false); // Set loading to false once data is fetched
        console.log("Fetched user data:", data);
      } catch (error) {
        setLoading(false);
        setError("Error fetching data");
        console.error("Error fetching data:", error);
      }
    };

    fetchUserData();
  }, []);

  const hasRole = users.some((user) => user.role);

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <ScrollView>
      <View style={styles.profileContainer}>
        <Intoprofile />
      </View>
      {hasRole ? <MenuList /> : <Text>No Admin available</Text>}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  errorText: {
    color: "red",
    fontSize: 16,
    textAlign: "center",
  },
  profileContainer: {
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
  },
});
