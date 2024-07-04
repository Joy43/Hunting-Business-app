import React, { useEffect, useState } from "react";
import { View } from "react-native";
import ProductCard from "./ProductCard";

export default function ProductContainer() {
  const [productData, setProductData] = useState([]);

  useEffect(() => {
    fetch("https://server-hunting-business.vercel.app/product")
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched product data:", data);
        setProductData(data);
      })
      .catch((error) => console.error("Error fetching product data:", error));
  }, []);

  return (
    <View>
      <ProductCard productData={productData} />
    </View>
  );
}
