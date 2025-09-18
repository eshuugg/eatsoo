import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Switch,
  Animated,
  StatusBar,
  Dimensions,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from '../../redux/Slicers/DashboardSlicer';
import Carousel from '../../components/Crousel/Crousel';
import { fetchInventoryDataBySubId, fetchSubCatWithInv_LAT_LNGDataByCatId } from '../../redux/Slicers/SubcategorySlicer';
import LongCrousel from '../../components/Crousel/LongCrousel';
// import Carousel from 'react-native-snap-carousel';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

// Carousel Data
const carouselData = [
  {
    image: require('../../assets/img/carousel1.jpg'),
    title: '50% Off on Fruits',
    subtitle: 'Grab fresh fruits at half price!',
  },
  {
    image: require('../../assets/img/carousel2.jpg'),
    title: 'Free Delivery',
    subtitle: 'On orders above ₹499',
  },
  {
    image: require('../../assets/img/carousel3.jpg'),
    title: 'Buy 1 Get 1 Free',
    subtitle: 'On selected snacks',
  },
];

// Categories Data
// const categories = [
//   {name: 'Fruits & Veg', image: require('../../assets/img/fruit.png')},
//   {name: 'Dairy & Eggs', image: require('../../assets/img/milk-box.png')},
//   {name: 'Snacks', image: require('../../assets/img/snacks.png')},
//   {name: 'Beverages', image: require('../../assets/img/cocktail.png')},
//   {name: 'Personal Care', image: require('../../assets/img/cream.png')},
//   {name: 'Home Care', image: require('../../assets/img/home.png')},
//   {name: 'Baby Care', image: require('../../assets/img/baby.png')},
//   {name: 'Pet Care', image: require('../../assets/img/pet-food.png')},
// ];

// Trending Products Data
const trendingProducts = [
  {
    name: 'Fresh Apples',
    price: '₹120',
    image: require('../../assets/img/apple.png'),
    rating: '4.5 ★',
  },
  {
    name: 'Organic Milk',
    price: '₹60',
    image: require('../../assets/img/milk-box.png'),
    rating: '4.3 ★',
  },
  {
    name: 'Potato Chips',
    price: '₹40',
    image: require('../../assets/img/potato-chips.png'),
    rating: '4.2 ★',
  },
  {
    name: 'Mineral Water',
    price: '₹20',
    image: require('../../assets/img/water-drop.png'),
    rating: '4.7 ★',
  },
];

// Category-wise Products Data
// const categoryProducts = {
//   'Fruits & Veg': [
//     {
//       name: 'Fresh Bananas',
//       price: '₹50',
//       image: require('../../assets/img/banana.png'),
//     },
//     {
//       name: 'Organic Oranges',
//       price: '₹80',
//       image: require('../../assets/img/orange.png'),
//     },
//     {
//       name: 'Fresh Strawberry',
//       price: '₹150',
//       image: require('../../assets/img/strawberry.png'),
//     },
//   ],
//   'Dairy & Eggs': [
//     {
//       name: 'Cow Milk',
//       price: '₹60',
//       image: require('../../assets/img/milk-box.png'),
//     },
//     {
//       name: 'Eggs',
//       price: '₹80',
//       image: require('../../assets/img/eggs.png'),
//     },
//     {
//       name: 'Bread',
//       price: '₹40',
//       image: require('../../assets/img/bread.png'),
//     },
//   ],
//   'Snacks': [
//     {
//       name: 'Chips',
//       price: '₹60',
//       image: require('../../assets/img/snacks.png'),
//     },
//     {
//       name: 'Nachos',
//       price: '₹80',
//       image: require('../../assets/img/nachos.png'),
//     },
//     {
//       name: 'Bread',
//       price: '₹40',
//       image: require('../../assets/img/bread.png'),
//     },
//   ],
//   // Add more categories and products as needed
// };

