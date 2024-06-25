import { View, Text, FlatList, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../../configs/FirebaseConfig";
import { Marquee } from "@animatereactnative/marquee";

export default function Slider() {
  const [SliderList, SetSliderList] = useState([]);

  useEffect(() => {
    GetSliderList();
  }, []);

  const GetSliderList = async () => {
    const q = query(collection(db, "Slider"));
    const querySnapshot = await getDocs(q);
    const dataList = [];
    querySnapshot.forEach((doc) => {
      dataList.push(doc.data());
    });
    SetSliderList(dataList);
  };

  return (
    <View>
      <Text
        style={{
          fontFamily: "outfit-bold",
          fontSize: 20,
          padding: 20,
          marginBottom: 5,
        }}
      >
        #Special for you
      </Text>
      <Marquee spacing={20} speed={1}>
        <FlatList
          style={{ paddingLeft: 20 }}
          data={SliderList}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <Image
              source={{ uri: item.imageUrl }}
              style={{
                width: 300,
                height: 200,
                borderRadius: 15,
                marginRight: 15,
                objectFit: "cover",
              }}
            />
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </Marquee>
    </View>
  );
}
