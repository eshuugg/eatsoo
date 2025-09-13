import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // For icons
import Header from '../../components/Header';

// Get screen dimensions
const {width, height} = Dimensions.get('window');

// Mock product data (replace with actual data from API or props)
const product = {
  id: 1,
  name: 'Fresh Apples',
  image: require('../../assets/img/apple.png'), // Replace with actual image
  description:
    'Crisp and juicy fresh apples, perfect for snacking or baking. Grown organically with no artificial additives.',
  rating: 4.5,
  price: '$2.99',
  discount: '10% off',
  originalPrice: '$3.33',
};

// Mock data for similar products and recommended products
const similarProducts = [
  {
    id: 1,
    name: 'Banana',
    image: require('../../assets/img/banana.png'), // Replace with actual image
    price: '$1.49',
    rating: 4.2,
  },
  {
    id: 2,
    name: 'Orange',
    image: require('../../assets/img/orange.png'), // Replace with actual image
    price: '$3.99',
    rating: 4.6,
  },
  {
    id: 3,
    name: 'Grapes',
    image: require('../../assets/img/grape.png'), // Replace with actual image
    price: '$4.99',
    rating: 4.3,
  },
];

const recommendedProducts = [
  {
    id: 1,
    name: 'Milk',
    image: require('../../assets/img/milk-box.png'), // Replace with actual image
    price: '$3.99',
    rating: 4.7,
  },
  {
    id: 2,
    name: 'Bread',
    image: require('../../assets/img/bread.png'), // Replace with actual image
    price: '$2.49',
    rating: 4.4,
  },
  {
    id: 3,
    name: 'Eggs',
    image: require('../../assets/img/eggs.png'), // Replace with actual image
    price: '$2.99',
    rating: 4.5,
  },
];

const ProductDetailsPage = ({route}) => {
  // Handle Add to Cart
  const handleAddToCart = productId => {
    console.log(`Added product ${productId} to cart`);
    // Add your logic to handle adding to cart
  };

  // Render similar or recommended product item
  const renderProductItem = ({item}) => (
    <TouchableOpacity style={styles.productItem}>
      <Image source={item.image} style={styles.productItemImage} />
      <Text style={styles.productItemName}>{item.name}</Text>
      <Text style={styles.productItemPrice}>{item.price}</Text>
      <View style={styles.productItemRating}>
        <Icon name="star" size={16} color="#FFD700" />
        <Text style={styles.productItemRatingText}>{item.rating}</Text>
      </View>
      <TouchableOpacity
        style={styles.addToCartSmallButton}
        onPress={() => handleAddToCart(item.id)}>
        <Text style={styles.addToCartSmallButtonText}>Add to Cart</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View style={{flex: 1}}>
      <Header
        title="Product Details"
        showBackButton={true}
        showProfileButton={true}
      />
      <View style={styles.container}>
        <ScrollView>
          {/* Product Image */}
          <View style={{alignItems: 'center', marginTop: 20}}>
            <Image source={product.image} style={[styles.productImage]} />
          </View>

          {/* Product Details */}
          <View style={styles.detailsContainer}>
            {/* Product Name */}
            <Text style={styles.productName}>{product.name}</Text>

            {/* Rating */}
            <View style={styles.ratingContainer}>
              <Icon name="star" size={20} color="#FFD700" />
              <Text style={styles.ratingText}>{product.rating}</Text>
              <Text style={styles.ratingCount}>(1,234 reviews)</Text>
            </View>

            {/* Price and Discount */}
            <View style={styles.priceContainer}>
              <Text style={styles.price}>{product.price}</Text>
              <Text style={styles.originalPrice}>{product.originalPrice}</Text>
              <Text style={styles.discount}>{product.discount}</Text>
            </View>

            {/* Description */}
            <Text style={styles.description}>{product.description}</Text>

            {/* Similar Products Section */}
            <Text style={styles.sectionTitle}>Similar Products</Text>
            <FlatList
              data={similarProducts}
              renderItem={renderProductItem}
              keyExtractor={item => item.id.toString()}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.productList}
            />

            {/* You May Also Like Section */}
            <Text style={styles.sectionTitle}>You May Also Like</Text>
            <FlatList
              data={recommendedProducts}
              renderItem={renderProductItem}
              keyExtractor={item => item.id.toString()}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.productList}
            />
          </View>
        </ScrollView>

        {/* Fixed Buttons at Bottom */}
        <View style={styles.fixedButtonContainer}>
          <TouchableOpacity style={styles.addToCartButton}>
            <Text style={styles.buttonText}>Add to Cart</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buyNowButton}>
            <Text style={styles.buttonText}>Buy Now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ProductDetailsPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  productImage: {
    resizeMode: 'contain',
    width: width * 0.7,
    height: height * 0.3,
  },
  detailsContainer: {
    padding: 20,
    paddingBottom: 100, // Add padding to avoid overlap with fixed buttons
  },
  productName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  ratingText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 5,
  },
  ratingCount: {
    fontSize: 14,
    color: '#666',
    marginLeft: 10,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  price: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginRight: 10,
  },
  originalPrice: {
    fontSize: 16,
    color: '#666',
    textDecorationLine: 'line-through',
    marginRight: 10,
  },
  discount: {
    fontSize: 16,
    color: '#FF6F61',
    fontWeight: 'bold',
  },
  description: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  productList: {
    paddingBottom: 20,
  },
  productItem: {
    width: width * 0.4, // 40% of screen width
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 15,
    marginRight: 15,
    elevation: 3,
  },
  productItemImage: {
    width: '100%',
    height: height * 0.09, // 15% of screen height
    resizeMode: 'contain',
    marginBottom: 10,
  },
  productItemName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
  },
  productItemPrice: {
    fontSize: 14,
    color: '#4CAF50',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 5,
  },
  productItemRating: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
  },
  productItemRatingText: {
    fontSize: 14,
    color: '#333',
    marginLeft: 5,
  },
  addToCartSmallButton: {
    backgroundColor: '#FF6F61',
    borderRadius: 5,
    padding: 8,
    marginTop: 10,
    alignItems: 'center',
  },
  addToCartSmallButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFF',
  },
  fixedButtonContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFF',
    padding: 15,
    elevation: 5,
  },
  addToCartButton: {
    flex: 1,
    backgroundColor: '#FF6F61',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    marginRight: 10,
  },
  buyNowButton: {
    flex: 1,
    backgroundColor: '#4CAF50',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    marginLeft: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
  },
});
