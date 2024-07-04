import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Linking,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import Icon from "react-native-vector-icons/FontAwesome";

export default function OrderCart() {
  const [orderData, setOrderData] = useState([]);

  useEffect(() => {
    fetch("https://server-hunting-business.vercel.app/addcart")
      .then((res) => res.json())
      .then((data) => setOrderData(data));
  }, []);

  const handleEmailPress = (email) => {
    Linking.openURL(`mailto:${email}`);
  };

  const handlePhonePress = (phoneNumber) => {
    Linking.openURL(`tel:${phoneNumber}`);
  };

  const handleDelete = (id) => {
    fetch(`https://server-hunting-business.vercel.app/addcart/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "Order deleted successfully") {
          setOrderData(orderData.filter((item) => item._id !== id));
        } else {
          console.error("Error deleting order:", data.message);
        }
      })
      .catch((error) => console.error("Error deleting order:", error));
  };

  const renderItem = ({ item }) => (
    <ScrollView>
      <View style={styles.card}>
        <View style={styles.cardContent}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-around" }}
          >
            <Text style={styles.cardTitle}>{item.name}</Text>
            <View style={{ flexDirection: "row", gap: 6 }}>
              <Icon name="trash" size={20} color="#FF0000" />
              <Text style={styles.cardText}>Delete</Text>
            </View>
          </View>
          <Text style={styles.cardText}>Quantity: {item.quantity}</Text>

          <View style={styles.iconRow}>
            <TouchableOpacity
              onPress={() => handleEmailPress(item.email)}
              style={styles.iconButton}
            >
              <View style={{ flexDirection: "row", gap: 6 }}>
                <Icon name="envelope" size={20} color="#4CAF50" />
                <Text style={styles.cardText}>{item.email}</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handlePhonePress(item.phoneNumber)}
              style={styles.iconButton}
            >
              <View style={{ flexDirection: "row", gap: 6 }}>
                <Icon name="phone" size={20} color="#4CAF50" />
                <Text style={styles.cardText}>{item.phoneNumber}</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleDelete(item._id)}
              style={styles.iconButton}
            ></TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={orderData}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    padding: 10,
    margin: 10,
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 10,
    marginVertical: 10,
    marginHorizontal: 10,
    borderRadius: 15,
    shadowColor: "#000",
    height: 150,
    width: 350,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  icon: {
    marginRight: 20,
  },
  cardContent: {
    flex: 1,
    justifyContent: "center",
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  cardText: {
    fontSize: 16,
    color: "#666",
  },
  iconRow: {
    flexDirection: "row",
    marginTop: 10,
    justifyContent: "space-between",
    gap: 6,
  },
  iconButton: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 10,
  },
});
