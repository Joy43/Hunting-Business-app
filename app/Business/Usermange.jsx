import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
  StyleSheet,
  Image,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

export default function UserManage() {
  const [usersData, setUsersData] = useState([]);

  useEffect(() => {
    fetch("https://server-hunting-business.vercel.app/user")
      .then((res) => res.json())
      .then((data) => setUsersData(data))
      .catch((error) => {
        console.error("Error fetching users:", error);
        Alert.alert("Error", "Failed to fetch users. Please try again later.");
      });
  }, []);

  const handleMakeAdmin = (user) => {
    console.log("Making user admin:", user);
    // Example: Update user role via API call
  };

  const handleDeleteUser = (user) => {
    console.log("Deleting user:", user);
    // Example: Delete user via API call
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Total Users: {usersData.length}</Text>
        </View>
        <ScrollView horizontal={true}>
          <View>
            <View style={styles.tableRow}>
              <Text style={[styles.tableHeader, { flex: 0.1 }]}>#</Text>
              <Text style={[styles.tableHeader, { flex: 0.2 }]}>Photo</Text>
              <Text style={[styles.tableHeader, { flex: 0.3 }]}>Name</Text>
              <Text style={[styles.tableHeader, { flex: 0.3 }]}>Email</Text>
              <Text style={[styles.tableHeader, { flex: 0.2 }]}>Edit</Text>
              <Text style={[styles.tableHeader, { flex: 0.2 }]}>Actions</Text>
            </View>
            {usersData.map((user, index) => (
              <View key={user._id} style={styles.tableRow}>
                <Text style={[styles.tableCell, { flex: 0.1 }]}>
                  {index + 1}
                </Text>
                <View style={{ flex: 0.2 }}>
                  <Image
                    source={{ uri: user.photoURL }}
                    style={styles.userPhoto}
                  />
                </View>
                <Text style={[styles.tableCell, { flex: 0.3 }]}>
                  {user.displayName}
                </Text>
                <Text style={[styles.tableCell, { flex: 0.3 }]}>
                  {user.email}
                </Text>
                <View style={{ flex: 0.2 }}>
                  {user.isAdmin ? (
                    <Text style={styles.adminText}>Admin</Text>
                  ) : (
                    <TouchableOpacity
                      onPress={() => handleMakeAdmin(user)}
                      style={styles.iconButton}
                    >
                      <Icon name="edit" size={24} color="#f57c00" />
                    </TouchableOpacity>
                  )}
                </View>
                <TouchableOpacity
                  onPress={() => handleDeleteUser(user)}
                  style={[styles.iconButton, { marginLeft: 10 }]}
                >
                  <Icon name="delete" size={24} color="#ef5350" />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    paddingHorizontal: 20,
    paddingTop: 20,
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  tableRow: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingVertical: 10,
  },
  tableHeader: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#555",
    textAlign: "center",
  },
  tableCell: {
    fontSize: 16,
    textAlign: "center",
    color: "#333",
  },
  userPhoto: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  iconButton: {
    padding: 8,
  },
  adminText: {
    textAlign: "center",
    color: "#388e3c",
    fontWeight: "bold",
  },
});
