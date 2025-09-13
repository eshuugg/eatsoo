import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Header from '../../components/Header';

// Indian Offer Data
const offers = [
  {
    id: 1,
    title: '50% Off on Fresh Fruits',
    description: 'Grab fresh fruits like mangoes, apples, and bananas at half price!',
    image: require('../../assets/img/carousel1.jpg'), // Replace with Indian fruit image
    validity: 'Valid until 31st Oct 2023',
  },
  {
    id: 2,
    title: 'Free Delivery on Groceries',
    description: 'Get free delivery on all grocery orders above ₹499.',
    image: require('../../assets/img/carousel1.jpg'), // Replace with Indian grocery image
    validity: 'Valid until 30th Nov 2023',
  },
  {
    id: 3,
    title: 'Buy 1 Get 1 Free on Snacks',
    description: 'Enjoy BOGO on popular Indian snacks like chips, biscuits, and namkeens.',
    image: require('../../assets/img/carousel1.jpg'), // Replace with Indian snacks image
    validity: 'Valid until 15th Dec 2023',
  },
  {
    id: 4,
    title: 'Upto 70% Off on Personal Care',
    description: 'Save big on soaps, shampoos, and skincare products.',
    image: require('../../assets/img/carousel1.jpg'), // Replace with Indian personal care image
    validity: 'Valid until 20th Dec 2023',
  },
  {
    id: 5,
    title: 'Festive Special: Diwali Discounts',
    description: 'Celebrate Diwali with exclusive discounts on sweets, dry fruits, and gifts.',
    image: require('../../assets/img/carousel1.jpg'), // Replace with Diwali-themed image
    validity: 'Valid until 12th Nov 2023',
  },
];

const OfferPage = ({navigation}) => {
  return (
    <View style={{flex: 1}}>
      <Header title="Offers" showBackButton={true} showProfileButton={true} />
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {offers.map(offer => (
            <View key={offer.id} style={styles.offerCard}>
              <Image source={offer.image} style={styles.offerImage} />
              <View style={styles.offerDetails}>
                <Text style={styles.offerTitle}>{offer.title}</Text>
                <Text style={styles.offerDescription}>{offer.description}</Text>
                <Text style={styles.offerValidity}>{offer.validity}</Text>
                <TouchableOpacity
                  style={styles.redeemButton}
                  onPress={() => navigation.navigate('OfferDetails', {offer})}>
                  <Text style={styles.redeemButtonText}>Redeem Now</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
    padding: 15,
  },
  scrollContainer: {
    paddingBottom: 20,
  },
  offerCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 15,
    elevation: 3,
  },
  offerImage: {
    width: '100%',
    height: 150,
  },
  offerDetails: {
    padding: 15,
  },
  offerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  offerDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  offerValidity: {
    fontSize: 12,
    color: '#888',
    marginBottom: 10,
  },
  redeemButton: {
    backgroundColor: '#FF6F61',
    borderRadius: 5,
    paddingVertical: 10,
    alignItems: 'center',
  },
  redeemButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default OfferPage;