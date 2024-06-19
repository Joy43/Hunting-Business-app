import React, { useEffect, useState } from "react";
import { collection, getDocs, limit, query } from "firebase/firestore";
import { db } from "../../configs/FirebaseConfig";
import { View, Text, FlatList } from "react-native";
import PopularBusiness from "./PopularBusiness";

export default function Businesslist() {
  const [businessList, setBusinessList] = useState([]);

  useEffect(() => {
    GetBusinessList();
  }, []);

  const GetBusinessList = async () => {
    const q = query(collection(db, "BusinessList"), limit(10));
    const querySnapShot = await getDocs(q);
    const businesses = [];
    querySnapShot.forEach((doc) => {
      console.log(doc.data());
      businesses.push(doc.data());
    });
    setBusinessList(businesses);
  };

  return (
    <View>
      <View
        style={{
          padding: 20,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontSize: 20,
            fontFamily: "outfit-bold",
            marginTop: 10,
          }}
        >
          Popular BusinessList
        </Text>
        <Text style={{ fontFamily: "outfit-bold", color: "blue" }}>
          View All
        </Text>
      </View>

      <FlatList
        data={businessList}
        horizontal={true}
        renderItem={({ item }) => (
          <PopularBusiness business={item}></PopularBusiness>
        )}
        keyExtractor={(item, index) => item.id || index.toString()}
      ></FlatList>
    </View>
  );
}
