import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  Alert,
  ScrollView,
  TextInput,
  useWindowDimensions, // Import useWindowDimensions
} from 'react-native';
import Header from '../../components/Header';
import Modal from 'react-native-modal';

const CartPage = () => {
  const { width, height } = useWindowDimensions(); // Get screen dimensions
  const [cartItems, setCartItems] = useState([
    {
      id: '1',
      name: 'Margherita Pizza',
      price: 12.99,
      quantity: 1,
      image: require('../../assets/img/pizza.png'),
    },
    {
      id: '2',
      name: 'Veggie Burger',
      price: 9.49,
      quantity: 2,
      image: require('../../assets/img/burger.png'),
    },
    {
      id: '3',
      name: 'Pasta Alfredo',
      price: 14.99,
      quantity: 1,
      image: require('../../assets/img/sushi.png'),
    },
  ]);

  const [recommendedProducts] = useState([
    {
      id: '4',
      name: 'Garlic Bread',
      price: 5.99,
      image: require('../../assets/img/bread.png'),
    },
    {
      id: '5',
      name: 'Chocolate Cake',
      price: 8.99,
      image: require('../../assets/img/birthday-cake.png'),
    },
    {
      id: '6',
      name: 'Iced Tea',
      price: 3.49,
      image: require('../../assets/img/ice-tea.png'),
    },
  ]);

  const [isPriceModalVisible, setPriceModalVisible] = useState(false);
  const [isAddressModalVisible, setAddressModalVisible] = useState(false);
  const [deliveryAddress, setDeliveryAddress] = useState(
    '123 Main St, City, Country',
  );

  const incrementQuantity = itemId => {
    setCartItems(prev =>
      prev.map(item =>
        item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    );
  };

  const decrementQuantity = itemId => {
    setCartItems(prev =>
      prev.map(item =>
        item.id === itemId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item,
      ),
    );
  };

  const removeItem = itemId => {
    Alert.alert(
      'Remove Item',
      'Are you sure you want to remove this item from the cart?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Remove',
          onPress: () =>
            setCartItems(prev => prev.filter(item => item.id !== itemId)),
        },
      ],
    );
  };

  const calculateTotal = () =>
    cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const renderItem = ({ item }) => (
    <View style={styles(width).cartItem}>
      <Image source={item.image} style={styles(width).itemImage} />
      <View style={styles(width).itemDetails}>
        <Text style={styles(width).itemName}>{item.name}</Text>
        <Text style={styles(width).itemPrice}>${item.price.toFixed(2)}</Text>
        <View style={styles(width).quantityContainer}>
          <TouchableOpacity
            onPress={() => decrementQuantity(item.id)}
            style={styles(width).quantityButton}>
            <Text style={styles(width).quantityText}>-</Text>
          </TouchableOpacity>
          <Text style={styles(width).quantityText}>{item.quantity}</Text>
          <TouchableOpacity
            onPress={() => incrementQuantity(item.id)}
            style={styles(width).quantityButton}>
            <Text style={styles(width).quantityText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity
        onPress={() => removeItem(item.id)}
        style={styles(width).removeButton}>
        <Text style={styles(width).removeText}>Remove</Text>
      </TouchableOpacity>
    </View>
  );

  const renderRecommendedProduct = ({ item }) => (
    <TouchableOpacity style={styles(width).recommendedProductCard}>
      <Image source={item.image} style={styles(width).recommendedProductImage} />
      <Text style={styles(width).recommendedProductName}>{item.name}</Text>
      <Text style={styles(width).recommendedProductPrice}>
        ${item.price.toFixed(2)}
      </Text>
      <TouchableOpacity
              style={styles.addToCartSmallButton}
              onPress={() => handleAddToCart(item.id)}>
              <Text style={styles.addToCartSmallButtonText}>Add to Cart</Text>
            </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1 }}>
      <Header title="My Cart" showBackButton={true} showProfileButton={true} />
      <ScrollView style={styles(width).container}>
        <FlatList
          data={cartItems}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles(width).cartList}
        />
        {/* You May Also Like Section */}
        <Text style={styles(width).sectionTitle}>You May Also Like</Text>
        <FlatList
          horizontal
          data={recommendedProducts}
          keyExtractor={item => item.id}
          renderItem={renderRecommendedProduct}
          contentContainerStyle={styles(width).recommendedList}
          showsHorizontalScrollIndicator={false}
        />
        {/* Delivery Partner and Payment Card */}
        <View style={styles(width).deliveryCard}>
          <Text style={styles(width).deliveryCardTitle}>Delivery Partner Tip</Text>
          <Text style={styles(width).deliveryCardText}>
            Show appreciation to your delivery partner by adding a tip.
          </Text>

          <Text style={styles(width).deliveryCardTitle}>Delivery Instructions</Text>
          <Text style={styles(width).deliveryCardText}>
            Leave at the door or hand it to me.
          </Text>

          <TouchableOpacity onPress={() => setPriceModalVisible(true)}>
            <Text style={styles(width).deliveryCardTitle}>To Pay</Text>
            <Text style={styles(width).deliveryCardText}>
              Total: ${calculateTotal().toFixed(2)}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setAddressModalVisible(true)}>
            <Text style={styles(width).deliveryCardTitle}>Deliver To</Text>
            <Text style={styles(width).deliveryCardText}>{deliveryAddress}</Text>
          </TouchableOpacity>

          <Text style={styles(width).deliveryCardTitle}>Delivery Partner Safety</Text>
          <Text style={styles(width).deliveryCardText}>
            Please ensure contactless delivery for safety.
          </Text>
        </View>
      </ScrollView>

      {/* Checkout Button */}
      <View style={styles(width).footer}>
        <View style={styles(width).checkoutDetails}>
          <Text style={styles(width).totalText}>
            Total: ${calculateTotal().toFixed(2)}
          </Text>
          <Text style={styles(width).deliveryAddress}>
            Deliver to: {deliveryAddress}
          </Text>
        </View>
        <TouchableOpacity
          style={styles(width).checkoutButton}
          onPress={() => Alert.alert('Checkout', 'Proceed to checkout?')}>
          <Text style={styles(width).checkoutText}>Checkout</Text>
        </TouchableOpacity>
      </View>

      {/* Price Breakdown Modal */}
      <Modal
        isVisible={isPriceModalVisible}
        onBackdropPress={() => setPriceModalVisible(false)}
        style={styles(width).modal}>
        <View style={styles(width).modalContent}>
          <Text style={styles(width).modalTitle}>Price Breakdown</Text>
          {cartItems.map(item => (
            <View key={item.id} style={styles(width).priceItem}>
              <Text style={styles(width).priceItemName}>{item.name}</Text>
              <Text style={styles(width).priceItemPrice}>
                ${(item.price * item.quantity).toFixed(2)}
              </Text>
            </View>
          ))}
          <View style={styles(width).totalPrice}>
            <Text style={styles(width).totalPriceText}>Total</Text>
            <Text style={styles(width).totalPriceText}>
              ${calculateTotal().toFixed(2)}
            </Text>
          </View>
          <TouchableOpacity
            style={styles(width).closeButton}
            onPress={() => setPriceModalVisible(false)}>
            <Text style={styles(width).closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      {/* Edit Delivery Address Modal */}
      <Modal
        isVisible={isAddressModalVisible}
        onBackdropPress={() => setAddressModalVisible(false)}
        style={styles(width).modal}>
        <View style={styles(width).modalContent}>
          <Text style={styles(width).modalTitle}>Edit Delivery Address</Text>
          <TextInput
            style={styles(width).addressInput}
            value={deliveryAddress}
            onChangeText={setDeliveryAddress}
            placeholder="Enter your delivery address"
          />
          <TouchableOpacity
            style={styles(width).saveButton}
            onPress={() => setAddressModalVisible(false)}>
            <Text style={styles(width).saveButtonText}>Save</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = (width) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
    paddingHorizontal: width * 0.04, // 4% of screen width
  },
  cartList: {
    paddingBottom: 15,
  },
  cartItem: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  itemImage: {
    width: width * 0.2, // 20% of screen width
    height: width * 0.2,
    borderRadius: 10,
  },
  itemDetails: {
    flex: 1,
    marginLeft: 10,
    justifyContent: 'space-between',
  },
  itemName: {
    fontSize: width * 0.04, // 4% of screen width
    fontWeight: 'bold',
  },
  itemPrice: {
    fontSize: width * 0.035, // 3.5% of screen width
    color: '#555',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  quantityButton: {
    width: width * 0.08, // 8% of screen width
    height: width * 0.08,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
  },
  quantityText: {
    fontSize: width * 0.04, // 4% of screen width
    fontWeight: 'bold',
    marginHorizontal: 10,
  },
  removeButton: {
    justifyContent: 'center',
  },
  removeText: {
    fontSize: width * 0.035, // 3.5% of screen width
    color: '#FF6F61',
    fontWeight: '600',
  },
  deliveryCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  deliveryCardTitle: {
    fontSize: width * 0.04, // 4% of screen width
    fontWeight: 'bold',
    marginBottom: 5,
  },
  deliveryCardText: {
    fontSize: width * 0.035, // 3.5% of screen width
    color: '#555',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: width * 0.045, // 4.5% of screen width
    fontWeight: 'bold',
    marginBottom: 10,
  },
  recommendedList: {
    paddingBottom: 15,
  },
  recommendedProductCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    marginRight: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  recommendedProductImage: {
    width: width * 0.25, // 25% of screen width
    height: width * 0.25,
    borderRadius: 10,
  },
  recommendedProductName: {
    fontSize: width * 0.035, // 3.5% of screen width
    fontWeight: 'bold',
    marginTop: 5,
  },
  recommendedProductPrice: {
    fontSize: width * 0.035, // 3.5% of screen width
    color: '#555',
  },
  footer: {
    borderTopWidth: 1,
    borderColor: '#ddd',
    paddingVertical: 10,
    paddingHorizontal: width * 0.04, // 4% of screen width
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  checkoutDetails: {
    flex: 1,
  },
  totalText: {
    fontSize: width * 0.04, // 4% of screen width
    fontWeight: 'bold',
  },
  deliveryAddress: {
    fontSize: width * 0.035, // 3.5% of screen width
    color: '#555',
  },
  checkoutButton: {
    backgroundColor: '#FF6F61',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: width * 0.06, // 6% of screen width
    alignItems: 'center',
  },
  checkoutText: {
    color: 'white',
    fontSize: width * 0.04, // 4% of screen width
    fontWeight: 'bold',
  },
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalTitle: {
    fontSize: width * 0.045, // 4.5% of screen width
    fontWeight: 'bold',
    marginBottom: 15,
  },
  priceItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  priceItemName: {
    fontSize: width * 0.035, // 3.5% of screen width
    color: '#555',
  },
  priceItemPrice: {
    fontSize: width * 0.035, // 3.5% of screen width
    fontWeight: 'bold',
  },
  totalPrice: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderColor: '#ddd',
  },
  totalPriceText: {
    fontSize: width * 0.04, // 4% of screen width
    fontWeight: 'bold',
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: '#FF6F61',
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
  },
  closeButtonText: {
    color: 'white',
    fontSize: width * 0.04, // 4% of screen width
    fontWeight: 'bold',
  },
  addressInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
  },
  saveButton: {
    backgroundColor: '#FF6F61',
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
  },
  saveButtonText: {
    color: 'white',
    fontSize: width * 0.04, // 4% of screen width
    fontWeight: 'bold',
  },
});

export default CartPage;