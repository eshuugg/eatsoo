import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import Header from '../../components/Header';
import { fetchProduct } from '../../redux/Slicers/Product';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');
const cardWidth = (width - 36) / 2;

const AllProductsPage = props => {
  const { subcategoryId } = props.route.params || {};
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    fetchAllProducts();
  }, []);

  const fetchAllProducts = async () => {
    try {
      const response = await dispatch(fetchProduct(subcategoryId));
      if (response?.inventoryData) {
        setProducts(response.inventoryData);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (product) => {
    console.log('Add to cart:', product.name);
    // Add your cart logic here
  };

  const navigateToProductDetails = (product) => {
    navigation.navigate('ProductDetails', { product });
  };

  const formatPrice = (price) => {
    return parseFloat(price).toFixed(2);
  };

  return (
    <View style={styles.container}>
      <Header title="All Products" showBackButton={true} />

      {loading ? (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color="#4CAF50" />
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.gridContainer}>
          {products.map((product, index) => {
            const seller = product.sellers?.[0];
            const price = seller?.seller_inventory?.price || 0;
            const imageUrl = `http://192.168.7.31:8080/${product.image?.path?.replace(/\\/g, '/')}`;

            return (
              <TouchableOpacity
                key={product.inventoryID}
                style={styles.card}
                onPress={() => navigateToProductDetails(product)}
              >
                <Image
                  source={{ uri: product.productImage || imageUrl }}
                  style={styles.productImage}
                  resizeMode="contain"
                />
                <View style={styles.productInfo}>
                  <Text style={styles.productName} numberOfLines={2}>
                    {product.name}
                  </Text>
                  <Text style={styles.productDescription} numberOfLines={2}>
                    {product.description}
                  </Text>
                  <Text style={styles.productPrice}>₹{formatPrice(price)}</Text>
                  {seller && (
                    <Text style={styles.sellerName}>Sold by: {seller.firstName}</Text>
                  )}
                </View>
                <TouchableOpacity
                  style={styles.addToCartButton}
                  onPress={() => handleAddToCart(product)}
                >
                  <Text style={styles.addToCartText}>Add to Cart</Text>
                </TouchableOpacity>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 12,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    width: cardWidth,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  productImage: {
    width: '100%',
    height: 120,
    backgroundColor: '#f9f9f9',
  },
  productInfo: {
    padding: 10,
  },
  productName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  productDescription: {
    fontSize: 12,
    color: '#666',
    marginBottom: 8,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2e7d32',
    marginBottom: 4,
  },
  sellerName: {
    fontSize: 11,
    color: '#888',
    fontStyle: 'italic',
  },
  addToCartButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    alignItems: 'center',
  },
  addToCartText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default AllProductsPage;