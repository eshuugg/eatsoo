import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import Header from '../../components/Header';

const RestaurantPage = () => {
  const [activeTab, setActiveTab] = useState('Veg');
  const [headerData, setHeaderData] = useState({
    name: 'Green Delight',
    image: require('../../assets/img/veg1.jpg'),
  });

  const handleAddToCart = item => {
    alert(`${item.name} added to cart!`);
    // Add your cart logic here (e.g., update a cart state or make an API call)
  };

  const restaurants = [
    {
      id: 1,
      name: 'Green Delight',
      type: 'Veg',
      details: 'Indian, Vegetarian - 4.5 ★',
      image: require('../../assets/img/veg1.jpg'),
    },
    {
      id: 2,
      name: 'Spice Hub',
      type: 'Veg',
      details: 'South Indian, Vegan - 4.3 ★',
      image: require('../../assets/img/veg2.jpg'),
    },
    {
      id: 3,
      name: 'Meat Lovers',
      type: 'Non-Veg',
      details: 'Grill, Barbecue - 4.6 ★',
      image: require('../../assets/img/nonveg1.jpg'),
    },
    {
      id: 4,
      name: 'Chicken Feast',
      type: 'Non-Veg',
      details: 'Fast Food, Chicken - 4.4 ★',
      image: require('../../assets/img/nonveg2.jpg'),
    },
  ];

  const filteredRestaurants = restaurants.filter(
    restaurant => restaurant.type === activeTab,
  );

  const handleRestaurantPress = restaurant => {
    setHeaderData({
      name: restaurant.name,
      image: restaurant.image,
    });
  };

  return (
    <View style={{flex: 1}}>
      <Header
        title="Restaurant"
        showBackButton={true}
        showProfileButton={true}
      />
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.headerContainer}>
          <Image source={headerData.image} style={styles.headerImage} />
          <Text style={styles.headerText}>{headerData.name}</Text>
        </View>

        {/* Tab Bar */}
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tabButton, activeTab === 'Veg' && styles.activeTab]}
            onPress={() => setActiveTab('Veg')}>
            <Text
              style={[
                styles.tabText,
                activeTab === 'Veg' && styles.activeTabText,
              ]}>
              Veg
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.tabButton,
              activeTab === 'Non-Veg' && styles.activeTab,
            ]}
            onPress={() => setActiveTab('Non-Veg')}>
            <Text
              style={[
                styles.tabText,
                activeTab === 'Non-Veg' && styles.activeTabText,
              ]}>
              Non-Veg
            </Text>
          </TouchableOpacity>
        </View>

        {/* Restaurant List */}
        <FlatList
          data={filteredRestaurants}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => (
            <View style={styles.restaurantCard}>
              <Image source={item.image} style={styles.restaurantImage} />
              <View style={styles.restaurantInfo}>
                <Text style={styles.restaurantName}>{item.name}</Text>
                <Text style={styles.restaurantDetails}>{item.details}</Text>
                <TouchableOpacity
                  style={styles.addToCartButton}
                  onPress={() => handleAddToCart(item)}>
                  <Text style={styles.addToCartText}>Add to Cart</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
          contentContainerStyle={styles.listContent}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  headerContainer: {
    backgroundColor: '#FF6F61',
    padding: 15,
    alignItems: 'center',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    overflow: 'hidden',
  },
  headerImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#FF6F61',
  },
  tabButton: {
    flex: 1,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeTab: {
    backgroundColor: '#fff',
  },
  tabText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  activeTabText: {
    color: '#FF6F61',
  },
  listContent: {
    padding: 15,
  },
  restaurantCard: {
    flexDirection: 'row',
    marginBottom: 15,
    backgroundColor: 'white',
    borderRadius: 10,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  restaurantImage: {
    width: 80,
    height: 80,
  },
  restaurantInfo: {
    flex: 1,
    padding: 10,
    justifyContent: 'space-between',
  },
  restaurantName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  restaurantDetails: {
    fontSize: 14,
    color: '#555',
  },
  addToCartButton: {
    backgroundColor: '#FF6F61',
    padding: 8,
    borderRadius: 5,
    alignItems: 'center',
  },
  addToCartText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default RestaurantPage;
