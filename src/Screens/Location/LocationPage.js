import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  Dimensions,
} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import axios from 'axios'; // For reverse geocoding
import Icon from 'react-native-vector-icons/MaterialIcons'; // For icons
import Header from '../../components/Header';

const { width, height } = Dimensions.get('window');

const LocationPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentLocation, setCurrentLocation] = useState(null);
  const [savedLocations, setSavedLocations] = useState([
    { id: 1, name: 'Home', address: '123 Main St, New York, NY' },
    { id: 2, name: 'Office', address: '456 Park Ave, San Francisco, CA' },
  ]);

  // Fetch current location
  const fetchCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCurrentLocation({ latitude, longitude });
        fetchLocationName(latitude, longitude);
      },
      (error) => {
        Alert.alert('Error', 'Unable to fetch current location.');
        console.error('Error fetching location:', error);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
    );
  };

  // Fetch location name using reverse geocoding
  const fetchLocationName = async (latitude, longitude) => {
    const API_KEY = 'YOUR_GOOGLE_MAPS_API_KEY'; // Replace with your API key
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${API_KEY}`;

    try {
      const response = await axios.get(url);
      if (response.data.results.length > 0) {
        const address = response.data.results[0].formatted_address;
        setCurrentLocation((prev) => ({ ...prev, address }));
      } else {
        Alert.alert('Error', 'No address found for the current location.');
      }
    } catch (error) {
      console.error('Error fetching location name:', error);
    }
  };

  // Handle search
  const handleSearch = () => {
    if (searchQuery.trim()) {
      Alert.alert('Search', `You searched for: ${searchQuery}`);
      // Implement search functionality here (e.g., call a geocoding API)
    }
  };

  // Render saved locations
  const renderSavedLocations = () => {
    return savedLocations.map((location) => (
      <TouchableOpacity key={location.id} style={styles.savedLocationCard}>
        <Icon name="location-on" size={width * 0.06} color="#4CAF50" />
        <View style={styles.savedLocationDetails}>
          <Text style={styles.savedLocationName}>{location.name}</Text>
          <Text style={styles.savedLocationAddress}>{location.address}</Text>
        </View>
      </TouchableOpacity>
    ));
  };

  return (
    <View style={{ flex: 1 }}>
      <Header title="Your Location" showBackButton={true} showProfileButton={true} />
      <View style={styles.container}>
        {/* Search Box */}
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search for a location"
            placeholderTextColor="#666"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
            <Icon name="search" size={width * 0.06} color="#FFF" />
          </TouchableOpacity>
        </View>

        {/* Current Location Button */}
        <TouchableOpacity
          style={styles.currentLocationButton}
          onPress={fetchCurrentLocation}>
          <Icon name="my-location" size={width * 0.06} color="#FFF" />
          <Text style={styles.currentLocationButtonText}>
            Use Current Location
          </Text>
        </TouchableOpacity>

        {/* Current Location Display */}
        {currentLocation && (
          <View style={styles.currentLocationContainer}>
            <Text style={styles.currentLocationText}>
              {currentLocation.address || 'Fetching address...'}
            </Text>
          </View>
        )}

        {/* Saved Locations */}
        <Text style={styles.savedLocationsTitle}>Saved Locations</Text>
        <ScrollView>{renderSavedLocations()}</ScrollView>
      </View>
    </View>
  );
};

export default LocationPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
    padding: width * 0.04, // 4% of screen width
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: height * 0.02, // 2% of screen height
  },
  searchInput: {
    flex: 1,
    backgroundColor: '#FFF',
    borderRadius: 10,
    paddingHorizontal: width * 0.04, // 4% of screen width
    paddingVertical: height * 0.02, // 2% of screen height
    fontSize: width * 0.04, // 4% of screen width
    elevation: 5,
    borderWidth: 1,
    borderColor: '#DDD',
  },
  searchButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 10,
    padding: width * 0.03, // 3% of screen width
    marginLeft: width * 0.02, // 2% of screen width
    elevation: 3,
  },
  currentLocationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FF6F61',
    borderRadius: 10,
    padding: height * 0.02, // 2% of screen height
    justifyContent: 'center',
    marginBottom: height * 0.02, // 2% of screen height
    elevation: 3,
  },
  currentLocationButtonText: {
    color: '#FFF',
    fontSize: width * 0.04, // 4% of screen width
    fontWeight: 'bold',
    marginLeft: width * 0.02, // 2% of screen width
  },
  currentLocationContainer: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: width * 0.04, // 4% of screen width
    marginBottom: height * 0.02, // 2% of screen height
    elevation: 3,
  },
  currentLocationText: {
    fontSize: width * 0.04, // 4% of screen width
    color: '#333',
  },
  savedLocationsTitle: {
    fontSize: width * 0.05, // 5% of screen width
    fontWeight: 'bold',
    color: '#333',
    marginBottom: height * 0.02, // 2% of screen height
  },
  savedLocationCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: width * 0.04, // 4% of screen width
    marginBottom: height * 0.02, // 2% of screen height
    elevation: 3,
  },
  savedLocationDetails: {
    marginLeft: width * 0.04, // 4% of screen width
  },
  savedLocationName: {
    fontSize: width * 0.04, // 4% of screen width
    fontWeight: 'bold',
    color: '#333',
  },
  savedLocationAddress: {
    fontSize: width * 0.035, // 3.5% of screen width
    color: '#666',
  },
});