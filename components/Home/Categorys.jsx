import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { collection, getDocs, query } from "firebase/firestore";
import CategoryItem from "./CategoryItem";
import { db } from "../../configs/FirebaseConfig";
import { useRouter } from "expo-router";

export default function Categorys() {
  const [categoryList, setCategoryList] = useState([]);
  const router = useRouter();

  useEffect(() => {
    GetCategoryList();
  }, []);

  const GetCategoryList = async () => {
    try {
      const q = query(collection(db, "Category"));
      const querySnapshot = await getDocs(q);
      const categories = querySnapshot.docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
      });
      setCategoryList(categories);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleCategoryPress = (category) => {
    router.push(`/businesslist/${category.name}`);
  };

  return (
    <View>
      <View
        style={{
          padding: 20,
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

      <View style={{ padding: 10 }}>
        <FlatList
          data={categoryList}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <CategoryItem
              category={item}
              onCategoryPress={handleCategoryPress}
            />
          )}
          keyExtractor={(item) => item.id}
        />
      </View>
    </View>
  );
}
