import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { collection, doc, getDocs, query } from "firebase/firestore";

import { db } from "../../configs/FirebaseConfig";
import CategoryItem from "./CategoryItem";

export default function Categorys() {
  const [categoryList, setcategoryList] = useState([]);
  useEffect(() => {
    GetCategoryList();
  }, []);

  const GetCategoryList = async () => {
    const q = query(collection(db, "Category"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      console.log(doc.data());
      setcategoryList((prev) => [...prev, doc.data()]);
    });
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
            marginTop: 10,
            fontSize: 20,
            fontFamily: "outfit-bold",
            marginTop: 10,
          }}
        >
          Category
        </Text>
        <Text>View All</Text>
      </View>
      <FlatList>
        data={categoryList}
        renderItem=
        {({ item, index }) => (
          <CategoryItem category={item} key={index}></CategoryItem>
        )}
      </FlatList>
    </View>
  );
}
