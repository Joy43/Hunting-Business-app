import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { collection, getDocs, query } from "firebase/firestore";

import CategoryItem from "./CategoryItem";
import { db } from "../../configs/FirebaseConfig";

export default function Categorys() {
  const [categoryList, setCategoryList] = useState([]);

  useEffect(() => {
    GetCategoryList();
  }, []);

  const GetCategoryList = async () => {
    const q = query(collection(db, "Category"));
    const querySnapshot = await getDocs(q);
    const categories = querySnapshot.docs.map((doc) => doc.data());
    setCategoryList(categories);
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
          Category
        </Text>
        <Text style={{ fontFamily: "outfit-bold", color: "blue" }}>
          View All
        </Text>
      </View>

      {/* ----------category data load------------- */}

      <View style={{ display: "flex", gap: 10 }}>
        <FlatList
          data={categoryList}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={{ marginLeft: 20, gap: 10 }}
          renderItem={({ item, index }) => (
            <CategoryItem category={item} key={index} />
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </View>
  );
}
