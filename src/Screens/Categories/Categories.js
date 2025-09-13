import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  Animated,
  Dimensions,
} from 'react-native';
import axios from 'axios';
import {useDispatch} from 'react-redux';
import {fetchCategories_Subcategory} from '../../redux/Slicers/categorySlicer';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

  const {width: screenWidth, height: screenHeight} = Dimensions.get('window');


const CategoryScreen = () => {
  const [categories, setCategories] = useState([]);

  const dispatch = useDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    fetchCategoriesDetails();
  }, []);

  const fetchCategoriesDetails = async () => {
    try {
      dispatch(fetchCategories_Subcategory()).then(response => {
        console.log('Categories fetched:', response);
        setCategories(response.data); // adjust path if needed
      });
    } catch (error) {
      console.error('Failed to fetch categories', error);
    }
  };

  console.log('categories.categoryID', categories);

  const renderSubcategoryItem = subcategory => (
    <TouchableOpacity
      key={subcategory.subcategoryID}
      style={styles.categoryItem}
      onPress={() =>
        navigation.navigate('AllProductsPage', {
          subcategoryId: subcategory.subcategoryID,
        })
      }>
      <Image
        source={{
          uri: `http://192.168.29.16:8080/${subcategory.image?.path.replace(
            /\\/g,
            '/',
          )}`,
        }}
        style={styles.categoryImage}
      />
      <Text style={styles.categoryText} numberOfLines={2}>
        {subcategory.subcategoryName}
      </Text>
    </TouchableOpacity>
  );

  const renderCategorySection = category => (
    <View key={category.categoryID} style={styles.sectionContainer}>
      <View style={styles.categoryHeader}>
        <Image
          source={{
            uri: `http://192.168.29.16:8080/${category.image?.path.replace(
              /\\/g,
              '/',
            )}`,
          }}
          style={styles.categoryIcon}
        />
        <Text style={styles.sectionTitle}>{category.categoryName}</Text>
      </View>
      <View style={styles.sectionGrid}>
        {category.subcategories?.map(renderSubcategoryItem)}
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <Animated.View style={[styles.headerContainer]}>
        {/* <Animated.View style={[styles.headerTopRow, {opacity: headerOpacity}]}> */}
        <Animated.View style={[styles.headerTopRow]}>
          <TouchableOpacity
            style={styles.locationButton}
            onPress={() => navigation.navigate('LocationPage')}>
            <Text style={styles.locationHeading}>Deliver To</Text>
            <Text style={styles.locationInfo}>📍 Current Location</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.profileButton}
            onPress={() => navigation.navigate('Profile')}>
            <Image
              source={require('../../assets/img/man.png')}
              style={styles.profileImage}
            />
          </TouchableOpacity>
        </Animated.View>

        <View style={styles.headerBottomRow}>
          <TouchableOpacity
            style={styles.searchBar}
            onPress={() => navigation.navigate('ProductSearch')}>
            <Icon name="search" size={24} color="#666" />
            <Text
              style={{color: '#666', textAlign: 'center', marginLeft: '2%'}}>
              Search for products...
            </Text>
          </TouchableOpacity>
        </View>
      </Animated.View>

      {categories.map(renderCategorySection)}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fefefe',
  },
  header: {
    padding: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#ececec',
  },
  deliveryTime: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  location: {
    fontSize: 13,
    color: '#555',
    marginBottom: 12,
  },
  searchContainer: {
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  searchInput: {
    fontSize: 14,
    color: '#333',
  },
  sectionContainer: {
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 12,
    backgroundColor: '#fff',
  },
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  categoryIcon: {
    width: 28,
    height: 28,
    marginRight: 8,
    borderRadius: 4,
    resizeMode: 'contain',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#222',
  },
  sectionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryItem: {
    width: '30%',
    marginBottom: 16,
    paddingVertical: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    alignItems: 'center',
    elevation: 2,
  },
  categoryImage: {
    width: 32,
    height: 32,
    marginBottom: 6,
    resizeMode: 'contain',
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#444',
    textAlign: 'center',
  },
   headerContainer: {
    backgroundColor: '#FF6F61',
    justifyContent: 'center',
    // borderBottomLeftRadius: 20,
    // borderBottomRightRadius: 20,
    overflow: 'hidden',
  },
  headerTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: screenWidth * 0.04,
    // marginTop: screenHeight * 0.00,
  },
  locationButton: {
    // flexDirection: 'row',
    // alignItems: 'center',
  },
  locationInfo: {
    color: 'white',
    fontSize: screenWidth * 0.035,
    fontWeight: '600',
  },
  locationHeading: {
    color: 'white',
    fontSize: screenWidth * 0.06,
    fontWeight: '700',
  },
  profileButton: {
    width: screenWidth * 0.1,
    height: screenWidth * 0.1,
  },
  profileImage: {
    width: '100%',
    height: '100%',
    borderRadius: screenWidth * 0.05,
  },
  headerBottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: screenWidth * 0.04,
    marginVertical: screenHeight * 0.02,
    // paddingBottom: screenHeight * 0.02,
  },
  searchBar: {
    backgroundColor: 'white',
    borderRadius: 10,
    paddingVertical: screenHeight * 0.015,
    paddingHorizontal: screenWidth * 0.03,
    marginRight: screenWidth * 0.02,
    // marginBottom: screenHeight * 0.02,
    fontSize: screenWidth * 0.04,
    flex: 1,
    maxWidth: screenWidth * 0.9,
    minWidth: screenWidth * 0.7,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default CategoryScreen;
