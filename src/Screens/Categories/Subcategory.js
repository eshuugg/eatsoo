import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import Header from '../../components/Header';
import Icon from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { fetchSubcategoryData } from '../../redux/Slicers/SubcategorySlicer';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const { width, height } = Dimensions.get('window');

const SubCategoriesPage = props => {
  const { categoryId } = props.route.params || {};
  const [subcategories, setSubcategories] = useState([]);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [activeFilter, setActiveFilter] = useState('All');
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    fetchSubcategoriesData();
  }, []);

  const fetchSubcategoriesData = async () => {
    try {
      setLoading(true); // Start loading
      const res = await dispatch(fetchSubcategoryData(categoryId));
      if (res.data) {
        setSubcategories(res.data || []);
        if (res.data.length > 0) {
          setSelectedSubcategory(res.data[0].subcategoryID);
        }
      }
    } catch (error) {
      console.error('Error fetching subcategories:', error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const getInventories = () => {
    const subcat = subcategories.find(
      item => item.subcategoryID === selectedSubcategory,
    );
    return subcat?.inventories || [];
  };

  return (
    <View style={{ flex: 1 }}>
      <Header
        title="Sub-Categories"
        showBackButton={true}
        showProfileButton={true}
      />

      {/* Filters Section */}
      <View style={styles.filterContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {['All', 'Price', 'Rating', 'Popularity', 'Discount'].map(filter => (
            <TouchableOpacity
              key={filter}
              style={[
                styles.filterButton,
                activeFilter === filter && styles.activeFilter,
              ]}
              onPress={() => setActiveFilter(filter)}>
              <Text style={styles.filterText}>{filter}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Main Content */}
      <View style={styles.mainContainer}>
        {/* Left Side - Subcategory List */}
        <ScrollView
          style={styles.leftContainer}
          showsVerticalScrollIndicator={false}>
          {loading
            ? Array.from({ length: 6 }).map((_, index) => (
              <SkeletonPlaceholder key={index}>
                <View style={styles.categoryItem}>
                  <View style={styles.categoryItemImage} />
                  <View style={{ width: 50, height: 10, marginTop: 6 }} />
                </View>
              </SkeletonPlaceholder>
            ))
            : subcategories.map(sub => (
              <TouchableOpacity
                key={sub.subcategoryID}
                style={[
                  styles.categoryItem,
                  selectedSubcategory === sub.subcategoryID &&
                  styles.activeCategory,
                ]}
                onPress={() => setSelectedSubcategory(sub?.subcategoryID)}>
                {sub?.image ? <Image
                  source={{
                    uri: `http://192.168.29.16:8080/${sub?.image?.path.replace(
                      /\\/g,
                      '/',
                    )}`,
                  }}
                  style={styles.categoryItemImage}
                /> : <Image
                  source={require('../../assets/img/placeholder.png')}
                  style={styles.categoryImage}
                />}
                <Text style={styles.categoryItemText}>
                  {sub?.subcategoryName}
                </Text>
              </TouchableOpacity>
            ))}
        </ScrollView>

        {/* Right Side - Inventories */}
        <ScrollView
          style={styles.middleContainer}
          showsVerticalScrollIndicator={false}>
          <View style={styles.gridContainer}>
            {loading
              ? Array.from({ length: 6 }).map((_, index) => (
                <SkeletonPlaceholder key={index}>
                  <View style={styles.categoryCard}>
                    <View style={styles.categoryImage} />
                    <View
                      style={{ width: 60, height: 12, marginVertical: 6 }}
                    />
                    <View style={{ width: 40, height: 10, marginBottom: 10 }} />
                    <View style={{ width: 80, height: 20, borderRadius: 5 }} />
                  </View>
                </SkeletonPlaceholder>
              ))
              : getInventories().map((item, index) => {
                const seller = item.sellers?.[0];
                return (
                  <View key={index} style={styles.categoryCard}>
                    {seller?.seller_inventory?.price && (
                      <View style={styles.discountBadge}>
                        <Text style={styles.discountText}>
                          ₹{seller.seller_inventory.price}
                        </Text>
                      </View>
                    )}
                    {item.image ? <Image
                      source={{
                        uri: `http://192.168.29.16:8080/${item.image.path.replace(
                          /\\/g,
                          '/',
                        )}`,
                      }}
                      style={styles.categoryImage}
                    /> : <Image
                      source={require('../../assets/img/placeholder.png')}
                      style={styles.categoryImage}
                    />}
                    <Text style={styles.categoryName}>{item.name}</Text>
                    <Text style={styles.priceText}>
                      Qty: {seller?.seller_inventory?.quantity}
                    </Text>
                    <TouchableOpacity
                      style={styles.addToCartButton}
                      onPress={() => console.log('Add to Cart:', item.name)}>
                      <Text style={styles.addToCartText}>Add to Cart</Text>
                    </TouchableOpacity>
                  </View>
                );
              })}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  filterContainer: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#F8F8F8',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  filterButton: {
    paddingHorizontal: width * 0.04, // 4% of screen width
    paddingVertical: height * 0.01, // 1% of screen height
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    marginRight: width * 0.02, // 2% of screen width
    elevation: 2,
    marginVertical: height * 0.005, // 0.5% of screen height
  },
  activeFilter: {
    backgroundColor: '#4CAF50',
  },
  filterText: {
    fontSize: width * 0.035, // 3.5% of screen width
    fontWeight: '500',
    color: '#333',
  },
  mainContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  leftContainer: {
    width: width * 0.25, // 25% of screen width
    backgroundColor: '#F8F8F8',
    borderRightWidth: 1,
    borderRightColor: '#E0E0E0',
  },
  categoryItem: {
    padding: height * 0.02, // 2% of screen height
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    alignItems: 'center',
  },
  activeCategory: {
    backgroundColor: '#E0F7FA',
  },
  categoryItemImage: {
    width: width * 0.1, // 10% of screen width
    height: width * 0.1, // 10% of screen width
    marginBottom: height * 0.01, // 1% of screen height
  },
  categoryItemText: {
    fontSize: width * 0.03, // 3% of screen width
    fontWeight: '500',
    color: '#333',
    textAlign: 'center',
  },
  middleContainer: {
    width: width * 0.75, // 75% of screen width
    backgroundColor: '#FFFFFF',
    padding: width * 0.02, // 2% of screen width
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryCard: {
    width: width * 0.35, // 35% of screen width
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
    padding: width * 0.03, // 3% of screen width
    marginBottom: height * 0.02, // 2% of screen height
    elevation: 3,
    position: 'relative',
  },
  discountBadge: {
    position: 'absolute',
    top: height * 0.01, // 1% of screen height
    right: width * 0.02, // 2% of screen width
    backgroundColor: '#FF5722',
    borderRadius: 10,
    paddingHorizontal: width * 0.02, // 2% of screen width
    paddingVertical: height * 0.005, // 0.5% of screen height
  },
  discountText: {
    fontSize: width * 0.03, // 3% of screen width
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  categoryImage: {
    width: width * 0.15, // 20% of screen width
    height: width * 0.15, // 20% of screen width
    marginBottom: height * 0.01, // 1% of screen height
    marginTop: height * 0.03, // 2% of screen height
  },
  categoryName: {
    fontSize: width * 0.03, // 4% of screen width
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
    marginBottom: height * 0.005, // 0.5% of screen height
  },
  priceText: {
    fontSize: width * 0.035, // 3.5% of screen width
    fontWeight: '500',
    color: '#4CAF50',
    marginBottom: height * 0.005, // 0.5% of screen height
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: height * 0.01, // 1% of screen height
  },
  ratingText: {
    fontSize: width * 0.035, // 3.5% of screen width
    fontWeight: '500',
    color: '#333',
    marginLeft: width * 0.01, // 1% of screen width
  },
  addToCartButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 5,
    paddingHorizontal: width * 0.03, // 3% of screen width
    paddingVertical: height * 0.01, // 1% of screen height
  },
  addToCartText: {
    fontSize: width * 0.035, // 3.5% of screen width
    fontWeight: '500',
    color: '#FFFFFF',
  },
});

export default SubCategoriesPage;
