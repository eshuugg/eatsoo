import React, { useRef, useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  Dimensions,
  Animated,
} from 'react-native';

const { width, height } = Dimensions.get('window');
const CARD_WIDTH = width * 0.9;
const SPACING = width * 0.05;

const Carousel = ({ superDiscountProducts }) => {
  const flatListRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const progressAnim = useRef(new Animated.Value(0)).current;

  // Animate the progress bar every 3 seconds
  const startProgressBar = () => {
    progressAnim.setValue(0);
    Animated.timing(progressAnim, {
      toValue: 1,
      duration: 3000,
      useNativeDriver: false,
    }).start();
  };

  useEffect(() => {
    startProgressBar();
    const intervalId = setInterval(() => {
      const nextIndex = (currentIndex + 1) % superDiscountProducts.length;
      flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
      setCurrentIndex(nextIndex);
      startProgressBar();
    }, 3000);

    return () => clearInterval(intervalId);
  }, [currentIndex, superDiscountProducts.length]);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      {/* Discount Badge */}
      {/* {item.discount && (
        <View style={styles.discountBadge}>
          <Text style={styles.discountText}>{item.discount}% OFF</Text>
        </View>
      )} */}

      {/* Product Image */}
      {item?.image ? <Image source={item.image} style={styles.image} /> : <Image
        source={require('../../assets/img/placeholder.png')}
        style={styles.categoryImage}
      />}
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        horizontal
        pagingEnabled
        snapToAlignment="center"
        showsHorizontalScrollIndicator={false}
        data={superDiscountProducts}
        keyExtractor={(_, index) => index.toString()}
        renderItem={renderItem}
        getItemLayout={(_, index) => ({
          length: CARD_WIDTH + SPACING,
          offset: (CARD_WIDTH + SPACING) * index,
          index,
        })}
        contentContainerStyle={{
          paddingHorizontal: (width - CARD_WIDTH) / 4, // centers the first and last cards
        }}
      />

      {/* Progress indicators container */}
      <View style={styles.progressContainer}>
        {superDiscountProducts.map((_, index) => (
          <View key={index} style={styles.progressIndicatorBackground}>
            {index === currentIndex && (
              <Animated.View
                style={[
                  styles.progressIndicatorFill,
                  {
                    width: progressAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: ['0%', '100%'],
                    }),
                  },
                ]}
              />
            )}
          </View>
        ))}
      </View>
    </View>
  );
};

export default Carousel;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  card: {
    width: CARD_WIDTH,
    marginHorizontal: SPACING / 2,
    backgroundColor: '#fff',
    borderRadius: 12,
    borderColor: '#ddd',
    borderWidth: 1,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
    marginBottom: 10,
    position: 'relative',
    overflow: 'hidden', // important to keep image within rounded corners
    height: height * 0.25, // define a fixed height for the card
    padding: 0, // remove padding so image fills fully
  },

  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover', // cover instead of stretch
  },

  discountBadge: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: 'red',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 5,
    zIndex: 1,
  },
  discountText: {
    color: 'white',
    fontSize: 12,
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  progressIndicatorBackground: {
    height: 3,
    width: 20,
    backgroundColor: '#ddd',
    borderRadius: 3,
    marginHorizontal: 3,
    overflow: 'hidden',
  },
  progressIndicatorFill: {
    height: '100%',
    backgroundColor: '#2196F3',
  },
});
