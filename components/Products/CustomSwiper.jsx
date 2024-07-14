import React, { useState, useEffect, useRef } from 'react';
import { View, Image, TouchableOpacity, StyleSheet, Dimensions, Animated, Easing } from 'react-native';

const CustomSwiper = () => {
    const [currentSlider, setCurrentSlider] = useState(0);
    const { width: windowWidth } = Dimensions.get('window');
    const sliders = [
        'https://i.ibb.co/5BgbMDR/slider1.jpg',
        'https://i.ibb.co/L80z0Zd/slider2.jpg',
        'https://i.ibb.co/pWL9tLz/slider4.jpg',
        'https://i.ibb.co/NKZDBHP/slider5.jpg',
        'https://i.ibb.co/yQL9cL5/slider6.png',
        'https://i.ibb.co/HNPTpv5/slider7.jpg',
        'https://i.ibb.co/tZMHzmK/slider8.jpg',
        'https://i.ibb.co/6mL6NRP/slider3.jpg'
    ];

    const scrollX = useRef(new Animated.Value(0)).current;
    const intervalRef = useRef(null);

    const animateToNextSlider = () => {
        Animated.timing(scrollX, {
            toValue: (currentSlider + 1) * windowWidth,
            duration: 600,
            easing: Easing.ease,
            useNativeDriver: true
        }).start(() => {
            setCurrentSlider((prev) => (prev === sliders.length - 1 ? 0 : prev + 1));
        });
    };

    useEffect(() => {
        intervalRef.current = setInterval(animateToNextSlider, 3000);
        return () => clearInterval(intervalRef.current);
    }, [currentSlider]);

    const handleScroll = Animated.event(
        [{ nativeEvent: { contentOffset: { x: scrollX } } }],
        { useNativeDriver: true, listener: e => {
            const scrollPosition = e.nativeEvent.contentOffset.x;
            const newSliderIndex = Math.round(scrollPosition / windowWidth);
            if (newSliderIndex !== currentSlider) {
                setCurrentSlider(newSliderIndex);
            }
        } }
    );

    const handleTouchStart = () => {
        clearInterval(intervalRef.current);
    };

    const handleTouchEnd = () => {
        intervalRef.current = setInterval(animateToNextSlider, 3000);
    };

    return (
        <View style={styles.carouselContainer}>
            <Animated.ScrollView
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onScroll={handleScroll}
                scrollEventThrottle={16}
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
                contentOffset={{ x: currentSlider * windowWidth, y: 0 }}
                style={{ transform: [{ translateX: scrollX }] }}
            >
                {sliders.map((url, index) => (
                    <View key={index} style={[styles.imageWrapper, { width: windowWidth }]}>
                        <Image source={{ uri: url }} style={styles.image} />
                    </View>
                ))}
            </Animated.ScrollView>
            <View style={styles.dotsContainer}>
                {sliders.map((_, index) => (
                    <TouchableOpacity
                        key={index}
                        onPress={() => setCurrentSlider(index)}
                        style={[styles.dot, currentSlider === index && styles.activeDot]}
                    />
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    carouselContainer: {
        height: 400, // Adjust height based on image size
        justifyContent: 'center',
        alignItems: 'center',
        margin: 20,
        paddingLeft: 10,
        width: 400, // Fixed width for images
    },
    dotsContainer: {
        position: 'absolute',
        bottom: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    dot: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: 'white',
        margin: 4,
        opacity: 0.7,
    },
    activeDot: {
        width: 18,
        height: 18,
        backgroundColor: '#3498db',
        opacity: 1,
    },
    imageWrapper: {
        height: 300, // Fixed height for images
        overflow: 'hidden',
        borderRadius: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 5,
    },
    image: {
        height: '100%',
        width: '100%',
        resizeMode: 'cover',
    },
});

export default CustomSwiper;
