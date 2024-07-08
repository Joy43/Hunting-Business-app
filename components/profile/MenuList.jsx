import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React from "react";
import { useRouter } from "expo-router";

export default function MenuList() {
  const menuList = [
    {
      id: 1,
      name: "Add Product",
      Icon: require("../../assets/images/add.png"),
      path: "/Business/AddProductCard",
    },
    {
      id: 2,
      name: "Order List",
      Icon: require("../../assets/images/add.png"),
      path: "/Business/orderCart",
    },
    {
      id: 3,
      name: "Share App",
      Icon: require("../../assets/images/share.png"),
    },
    {
      id: 4,
      name: "User Manage",
      Icon: require("../../assets/images/share.png"),
      path: "/Business/Usermange",
    },
  ];
  const router = useRouter();

  return (
    <View style={styles.container}>
      <FlatList
        data={menuList}
        numColumns={2}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => router.push(item.path)}
            style={styles.itemContainer}
          >
            <Image source={item.Icon} style={styles.icon} />
            <Text style={styles.text}>{item.name}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  itemContainer: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    margin: 10,
    borderRadius: 15,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  icon: {
    width: 40,
    height: 40,
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    textAlign: "center",
    color: "#333",
  },
});
