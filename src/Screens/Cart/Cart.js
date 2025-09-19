import React, { useState, useEffect, useCallback } from 'react';
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
  useWindowDimensions,
  RefreshControl,
} from 'react-native';
import Header from '../../components/Header';
import Modal from 'react-native-modal';
import { useSelector, useDispatch } from 'react-redux';
import {
  getCart,
  updateCart,
  removeCart,
  clearCart
} from '../../redux/Slicers/cartSlicer';

const CartPage = () => {
  const { width, height } = useWindowDimensions();
  const dispatch = useDispatch();
  const { cartData, loading, error } = useSelector(state => state.cartDetails);
  const { userData, location } = useSelector(state => state.loginData);

  const [isPriceModalVisible, setPriceModalVisible] = useState(false);
  const [isAddressModalVisible, setAddressModalVisible] = useState(false);
  const [deliveryAddress, setDeliveryAddress] = useState(
    '123 Main St, City, Country',
  );
  const [refreshing, setRefreshing] = useState(false);

  // Fetch cart data on component mount
  useEffect(() => {
    fetchCartData();
  }, [dispatch]);

  const fetchCartData = useCallback(async () => {
    try {
      // Replace '4' with actual user ID from your auth state
      await dispatch(getCart(userData?.user?.userId));
    } catch (err) {
      console.error('Error fetching cart data:', err);
    }
  }, [dispatch]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchCartData();
    setRefreshing(false);
  }, [fetchCartData]);

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

  const incrementQuantity = async (cartItemID, currentQuantity) => {
    try {
      const newQuantity = currentQuantity + 1;
      await dispatch(updateCart({ cartItemID, quantity: newQuantity }));
      // Refresh cart data to get updated quantities
      await fetchCartData();
    } catch (err) {
      Alert.alert('Error', 'Failed to update quantity');
    }
  };

  const decrementQuantity = async (cartItemID, currentQuantity) => {
    if (currentQuantity > 1) {
      try {
        const newQuantity = currentQuantity - 1;
        await dispatch(updateCart({ cartItemID, quantity: newQuantity }));
        // Refresh cart data to get updated quantities
        await fetchCartData();
      } catch (err) {
        Alert.alert('Error', 'Failed to update quantity');
      }
    }
  };

  const removeItem = async (cartItemID) => {
    Alert.alert(
      'Remove Item',
      'Are you sure you want to remove this item from the cart?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Remove',
          onPress: async () => {
            try {
              await dispatch(removeCart(cartItemID));
              // Refresh cart data after removal
              await fetchCartData();
            } catch (err) {
              Alert.alert('Error', 'Failed to remove item');
            }
          },
        },
      ],
    );
  };

  const handleAddToCart = (productId) => {
    // Implement add to cart functionality for recommended products
    Alert.alert('Add to Cart', `Product ${productId} added to cart`);
  };

  const renderItem = ({ item }) => (
    <View style={styles(width).cartItem}>
      <Image
        source={item.inventory?.image
          ? {
            uri: `http://192.168.29.16:8080/${item.inventory.image?.path.replace(
              /\\/g,
              '/',
            )}`,
          }
          : require('../../assets/img/placeholder.png')
        }
        style={styles(width).itemImage}
      />
      <View style={styles(width).itemDetails}>
        <Text style={styles(width).itemName}>{item.inventory?.name || 'Product'}</Text>
        <Text style={styles(width).itemPrice}>₹{item.currentPrice || '0.00'}</Text>
        <Text style={styles(width).sellerName}>
          Sold by: {item.seller?.businessName || 'Unknown Seller'}
        </Text>
        <View style={styles(width).quantityContainer}>
          <TouchableOpacity
            onPress={() => decrementQuantity(item.cartItemID, item.quantity)}
            style={styles(width).quantityButton}>
            <Text style={styles(width).quantityText}>-</Text>
          </TouchableOpacity>
          <Text style={styles(width).quantityText}>{item.quantity}</Text>
          <TouchableOpacity
            onPress={() => incrementQuantity(item.cartItemID, item.quantity)}
            style={styles(width).quantityButton}>
            <Text style={styles(width).quantityText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity
        onPress={() => removeItem(item.cartItemID)}
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
        style={styles(width).addToCartSmallButton}
        onPress={() => handleAddToCart(item.id)}>
        <Text style={styles(width).addToCartSmallButtonText}>Add to Cart</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  if (loading && !refreshing) {
    return (
      <View style={styles(width).container}>
        <Header title="My Cart" showBackButton={true} showProfileButton={true} />
        <View style={styles(width).loadingContainer}>
          <Text>Loading cart...</Text>
        </View>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles(width).container}>
        <Header title="My Cart" showBackButton={true} showProfileButton={true} />
        <View style={styles(width).errorContainer}>
          <Text>Error loading cart: {error}</Text>
          <TouchableOpacity onPress={fetchCartData} style={styles(width).retryButton}>
            <Text style={styles(width).retryButtonText}>Retry</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  if (!cartData || !cartData?.data?.cartItems || cartData?.data?.cartItems.length === 0) {
    return (
      <View style={styles(width).container}>
        <Header title="My Cart" showBackButton={true} showProfileButton={true} />
        <ScrollView
          contentContainerStyle={styles(width).emptyContainer}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <Text style={styles(width).emptyText}>Your cart is empty</Text>
        </ScrollView>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <Header title="My Cart" showBackButton={true} showProfileButton={true} />
      <ScrollView
        style={styles(width).container}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <FlatList
          data={cartData?.data?.cartItems}
          keyExtractor={item => item.cartItemID}
          renderItem={renderItem}
          contentContainerStyle={styles(width).cartList}
          scrollEnabled={false} // Disable internal scrolling since we're in a ScrollView
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
              Total: ₹{cartData.data?.totals?.finalAmount || '0.00'}
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
            Total: ₹{cartData.data?.totals?.finalAmount || '0.00'}
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
          {cartData?.data?.cartItems.map(item => (
            <View key={item.cartItemID} style={styles(width).priceItem}>
              <Text style={styles(width).priceItemName}>{item.inventory?.name}</Text>
              <Text style={styles(width).priceItemPrice}>
                ₹{(parseFloat(item.currentPrice || item.salePrice) * item.quantity).toFixed(2)}
              </Text>
            </View>
          ))}
          <View style={styles(width).totalPrice}>
            <Text style={styles(width).totalPriceText}>Subtotal</Text>
            <Text style={styles(width).totalPriceText}>
              ₹{cartData.data?.totals?.totalAmount || '0.00'}
            </Text>
          </View>
          <View style={styles(width).totalPrice}>
            <Text style={styles(width).totalPriceText}>Discount</Text>
            <Text style={styles(width).totalPriceText}>
              -₹{cartData.data?.totals?.discountAmount || '0.00'}
            </Text>
          </View>
          <View style={styles(width).totalPrice}>
            <Text style={styles(width).totalPriceText}>Total</Text>
            <Text style={styles(width).totalPriceText}>
              ₹{cartData.data?.totals?.finalAmount || '0.00'}
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
    paddingHorizontal: width * 0.04,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  retryButton: {
    marginTop: 10,
    backgroundColor: '#FF6F61',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  retryButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: width * 0.045,
    fontWeight: 'bold',
    color: '#555',
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
    width: width * 0.2,
    height: width * 0.2,
    borderRadius: 10,
  },
  itemDetails: {
    flex: 1,
    marginLeft: 10,
    justifyContent: 'space-between',
  },
  itemName: {
    fontSize: width * 0.04,
    fontWeight: 'bold',
  },
  sellerName: {
    fontSize: width * 0.03,
    color: '#777',
    marginBottom: 5,
  },
  itemPrice: {
    fontSize: width * 0.035,
    color: '#555',
    marginBottom: 5,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  quantityButton: {
    width: width * 0.08,
    height: width * 0.08,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
  },
  quantityText: {
    fontSize: width * 0.04,
    fontWeight: 'bold',
    marginHorizontal: 10,
  },
  removeButton: {
    justifyContent: 'center',
  },
  removeText: {
    fontSize: width * 0.035,
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
    fontSize: width * 0.04,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  deliveryCardText: {
    fontSize: width * 0.035,
    color: '#555',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: width * 0.045,
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
    width: width * 0.4,
  },
  recommendedProductImage: {
    width: width * 0.25,
    height: width * 0.25,
    borderRadius: 10,
  },
  recommendedProductName: {
    fontSize: width * 0.035,
    fontWeight: 'bold',
    marginTop: 5,
    textAlign: 'center',
  },
  recommendedProductPrice: {
    fontSize: width * 0.035,
    color: '#555',
    marginBottom: 5,
  },
  addToCartSmallButton: {
    backgroundColor: '#FF6F61',
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginTop: 5,
  },
  addToCartSmallButtonText: {
    color: 'white',
    fontSize: width * 0.03,
    fontWeight: 'bold',
  },
  footer: {
    borderTopWidth: 1,
    borderColor: '#ddd',
    paddingVertical: 10,
    paddingHorizontal: width * 0.04,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  checkoutDetails: {
    flex: 1,
  },
  totalText: {
    fontSize: width * 0.04,
    fontWeight: 'bold',
  },
  deliveryAddress: {
    fontSize: width * 0.035,
    color: '#555',
  },
  checkoutButton: {
    backgroundColor: '#FF6F61',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: width * 0.06,
    alignItems: 'center',
  },
  checkoutText: {
    color: 'white',
    fontSize: width * 0.04,
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
    fontSize: width * 0.045,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  priceItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  priceItemName: {
    fontSize: width * 0.035,
    color: '#555',
  },
  priceItemPrice: {
    fontSize: width * 0.035,
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
    fontSize: width * 0.04,
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
    fontSize: width * 0.04,
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
    fontSize: width * 0.04,
    fontWeight: 'bold',
  },
});

export default CartPage;