// Local Shops Data
const localShops = [
  {
    id: 1,
    name: 'Fresh Mart',
    image: require('../../assets/img/fresh-mart.png'), // Replace with actual image
    rating: 4.5,
    distance: '1.2 km',
    category: 'Groceries',
  },
  {
    id: 2,
    name: 'Bake House',
    image: require('../../assets/img/bake-house.png'), // Replace with actual image
    rating: 4.7,
    distance: '0.8 km',
    category: 'Bakery',
  },
  {
    id: 3,
    name: 'Green Veggies',
    image: require('../../assets/img/green-veggies.png'), // Replace with actual image
    rating: 4.2,
    distance: '2.5 km',
    category: 'Vegetables',
  },
  {
    id: 4,
    name: 'Daily Dairy',
    image: require('../../assets/img/daily-dairy.png'), // Replace with actual image
    rating: 4.4,
    distance: '1.5 km',
    category: 'Dairy',
  },
];

const categoryProducts = {
  'Fruits & Veg': [
    {
      id: '1',
      name: 'Fresh Apples',
      price: 12.99,
      discount: 10, // 10% discount
      image: require('../../assets/img/apple.png'),
    },
    {
      id: '2',
      name: 'Organic Oranges',
      price: 8.99,
      discount: 15, // 15% discount
      image: require('../../assets/img/orange.png'),
    },
  ],
  'Dairy & Eggs': [
    {
      id: '3',
      name: 'Cow Milk',
      price: 6.99,
      image: require('../../assets/img/milk-box.png'),
    },
    {
      id: '4',
      name: 'Eggs',
      price: 4.99,
      discount: 5, // 5% discount
      image: require('../../assets/img/eggs.png'),
    },
  ],
  // Add more categories and products as needed
};

const superDiscountProducts = [
  {
    id: '1',
    name: 'Fresh Apples',
    price: 12.99,
    discount: 20, // 20% discount
    image: require('../../assets/img/carousel1.jpg'),
  },
  {
    id: '2',
    name: 'Organic Milk',
    price: 6.99,
    discount: 15, // 15% discount
    image: require('../../assets/img/carousel2.jpg'),
  },
  {
    id: '3',
    name: 'Potato Chips',
    price: 4.99,
    discount: 10, // 10% discount
    image: require('../../assets/img/carousel3.jpg'),
  },
  {
    id: '4',
    name: 'Potato Chips',
    price: 4.99,
    discount: 10, // 10% discount
    image: require('../../assets/img/carousel3.jpg'),
  },
  {
    id: '5',
    name: 'Potato Chips',
    price: 4.99,
    discount: 10, // 10% discount
    image: require('../../assets/img/carousel3.jpg'),
  },
  {
    id: '6',
    name: 'Potato Chips',
    price: 4.99,
    discount: 10, // 10% discount
    image: require('../../assets/img/carousel3.jpg'),
  },
];

const hourlyDiscountProducts = [
  {
    id: '4',
    name: 'Chocolate Cake',
    price: 8.99,
    discount: 25, // 25% discount
    image: require('../../assets/img/birthday-cake.png'),
  },
  {
    id: '5',
    name: 'Iced Tea',
    price: 3.49,
    discount: 30, // 30% discount
    image: require('../../assets/img/ice-tea.png'),
  },
  {
    id: '6',
    name: 'Fresh Bananas',
    price: 5.99,
    discount: 20, // 20% discount
    image: require('../../assets/img/banana.png'),
  },
];

