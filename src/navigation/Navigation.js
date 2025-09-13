import React, { useState, useEffect, useContext } from 'react';
import {
  createStackNavigator,
  CardStyleInterpolators,
  TransitionSpecs,
} from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  NavigationContainer,
  createNavigationContainerRef,
} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import Login from '../Screens/LoginSection/Login';
import SplashScreen from '../Screens/SplashScreen/SplashScreen';
import Dashboard from '../Screens/Dashboard/Dashboard';
import RestaurantPage from '../Screens/Restaurant/Restaurant';
import Profile from '../Screens/Profile/Profile';
import MyOrders from '../Screens/MyOrders/Myorders';
import CartPage from '../Screens/Cart/Cart';
import { SafeAreaView } from 'react-native';
import { AuthContext } from '../context/AuthContext'; // Import AuthContext
import CategoriesPage from '../Screens/Categories/Categories';
import OfferPage from '../Screens/Offer/Offer';
import OtpScreen from '../Screens/LoginSection/OtpSection';
import LocationPage from '../Screens/Location/LocationPage';
import ProductSearchPage from '../Screens/Dashboard/ProductSearchPage';
import ProductDetailsPage from '../Screens/ProductDetails/ProductDetails';
import SubCategoriesPage from '../Screens/Categories/Subcategory';
import AllProductsPage from '../Screens/Categories/Product';

const navOptionHandler = {
  headerShown: false,
};

const StackApp = createStackNavigator();
export const navigationRef = createNavigationContainerRef();
const Tab = createBottomTabNavigator();

const AuthStack = () => {
  const stackAuth = createStackNavigator();
  return (
    <stackAuth.Navigator initialRouteName="Login">
      <stackAuth.Screen
        name="Login"
        component={Login}
        options={navOptionHandler}
      />
      <stackAuth.Screen
        name="OtpScreen"
        component={OtpScreen}
        options={navOptionHandler}
      />
    </stackAuth.Navigator>
  );
};

const BottomTabs = () => {
  return (
    <Tab.Navigator
      initialRouteName="Dashboard"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#FF6F61',
        tabBarInactiveTintColor: '#b0b0b0',
        tabBarStyle: {
          position: 'absolute',
          elevation: 8, // Adds shadow for a modern look
          backgroundColor: '#ffffff', // Modern dark background
          borderTopLeftRadius: 20,
          borderWidth: 1,
          borderColor: '#666',
          borderTopRightRadius: 20,
          height: 70, // Increased height for better spacing
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 5 },
          shadowOpacity: 0.1,
          shadowRadius: 10,
          paddingBottom: 10, // Adds space inside the tab bar
          paddingTop: 5,
        },
        tabBarIcon: ({ focused, color }) => {
          let iconName;

          if (route.name === 'Dashboard') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Categories') {
            iconName = focused ? 'grid' : 'grid-outline';
          } else if (route.name === 'Offers') {
            iconName = focused ? 'sparkles' : 'sparkles-outline';
          } else if (route.name === 'Cart') {
            iconName = focused ? 'cart' : 'cart-outline';
          }

          return (
            <Icon
              name={iconName}
              size={focused ? 26 : 24} // Icon size
              color={color}
              style={{
                alignSelf: 'center',
                marginBottom: '1%', // Space between the icon and text
              }}
            />
          );
        },
        tabBarHideOnKeyboard: true,
        tabBarLabelStyle: {
          fontSize: 13, // Font size for text labels
          fontWeight: '600',
          marginTop: '2', // Maintain alignment with icons
          alignSelf: 'center', // Center alignment
        },
      })}>
      <Tab.Screen
        name="Dashboard"
        component={DashboardWithPadding}
        options={{
          tabBarLabel: 'Home',
        }}
      />
      <Tab.Screen
        name="Categories"
        component={CategoriesWithPadding}
        options={{
          tabBarLabel: 'Categories',
        }}
      />
      <Tab.Screen
        name="Offers"
        component={offerPageWithPadding}
        options={{
          tabBarLabel: 'Offers',
        }}
      />
      <Tab.Screen
        name="Cart"
        component={CartPageWithPadding}
        options={{
          tabBarLabel: 'Cart',
        }}
      />
    </Tab.Navigator>
  );
};

// Wrapper components to add dynamic padding
const DashboardWithPadding = () => (
  <SafeAreaView style={{ flex: 1, paddingBottom: 70 }}>
    <Dashboard />
  </SafeAreaView>
);

const CategoriesWithPadding = () => (
  <SafeAreaView style={{ flex: 1, paddingBottom: 70 }}>
    <CategoriesPage />
  </SafeAreaView>
);

const offerPageWithPadding = () => (
  <SafeAreaView style={{ flex: 1, paddingBottom: 70 }}>
    <OfferPage />
  </SafeAreaView>
);

const CartPageWithPadding = () => (
  <SafeAreaView style={{ flex: 1, paddingBottom: 70 }}>
    <CartPage />
  </SafeAreaView>
);

const Navigation = () => {
  const [isLoading, setIsLoading] = useState(true);
  // const {isAuthenticated, loadingData} = useContext(AuthContext);

  // console.log('isAuthenticated', isAuthenticated);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // useEffect(() => {
  //   if (!isLoading) {
  //     if (isAuthenticated) {
  //       navigationRef.reset({
  //         index: 0,
  //         routes: [{name: 'BottomTabs'}],
  //       });
  //     } else {
  //       navigationRef.reset({
  //         index: 0,
  //         routes: [{name: 'AuthStack'}],
  //       });
  //     }
  //   }
  // }, [isAuthenticated, isLoading]);

  return (
    <NavigationContainer ref={navigationRef}>
      <StackApp.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
        {/* {isLoading ? ( // Show SplashScreen while loading */}
        <StackApp.Screen name="Splash" component={SplashScreen} />
        <StackApp.Screen name="AuthStack" component={AuthStack} />
        <StackApp.Screen name="BottomTabs" component={BottomTabs} />
        <StackApp.Screen name="Restaurant" component={RestaurantPage} />
        <StackApp.Screen name="Profile" component={Profile} />
        <StackApp.Screen name="LocationPage" component={LocationPage} />
        <StackApp.Screen
          name="ProductSearch"
          component={ProductSearchPage}
        />
        <StackApp.Screen
          name="ProductDetails"
          component={ProductDetailsPage}
        />
        <StackApp.Screen
          name="SubCategories"
          component={SubCategoriesPage}
        />
        <StackApp.Screen
          name="AllProductsPage"
          component={AllProductsPage}
        />
        {/* // ) : isAuthenticated ? ( // Once loading is done, check authentication */}
        <>

        </>
        {/* ) : ( */}
        {/* <StackApp.Screen name="AuthStack" component={AuthStack} /> */}
        {/* )} */}
      </StackApp.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
