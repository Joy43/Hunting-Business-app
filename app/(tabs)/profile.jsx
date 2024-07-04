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
  const [adminUser, setAdminUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://server-hunting-business.vercel.app/user")
      .then((res) => res.json())
      .then((data) => {
        const admin = data.find((user) => user.isAdmin === true);
        setAdminUser(admin);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView>
      <View
        style={{ justifyContent: "center", alignItems: "center", margin: 10 }}
      >
        <Intoprofile />
      </View>
      {/* ---------Render MenuList only if adminUser exists and isAdmin is true ---------------*/}
      {adminUser && adminUser.isAdmin && <MenuList />}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
