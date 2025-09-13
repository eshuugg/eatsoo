import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  FlatList,
  Dimensions,
  PixelRatio,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // For icons
import Header from '../../components/Header';

// Get screen dimensions
const { width, height } = Dimensions.get('window');

// Function to normalize font size based on screen width
const normalizeFontSize = (size) => {
  const scale = width / 320; // 320 is the base width (e.g., iPhone SE)
  const newSize = size * scale;
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
};

// Mock search history data
const searchHistory = [
  {
    id: 1,
    name: 'Apple',
    image: require('../../assets/img/apple.png'), // Replace with actual image
  },
  {
    id: 2,
    name: 'Banana',
    image: require('../../assets/img/banana.png'), // Replace with actual image
  },
  {
    id: 3,
    name: 'Milk',
    image: require('../../assets/img/milk-box.png'), // Replace with actual image
  },
  {
    id: 4,
    name: 'Bread',
    image: require('../../assets/img/bread.png'), // Replace with actual image
  },
];

const ProductSearchPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [history, setHistory] = useState(searchHistory);

  // Handle search
  const handleSearch = () => {
    if (searchQuery.trim()) {
      Alert.alert('Search', `You searched for: ${searchQuery}`);
      // Implement search functionality here (e.g., call an API)
    }
  };

  // Render search history item
  const renderSearchHistoryItem = ({ item }) => (
    <TouchableOpacity
      style={styles.historyItem}
      onPress={() => setSearchQuery(item.name)}>
      <Image source={item.image} style={styles.historyItemImage} />
      <Text style={styles.historyItemText}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1 }}>
      <Header title="Search your product" showBackButton={true} showProfileButton={true} />
      <View style={styles.container}>
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search for products..."
            placeholderTextColor={'#777'}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
            <Icon name="search" size={normalizeFontSize(24)} color="#FFF" />
          </TouchableOpacity>
        </View>

        {/* Search History */}
        <Text style={styles.historyTitle}>Recent Searches</Text>
        <FlatList
          data={history}
          renderItem={renderSearchHistoryItem}
          keyExtractor={item => item.id.toString()}
          numColumns={2} // Display 2 items per row
          contentContainerStyle={styles.historyList}
        />
      </View>
    </View>
  );
};

export default ProductSearchPage;

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
    paddingVertical: height * 0.015, // 1.5% of screen height
    fontSize: normalizeFontSize(13), // Normalized font size
    elevation: 3,
  },
  searchButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 10,
    padding: height * 0.008, // 1.5% of screen height
    marginLeft: width * 0.02, // 2% of screen width
    elevation: 3,
  },
  historyTitle: {
    fontSize: normalizeFontSize(16), // Normalized font size
    fontWeight: 'bold',
    color: '#333',
    marginBottom: height * 0.02, // 2% of screen height
  },
  historyList: {
    paddingBottom: height * 0.02, // 2% of screen height
  },
  historyItem: {
    flex: 1,
    backgroundColor: '#FFF',
    borderRadius: 10,
    alignItems: 'center',
    padding: width * 0.03, // 3% of screen width
    margin: width * 0.01, // 1% of screen width
    elevation: 3,
  },
  historyItemImage: {
    width: width * 0.2, // 20% of screen width
    height: width * 0.2, // 20% of screen width
    marginBottom: height * 0.01, // 1% of screen height
  },
  historyItemText: {
    fontSize: normalizeFontSize(13), // Normalized font size
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
  },
});