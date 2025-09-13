import {View, Text, StyleSheet, ScrollView, Image, TouchableOpacity} from 'react-native';
import React from 'react';

const QuickDelivery = (props) => {
  return (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>Quick Delivery</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {props?.quickDeliveryProducts.map((product, index) => (
          <TouchableOpacity key={index} style={styles.quickDeliveryCard}>
            <Image source={product.image} style={styles.quickDeliveryImage} />
            <View style={styles.quickDeliveryInfo}>
              <Text style={styles.quickDeliveryName}>{product.name}</Text>
              <Text style={styles.quickDeliveryDetails}>{product.details}</Text>
              <Text style={styles.quickDeliveryTime}>
                🚚 {product.deliveryTime}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    padding: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  quickDeliveryCard: {
    marginRight: 15,
    backgroundColor: 'white',
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 3,
    alignItems: 'center',
  },
  quickDeliveryImage: {
    width: 90,
    height: 100,
  },
  quickDeliveryInfo: {
    padding: 10,
  },
  quickDeliveryName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  quickDeliveryDetails: {
    fontSize: 14,
    color: 'gray',
    marginTop: 5,
  },
  quickDeliveryTime: {
    fontSize: 14,
    color: '#FF6F61',
    marginTop: 5,
  },
});

export default QuickDelivery;
