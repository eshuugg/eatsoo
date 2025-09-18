import React, { useRef, useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  Animated,
  TouchableOpacity,
} from "react-native";

const { width, height } = Dimensions.get("window");
const CARD_WIDTH = width * 0.75;
const SPACING = 12;
const FOCUSED_CARD_MARGIN = (width - CARD_WIDTH) / 2;

const Carousel = ({ superDiscountProducts }) => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const progressAnim = useRef(new Animated.Value(0)).current;
  const [data, setData] = useState([]);

  // Set up data after component mounts to avoid issues with empty arrays
  useEffect(() => {
    if (superDiscountProducts.length > 0) {
      setData([...superDiscountProducts, ...superDiscountProducts, ...superDiscountProducts]);
    }
  }, [superDiscountProducts]);

  const middleIndexOffset = superDiscountProducts.length;

  useEffect(() => {
    if (data.length === 0) return;

    // Initial scroll to the middle section
    setTimeout(() => {
      flatListRef.current?.scrollToIndex({
        index: middleIndexOffset,
        animated: false,
      });
      setCurrentIndex(middleIndexOffset);
      startProgressBar();
    }, 10);
  }, [data]);

  // Auto-scroll
  useEffect(() => {
    if (data.length === 0) return;

    const intervalId = setInterval(() => {
      let nextIndex = currentIndex + 1;

      // If we are at the end of the duplicated list's middle section, jump back to the start
      if (nextIndex >= middleIndexOffset * 2) {
        flatListRef.current?.scrollToIndex({
          index: middleIndexOffset,
          animated: false,
        });
        setCurrentIndex(middleIndexOffset);
      } else {
        flatListRef.current?.scrollToIndex({
          index: nextIndex,
          animated: true,
        });
        setCurrentIndex(nextIndex);
      }

      startProgressBar();
    }, 4000);

    return () => clearInterval(intervalId);
  }, [currentIndex, data.length]);

  const startProgressBar = () => {
    progressAnim.setValue(0);
    Animated.timing(progressAnim, {
      toValue: 1,
      duration: 4000,
      useNativeDriver: false,
    }).start();
  };

  const onMomentumScrollEnd = (event) => {
    const offset = event.nativeEvent.contentOffset.x;
    const newIndex = Math.round((offset + FOCUSED_CARD_MARGIN) / (CARD_WIDTH + SPACING));

    // Logic to handle infinite scrolling loop
    if (newIndex < middleIndexOffset) {
      const newScrollIndex = newIndex + superDiscountProducts.length;
      flatListRef.current?.scrollToIndex({ index: newScrollIndex, animated: false });
      setCurrentIndex(newScrollIndex);
    } else if (newIndex >= middleIndexOffset * 2) {
      const newScrollIndex = newIndex - superDiscountProducts.length;
      flatListRef.current?.scrollToIndex({ index: newScrollIndex, animated: false });
      setCurrentIndex(newScrollIndex);
    } else {
      setCurrentIndex(newIndex);
    }

    startProgressBar();
  };

  const getItemLayout = (_, index) => ({
    length: CARD_WIDTH + SPACING,
    offset: (CARD_WIDTH + SPACING) * index,
    index,
  });

  const renderItem = ({ item, index }) => {
    const inputRange = [
      (index - 1) * (CARD_WIDTH + SPACING),
      index * (CARD_WIDTH + SPACING),
      (index + 1) * (CARD_WIDTH + SPACING),
    ];

    const scale = scrollX.interpolate({
      inputRange,
      outputRange: [0.9, 1, 0.9],
      extrapolate: "clamp",
    });

    const opacity = scrollX.interpolate({
      inputRange,
      outputRange: [0.7, 1, 0.7],
      extrapolate: "clamp",
    });

    return (
      <Animated.View
        style={[
          styles.card,
          { transform: [{ scale }], opacity },
        ]}
      >
        <Image
          source={item?.image || require("../../assets/img/placeholder.png")}
          style={styles.image}
        />
        {/* <View style={styles.overlay}>
          <Text style={styles.title}>{item?.title || "Special Deal"}</Text>
          <Text style={styles.subtitle}>
            {item?.subtitle || "Get exciting offers now!"}
          </Text>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Shop Now</Text>
          </TouchableOpacity>
        </View> */}
      </Animated.View>
    );
  };

  if (data.length === 0) {
    return null; // or a loading indicator
  }

  return (
    <View style={styles.container}>
      <Animated.FlatList
        ref={flatListRef}
        data={data}
        keyExtractor={(_, index) => index.toString()}
        renderItem={renderItem}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={CARD_WIDTH + SPACING}
        decelerationRate="fast"
        contentContainerStyle={{
          paddingHorizontal: FOCUSED_CARD_MARGIN - SPACING / 2,
        }}
        onMomentumScrollEnd={onMomentumScrollEnd}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
        getItemLayout={getItemLayout}
        initialScrollIndex={middleIndexOffset}
      />

      {/* Progress indicators - they use the original array length */}
      <View style={styles.progressContainer}>
        {superDiscountProducts.map((_, index) => {
          // Calculate the original index from the duplicated list's currentIndex
          const originalIndex = currentIndex % superDiscountProducts.length;
          return (
            <View key={index} style={styles.progressIndicatorBackground}>
              {index === originalIndex && (
                <Animated.View
                  style={[
                    styles.progressIndicatorFill,
                    {
                      width: progressAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: ["0%", "100%"],
                      }),
                    },
                  ]}
                />
              )}
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default Carousel;

// Styles remain the same
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  card: {
    width: CARD_WIDTH,
    marginHorizontal: SPACING / 2,
    borderRadius: 16,
    overflow: "hidden",
    height: height * 0.25,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 5,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    position: "absolute",
  },
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    padding: 16,
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  title: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },
  subtitle: {
    color: "#f1f1f1",
    fontSize: 14,
    marginVertical: 4,
  },
  button: {
    alignSelf: "flex-start",
    backgroundColor: "#fff",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    marginTop: 6,
  },
  buttonText: {
    color: "#000",
    fontWeight: "600",
  },
  progressContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  progressIndicatorBackground: {
    height: 3,
    width: 25,
    backgroundColor: "#ddd",
    borderRadius: 3,
    marginHorizontal: 3,
    overflow: "hidden",
  },
  progressIndicatorFill: {
    height: "100%",
    backgroundColor: "#2196F3",
  },
});