const Dashboard = props => {
  const carouselRef = useRef(null);
  const [isVegMode, setVegMode] = useState(false);
  const [categories, setCategories] = useState([]);
  const [subcategoryData, setSubcategoryData] = useState();


  const navigation = useNavigation();
  const { location } = useSelector(state => state.loginData);

  const dispatch = useDispatch();

  useEffect(() => {
    // Fetch data from API
    dispatch(fetchCategories()).then(res => {
      console.log('res', res);
      if (res?.data) {
        setCategories(res?.data);
      }
      console.log('Categories fetched:', res);
    });

  }, []);

  useEffect(() => {
    dispatch(fetchInventoryDataBySubId(1)).then(res => {
      console.log('res', res)
      if (res?.success) {
        setSubcategoryData(res)
      }
    });
  }, []);

  // const scrollY = React.useRef(new Animated.Value(0)).current;

  // const headerHeight = scrollY.interpolate({
  //   inputRange: [0, 100],
  //   outputRange: [screenHeight * 0.18, screenHeight * 0.14], // Adjusted based on screen height
  //   extrapolate: 'clamp',
  // });

  // const headerOpacity = scrollY.interpolate({
  //   inputRange: [0, 50],
  //   outputRange: [1, 1],
  //   extrapolate: 'clamp',
  // });

  // Render Carousel Item
  const renderCarouselItem = ({ item, index }) => {
    return (
      <View style={styles.carouselItem}>
        <Image source={item.image} style={styles.carouselImage} />
        <View style={styles.carouselTextContainer}>
          <Text style={styles.carouselTitle}>{item.title}</Text>
          <Text style={styles.carouselSubtitle}>{item.subtitle}</Text>
        </View>
      </View>
    );
  };

  // Render Trending Product Item
  const renderTrendingProduct = ({ item }) => {
    return (
      <TouchableOpacity style={styles.trendingProductCard}>
        <Image source={item.image} style={styles.trendingProductImage} />
        <Text style={styles.trendingProductName}>{item.name}</Text>
        <Text style={styles.trendingProductPrice}>{item.price}</Text>
        <Text style={styles.trendingProductRating}>{item.rating}</Text>
      </TouchableOpacity>
    );
  };

  // Render Category Section
  const renderCategorySection = (category, navigation) => {
    const products = categoryProducts[category.name] || [];
    return (
      <View key={category.name} style={styles.categorySection}>
        <Text style={styles.sectionTitle}>{category.name}</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {products.slice(0, 3).map((product, index) => (
            <TouchableOpacity key={index} style={styles.categoryProductCard}>
              {/* Discount Badge */}
              {product.discount && (
                <View style={styles.discountBadge}>
                  <Text style={styles.discountText}>
                    {product.discount}% OFF
                  </Text>
                </View>
              )}
              <Image
                source={product.image}
                style={styles.categoryProductImage}
              />
              <Text style={styles.categoryProductName}>{product.name}</Text>
              {/* Price with Discount */}
              {product.discount ? (
                <View style={styles.priceContainer}>
                  <Text style={styles.originalPrice}>
                    ₹{product.price.toFixed(2)}
                  </Text>
                  <Text style={styles.discountedPrice}>
                    ₹{(product.price * (1 - product.discount / 100)).toFixed(2)}
                  </Text>
                </View>
              ) : (
                <Text style={styles.categoryProductPrice}>
                  ₹{product.price.toFixed(2)}
                </Text>
              )}
              {/* Add to Cart Button */}
              <TouchableOpacity
                style={styles.addToCartButton}
                onPress={() =>
                  Alert.alert('Added to Cart', `₹{product.name} added to cart!`)
                }>
                <Text style={styles.addToCartText}>Add to Cart</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          ))}
          {/* "See All" Card */}
          <TouchableOpacity
            style={styles.seeAllCard}
            onPress={() =>
              navigation.navigate('CategoryDetails', {
                categoryName: category.name,
              })
            }>
            <Text style={styles.seeAllText}>See All</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  };

  const handleProductDetails = (dta) => {
    // console.log('dta', dta)
    navigation.navigate("ProductDetails", { productData: dta })
  }

  const handleAddToCart = product => {
    console.log('product', product)
  };

  console.log('subcategoryData', subcategoryData)

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={'#FF6F61'} />
      {/* <Animated.View style={[styles.headerContainer, {height: headerHeight}]}> */}
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
              style={{ color: '#666', textAlign: 'center', marginLeft: '2%' }}>
              Search for products...
            </Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
      <Animated.ScrollView
        style={styles.scrollView}
        // onScroll={Animated.event(
        //   [{nativeEvent: {contentOffset: {y: scrollY}}}],
        //   {useNativeDriver: false},
        // )}
        scrollEventThrottle={16}>
        {/* Carousel Section */}
        {/* <View style={styles.carouselContainer}>
          <Carousel
            ref={carouselRef}
            data={carouselData}
            renderItem={renderCarouselItem}
            sliderWidth={screenWidth}
            itemWidth={screenWidth * 0.8}
            layout={'default'}
            loop={true}
            autoplay={true}
            autoplayInterval={3000}
            inactiveSlideScale={0.94}
            inactiveSlideOpacity={0.7}
          />
        </View> */}

        {/* Categories Section */}
        <View style={styles.categoriesContainer}>
          <Text style={styles.sectionTitle}>Shop by Category</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalScroll}>
            <View style={styles.categoryGrid}>
              {categories?.map(category => (
                <TouchableOpacity
                  key={category?.categoryID}
                  style={styles.categoryCard}
                  onPress={() =>
                    navigation.navigate('SubCategories', {
                      categoryId: category?.categoryID,
                    })
                  }>
                  {category?.image ? <Image
                    source={{
                      uri: `http://192.168.29.16:8080/${category?.image?.path.replace(
                        /\\/g,
                        '/',
                      )}`,
                    }}
                    style={styles.categoryImage}
                  /> : <Image
                    source={require('../../assets/img/placeholder.png')}
                    style={styles.categoryImage}
                  />}
                  <Text style={styles.categoryName}>
                    {category.categoryName}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>
        <View style={styles.carouselContainer}>
          <Carousel superDiscountProducts={superDiscountProducts} />
        </View>
        <View style={styles.discountSection}>
          <Text style={styles.sectionTitle}>🔥 {subcategoryData?.subcategory?.subcategoryName}</Text>

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {subcategoryData?.inventory.map((product, index) => (
              <TouchableOpacity key={index} style={styles.discountProductCard} onPress={() => handleProductDetails(product)}>
                {product?.discount && (
                  <View style={styles.discountBadge}>
                    <Text style={styles.discountText}>
                      {product?.discount}% OFF
                    </Text>
                  </View>
                )}
                {product?.image ? <Image
                  source={{
                    uri: `http://192.168.29.16:8080/${product?.image?.path.replace(
                      /\\/g,
                      '/',
                    )}`,
                  }}
                  style={styles.discountProductImage}
                /> : <Image
                  source={require('../../assets/img/placeholder.png')}
                  style={styles.categoryImage}
                />}
                <Text style={styles.discountProductName}>{product.name}</Text>

                {product?.discount ? (
                  <View style={styles.priceContainer}>
                    <Text style={styles.originalPrice}>
                      ₹{product.price.toFixed(2)}
                    </Text>
                    <Text style={styles.discountedPrice}>
                      ₹
                      {(product?.sellers[0]?.seller_inventory?.price * (1 - product?.discount / 100)).toFixed(
                        2,
                      )}
                    </Text>
                  </View>
                ) : (
                  <Text style={styles.discountProductPrice}>
                    ₹{product?.sellers[0]?.seller_inventory?.price}
                  </Text>
                )}

                <TouchableOpacity
                  style={styles.addToCartButton}
                  onPress={() => handleAddToCart(product)}>
                  <Text style={styles.addToCartText}>Add to Cart</Text>
                </TouchableOpacity>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={styles.discountSection}>
          {/* Hourly Discount Banner (Image) */}
          {/* <Image
            source={require('../../assets/img/hourly_discount_banner.png')} // Replace with your image
            style={styles.discountBannerImage}
          /> */}
          {/* Hourly Discount Products */}
          <Text style={styles.sectionTitle}>Hourly Discount</Text>

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {hourlyDiscountProducts.map((product, index) => (
              <TouchableOpacity
                key={index}
                style={styles.discountProductCard}
                onPress={() =>
                  navigation.navigate('ProductDetails', { product })
                }>
                {/* Discount Badge */}
                {product.discount && (
                  <View style={styles.discountBadge}>
                    <Text style={styles.discountText}>
                      {product.discount}% OFF
                    </Text>
                  </View>
                )}
                {product?.image ? <Image
                  source={product.image}
                  style={styles.discountProductImage}
                /> : <Image
                  source={require('../../assets/img/placeholder.png')}
                  style={styles.categoryImage}
                />}
                <Text style={styles.discountProductName}>{product.name}</Text>
                {/* Price with Discount */}
                {product.discount ? (
                  <View style={styles.priceContainer}>
                    <Text style={styles.originalPrice}>
                      ₹{product.price.toFixed(2)}
                    </Text>
                    <Text style={styles.discountedPrice}>
                      ₹
                      {(product.price * (1 - product.discount / 100)).toFixed(
                        2,
                      )}
                    </Text>
                  </View>
                ) : (
                  <Text style={styles.discountProductPrice}>
                    ₹{product.price.toFixed(2)}
                  </Text>
                )}
                {/* Add to Cart Button */}
                <TouchableOpacity
                  style={styles.addToCartButton}
                  onPress={() =>
                    Alert.alert(
                      'Added to Cart',
                      `${product.name} added to cart!`,
                    )
                  }>
                  <Text style={styles.addToCartText}>Add to Cart</Text>
                </TouchableOpacity>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Trending Section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Trending Now</Text>
          <LongCrousel superDiscountProducts={superDiscountProducts} />

          {/* <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {trendingProducts.map((product, index) => (
              <TouchableOpacity key={index} style={styles.trendingProductCard}>
                {product.discount && (
                  <View style={styles.discountBadge}>
                    <Text style={styles.discountText}>{product.discount}</Text>
                  </View>
                )}
                {product?.image ? <Image
                  source={product.image}
                  style={styles.trendingProductImage}
                /> : <Image
                  source={require('../../assets/img/placeholder.png')}
                  style={styles.categoryImage}
                />}
                <Text style={styles.trendingProductName}>{product.name}</Text>
                <Text style={styles.trendingProductPrice}>{product.price}</Text>
                <Text style={styles.trendingProductRating}>
                  {product.rating}
                </Text>
                <TouchableOpacity
                  style={styles.addToCartButton}
                  onPress={() => handleAddToCart(product)}>
                  <Text style={styles.addToCartButtonText}>Add to Cart</Text>
                </TouchableOpacity>
              </TouchableOpacity>
            ))}
          </ScrollView> */}
        </View>
        <View style={styles.shopContainer}>
          <Text style={styles.sectionTitle}>Local Shops Near You</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {localShops.map(shop => (
              <TouchableOpacity
                key={shop.id}
                style={styles.shopCard}
                onPress={() => navigation.navigate('ShopDetails', { shop })}>
                {shop?.image ? <Image source={shop.image} style={styles.shopImage} /> : <Image
                  source={require('../../assets/img/placeholder.png')}
                  style={styles.categoryImage}
                />}
                <View style={styles.shopDetails}>
                  <Text style={styles.shopName}>{shop.name}</Text>
                  <View style={styles.ratingContainer}>
                    <Icon name="star" size={16} color="#FFD700" />
                    <Text style={styles.ratingText}>{shop.rating}</Text>
                  </View>
                  <Text style={styles.shopCategory}>{shop.category}</Text>
                  <Text style={styles.shopDistance}>{shop.distance} away</Text>
                  <TouchableOpacity
                    style={styles.visitButton}
                    onPress={() => navigation.navigate('ShopDetails', { shop })}>
                    <Text style={styles.visitButtonText}>Visit Shop</Text>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Single Category Sections */}
        {/* {categories.map(category => renderCategorySection(category))} */}
      </Animated.ScrollView>
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
  carouselContainer: {
    // marginBottom: 20,
  },
  carouselItem: {
    width: '100%',
    height: screenHeight * 0.2,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: 'white',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  carouselImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  carouselTextContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 15,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  carouselTitle: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
  },
  carouselSubtitle: {
    color: 'white',
    fontSize: 16,
  },
  scrollContent: {
    paddingTop: screenHeight * 0.22 + 20, // Adjust based on your header height
  },
  categoriesContainer: {
    padding: screenWidth * 0.02,
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryCard: {
    width: screenWidth * 0.21,
    alignItems: 'center',
    marginBottom: screenHeight * 0.01,
    marginTop: screenHeight * 0.01,
  },
  // horizontalScroll: {
  //   paddingHorizontal: 10,
  // },
  categoryImage: {
    width: screenWidth * 0.13,
    height: screenWidth * 0.13,
    // borderRadius: screenWidth * 0.075,
    marginBottom: screenHeight * 0.01,
  },
  categoryName: {
    fontSize: screenWidth * 0.03,
    fontWeight: '600',
    textAlign: 'center',
  },
  sectionContainer: {
    // padding: screenWidth * 0.04,
  },
  // sectionTitle: {
  //   fontSize: screenWidth * 0.05,
  //   fontWeight: 'bold',
  //   fontStyle: 'italic', // 👈 Makes the font italic
  //   color: '#FF5722', // Bright and eye-catching color
  //   fontFamily: Platform.select({
  //     ios: 'Arial Rounded MT Bold',
  //     android: 'sans-serif-medium',
  //   }),
  //   textTransform: 'uppercase', // You can replace with any custom font
  //   color: '#FF6F00', // deep orange for emphasis
  //   marginBottom: screenHeight * 0.01,
  // },
  sectionTitle: {
    fontSize: screenWidth * 0.05,
    fontWeight: 'bold',
    marginBottom: screenHeight * 0.01,
    paddingHorizontal: screenWidth * 0.04,
  },
  trendingProductCard: {
    marginRight: screenWidth * 0.04,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: screenWidth * 0.03,
    alignItems: 'center',
    elevation: 3,
    marginVertical: screenHeight * 0.01,
  },
  trendingProductImage: {
    width: screenWidth * 0.18,
    height: screenWidth * 0.18,
    borderRadius: 10,
  },
  trendingProductName: {
    fontSize: screenWidth * 0.035,
    fontWeight: 'bold',
    marginTop: screenHeight * 0.01,
  },
  trendingProductPrice: {
    fontSize: screenWidth * 0.035,
    color: '#FF6F61',
    marginTop: screenHeight * 0.01,
  },
  trendingProductRating: {
    fontSize: screenWidth * 0.03,
    color: 'gray',
    marginTop: screenHeight * 0.01,
  },
  addToCartButtonText: {
    fontSize: screenWidth * 0.035,
    fontWeight: 'bold',
    color: 'white',
  },
  categorySection: {
    marginBottom: screenHeight * 0.02,
    padding: screenWidth * 0.03,
  },
  categoryProductCard: {
    marginRight: screenWidth * 0.02,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: screenWidth * 0.03,
    alignItems: 'center',
    elevation: 3,
    width: screenWidth * 0.35,
    position: 'relative',
    marginVertical: screenHeight * 0.01,
  },
  categoryProductImage: {
    width: screenWidth * 0.18,
    height: screenWidth * 0.18,
    borderRadius: 10,
    marginTop: screenHeight * 0.05,
  },
  categoryProductName: {
    fontSize: screenWidth * 0.035,
    fontWeight: 'bold',
    marginTop: screenHeight * 0.01,
    textAlign: 'center',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: screenHeight * 0.01,
  },
  originalPrice: {
    fontSize: screenWidth * 0.035,
    color: '#888',
    textDecorationLine: 'line-through',
    marginRight: screenWidth * 0.01,
  },
  discountedPrice: {
    fontSize: screenWidth * 0.04,
    fontWeight: 'bold',
    color: '#FF6F61',
  },
  categoryProductPrice: {
    fontSize: screenWidth * 0.04,
    fontWeight: 'bold',
    color: '#333',
    marginTop: screenHeight * 0.01,
  },
  discountBadge: {
    position: 'absolute',
    top: screenHeight * 0.01,
    right: screenWidth * 0.02,
    backgroundColor: '#FF6F61',
    borderRadius: 10,
    paddingHorizontal: screenWidth * 0.02,
    paddingVertical: screenHeight * 0.01,
  },
  discountText: {
    fontSize: screenWidth * 0.03,
    fontWeight: 'bold',
    color: 'white',
  },
  addToCartButton: {
    backgroundColor: '#FF6F61',
    borderRadius: 5,
    paddingVertical: screenHeight * 0.01,
    paddingHorizontal: screenWidth * 0.03,
    marginTop: screenHeight * 0.01,
  },
  addToCartText: {
    fontSize: screenWidth * 0.035,
    fontWeight: 'bold',
    color: 'white',
  },
  seeAllCard: {
    marginRight: screenWidth * 0.04,
    backgroundColor: '#FF6F61',
    borderRadius: 10,
    padding: screenWidth * 0.03,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
    marginVertical: screenHeight * 0.01,
    width: screenWidth * 0.2,
  },
  seeAllText: {
    fontSize: screenWidth * 0.035,
    fontWeight: 'bold',
    color: 'white',
  },
  discountSection: {
    backgroundColor: '#FFF4E5', // soft orange/yellow background
    paddingVertical: 16,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  superdiscountBannerImage: {
    width: '100%',
    height: screenHeight * 0.25,
    resizeMode: 'cover',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  discountBannerImage: {
    width: '100%',
    height: screenHeight * 0.35,
    resizeMode: 'cover',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  discountProductCard: {
    marginRight: screenWidth * 0.02,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: screenWidth * 0.03,
    alignItems: 'center',
    elevation: 3,
    width: screenWidth * 0.35,
    marginVertical: screenHeight * 0.01,
    marginTop: screenHeight * 0.01,
  },
  discountProductImage: {
    width: screenWidth * 0.18,
    height: screenWidth * 0.18,
    borderRadius: 10,
    marginTop: screenHeight * 0.05,
  },
  discountProductName: {
    fontSize: screenWidth * 0.035,
    fontWeight: 'bold',
    marginTop: screenHeight * 0.01,
    textAlign: 'center',
  },
  discountProductPrice: {
    fontSize: screenWidth * 0.04,
    fontWeight: 'bold',
    color: '#333',
    marginTop: screenHeight * 0.01,
  },
  shopContainer: {
    marginVertical: screenHeight * 0.02,
  },
  shopCard: {
    width: screenWidth * 0.35,
    backgroundColor: 'white',
    borderRadius: 10,
    overflow: 'hidden',
    marginRight: screenWidth * 0.04,
    elevation: 3,
    alignItems: 'center',
    marginBottom: screenHeight * 0.01,
  },
  shopImage: {
    width: screenWidth * 0.18,
    height: screenWidth * 0.18,
    marginTop: screenHeight * 0.02,
  },
  shopDetails: {
    padding: screenWidth * 0.03,
    alignItems: 'center',
  },
  shopName: {
    fontSize: screenWidth * 0.04,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: screenHeight * 0.01,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: screenHeight * 0.01,
  },
  ratingText: {
    fontSize: screenWidth * 0.035,
    color: '#333',
    marginLeft: screenWidth * 0.01,
  },
  shopCategory: {
    fontSize: screenWidth * 0.035,
    color: '#666',
    marginBottom: screenHeight * 0.01,
  },
  shopDistance: {
    fontSize: screenWidth * 0.03,
    color: '#888',
    marginBottom: screenHeight * 0.01,
  },
  visitButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 5,
    paddingVertical: screenHeight * 0.01,
    paddingHorizontal: screenWidth * 0.03,
  },
  visitButtonText: {
    fontSize: screenWidth * 0.035,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default Dashboard;
