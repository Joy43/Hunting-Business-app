import React, { useState, useEffect, useRef } from 'react';
import { View, Image, ScrollView, TouchableOpacity, StyleSheet, Dimensions, Animated, Easing } from 'react-native';

const Carousel8 = () => {
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
            duration: 600, // Duration of the transition
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
        height: 500, // Adjust based on your needs
        justifyContent: 'center',
        alignItems: 'center',
        margin: 20
    },
    dotsContainer: {
        position: 'absolute',
        bottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    dot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: 'white',
        margin: 5,
    },
    activeDot: {
        width: 20,
        backgroundColor: 'blue',
    },
    imageWrapper: {
        height: '100%',
        overflow: 'hidden',
    },
    image: {
        height: '100%',
        width: '100%',
        resizeMode: 'cover',
    },
});

export default Carousel8;
