import { View, Text, FlatList } from 'react-native';
import { useEffect, useState } from 'react';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../configs/FirebaseConfig';
import BusinessListCard from '../../components/BusinessList/BusinessListCard';

export default function BusinessListByCategory() {
    const navigation = useNavigation();
    const { category } = useLocalSearchParams();
    const [businessList, setBusinessList] = useState([]);

    useEffect(() => {
        navigation.setOptions({
            headerShown: true,
            headerTitle: category,
        });
        getBusinessList();
    }, [category]);

    const getBusinessList = async () => {
        try {
            const q = query(collection(db, 'BusinessList'), where('category', '==', category));
            const querySnapshot = await getDocs(q);
            const businesses = querySnapshot.docs.map((doc) => doc.data());
            setBusinessList(businesses);
        } catch (error) {
            console.error("Error fetching business list:", error);
        }
    };

    return (
        <View>
            <FlatList
                data={businessList}
                renderItem={({ item }) => (
                    <BusinessListCard business={item} />
                )}
                keyExtractor={(item, index) => index.toString()}
            />
        </View>
    );
}
