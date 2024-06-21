import { View, Text, FlatList, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../../configs/FirebaseConfig";

export default function Slider() {
  // Initialize as an empty array
  const [SliderList, SetSliderList] = useState([]);

  useEffect(() => {
    GetSliderList();
  }, []);

  const GetSliderList = async () => {
    const q = query(collection(db, "Slider"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      console.log(doc.data());
      // Spread the previous state safely
      SetSliderList((prev) => [...prev, doc.data()]);
    });
  };

  return (
    <View>
      <Text
        style={{
          fontFamily: "outfit-bold",
          fontSize: 20,
          padding: 20,
          paddingLeft: 20,
          marginBottom: 5,
        }}
      >
        #Special for you
      </Text>
      {/* ---------flat list- */}
      <FlatList
        style={{ paddingLeft: 20 }}
        data={SliderList}
        horizontal={true}
        renderItem={({ item }) => (
          <Image
            source={{ uri: item.imageUrl }}
            style={{
              width: 300,
              height: 200,
              borderRadius: 15,
              marginRight: 15,
              padding: 20,
              objectFit: "cover",
            }}
          />
        )}
        // Add a key extractor for FlatList
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}
