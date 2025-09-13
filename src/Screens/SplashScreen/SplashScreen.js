import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Image,
  PermissionsAndroid,
  Platform,
  useWindowDimensions, // Import useWindowDimensions
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';
import Geolocation from 'react-native-geolocation-service';
import { AuthContext } from '../../context/AuthContext';
import { useSelector } from 'react-redux';

const SplashScreen = () => {
  const { width, height } = useWindowDimensions(); // Get screen dimensions
  const [animating, setAnimating] = useState(true);
  const navigation = useNavigation();
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const [locationName, setLocationName] = useState('');
  // const {isAuthenticated, loadingData} = useContext(AuthContext);

  const { userData } = useSelector(state => state.loginData);

  console.log('userData', userData)

  const requestLocationPermission = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message: 'This app needs access to your location.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } else {
      return true; // iOS handles permissions differently
    }
  };

  // Function to fetch location
  const fetchLocation = async () => {
    Geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude });
        // dispatch(userLocation({latitude, longitude}));

        // fetchLocationName(latitude, longitude); // Fetch location name
        console.log('Location fetched:', latitude, longitude);
      },
      error => {
        console.error('Error fetching location:', error);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
    );
  };

  // Function to fetch location name using reverse geocoding
  // const fetchLocationName = async (latitude, longitude) => {
  //   const API_KEY = 'YOUR_GOOGLE_MAPS_API_KEY'; // Replace with your API key
  //   const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${API_KEY}`;

  //   try {
  //     const response = await axios.get(url);
  //     console.log('response', response)
  //     if (response.data.results.length > 0) {
  //       const address = response.data.results[0].formatted_address;
  //       console.log('address', address)
  //       setLocationName(address);
  //       dispatch(userLocation({latitude, longitude, address}));
  //       console.log('Location Name:', address);
  //     } else {
  //       console.warn('No results found for the given coordinates.');
  //     }
  //   } catch (error) {
  //     console.error('Error fetching location name:', error);
  //   }
  // };

  useEffect(() => {
    const initialize = async () => {
      const hasPermission = await requestLocationPermission();
      if (hasPermission) {
        fetchLocation();
      } else {
        console.warn('Location permission denied');
      }

      setTimeout(async () => {
        setAnimating(false);
        // navigation.replace('BottomTabs'); // Pass location to dashboard
        // navigation.replace('AuthStack'); // Pass location to auth stack

        try {
          if (userData?.token) {
            // console.log('first')
            navigation.replace('BottomTabs'); // Pass location to dashboard
          } else {
            navigation.replace('AuthStack'); // Pass location to auth stack
          }
        } catch (error) {
          console.error('Error retrieving token:', error);
          navigation.replace('Login'); // Pass location to login
        }
      }, 2000); // 3 seconds delay for splash screen
    };

    initialize();
  }, []);

  // console.log('isAuthenticated', isAuthenticated)
  // useEffect(() => {
  //   setTimeout(() => {
  //     setAnimating(false);
  //     // navigation.replace('AuthStack');
  //   }, 1000);
  // }, []);

  return (
    <View style={styles(width, height).container}>
      <StatusBar backgroundColor={'#FF6F61'} barStyle="light-content" />
      <Animatable.View
        animation="zoomIn"
        duration={1500}
        style={styles(width, height).logoContainer}>
        <Animatable.Image
          animation="pulse"
          iterationCount="infinite"
          duration={2000}
          source={require('../../assets/img/Logo.png')}
          style={styles(width, height).logoStyle}
          resizeMode="contain"
        />
        <Animatable.Text
          animation="fadeInUp"
          duration={1500}
          style={styles(width, height).appTitle}>
          Eatsoo
        </Animatable.Text>
        <Animatable.Text
          animation="fadeInUp"
          duration={1500}
          delay={500}
          style={styles(width, height).appSubtitle}>
          Delivering Happiness
        </Animatable.Text>
      </Animatable.View>
    </View>
  );
};

export default SplashScreen;

// Styles
const styles = (width, height) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#ffffff',
      justifyContent: 'center',
      alignItems: 'center',
    },
    logoContainer: {
      alignItems: 'center',
    },
    logoStyle: {
      width: width * 0.8, // 80% of screen width
      height: width * 0.8, // Maintain aspect ratio
    },
    appTitle: {
      color: '#FF6F61',
      fontSize: width * 0.08, // 8% of screen width
      fontWeight: 'bold',
      marginTop: height * 0.02, // 2% of screen height
    },
    appSubtitle: {
      color: '#FF6F61',
      fontSize: width * 0.045, // 4.5% of screen width
      marginTop: height * 0.01, // 1% of screen height
      fontStyle: 'italic',
    },
  });
