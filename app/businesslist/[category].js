import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../configs/FirebaseConfig';
import BusinessListCard from '../../components/BusinessList/BusinessListCard';
import { Colors } from '@/constants/Colors';
import LottieView from 'lottie-react-native';

export default function BusinessListByCategory() {
    const navigation = useNavigation();
    const { category } = useLocalSearchParams();
    const [businessList, setBusinessList] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        navigation.setOptions({
            headerShown: true,
            headerTitle: category,
        });
        getBusinessList();
    }, [category]);

    const getBusinessList = async () => {
        setLoading(true);
        try {
            const q = query(collection(db, 'BusinessList'), where('category', '==', category));
            const querySnapshot = await getDocs(q);
            const businesses = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
            setBusinessList(businesses);
        } catch (error) {
            console.error("Error fetching business list:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>{category}</Text>
            {businessList.length > 0 && !loading ? (
                <FlatList
                style={{gap:6}}
                    data={businessList}
                    onRefresh={getBusinessList}
                    refreshing={loading}
                    renderItem={({ item }) => <BusinessListCard business={item} />}
                    keyExtractor={(item) => item.id}
                />
            ) : loading ? (
                <ActivityIndicator size='large' color={Colors.Primary} style={styles.loadingIndicator} />
            ) : (
                <View style={styles.noDataContainer}>
                    <LottieView
                        source={require('../../assets/no-data-animation.json')}
                        autoPlay
                        loop
                        style={styles.lottieView}
                    />
                    <Text style={styles.noDataText}>No Business Found</Text>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    headerText: {
        textAlign: 'center',
        justifyContent: 'center',
        fontSize: 20,
        fontFamily: 'outfit-bold',
        marginVertical: 10,
        color: Colors.PRIMARY,
    },
    loadingIndicator: {
        marginTop: '20%',
    },
    noDataContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    lottieView: {
        width: 100,
        height: 100,
    },
    noDataText: {
        fontSize: 20,
        textAlign: 'center',
        marginTop: 20,
    },
});
