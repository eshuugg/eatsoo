import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';

const CategoryScreen = () => {
  const categories = [
    { name: 'Fruits & Veg', image: require('../../assets/img/fruit.png') },
    { name: 'Dairy & Eggs', image: require('../../assets/img/milk-box.png') },
    { name: 'Snacks', image: require('../../assets/img/snacks.png') },
    { name: 'Beverages', image: require('../../assets/img/cocktail.png') },
    { name: 'Personal Care', image: require('../../assets/img/cream.png') },
    { name: 'Home Care', image: require('../../assets/img/home.png') },
    { name: 'Baby Care', image: require('../../assets/img/baby.png') },
    { name: 'Pet Care', image: require('../../assets/img/pet-food.png') },
  ];

  // Group categories into sections like in the image
  const groceryCategories = categories.filter(cat => 
    ['Fruits & Veg', 'Dairy & Eggs'].includes(cat.name)
  );
  const snackCategories = categories.filter(cat => 
    ['Snacks', 'Beverages'].includes(cat.name)
  );
  const beautyCategories = categories.filter(cat => 
    ['Personal Care'].includes(cat.name)
  );

  const renderCategoryItem = (category) => (
    <TouchableOpacity key={category.name} style={styles.categoryItem}>
      <Image source={category.image} style={styles.categoryImage} />
      <Text style={styles.categoryText}>{category.name}</Text>
    </TouchableOpacity>
  );

  const renderCategorySection = (title, categoryList) => (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.sectionGrid}>
        {categoryList.map(renderCategoryItem)}
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      {/* Header with location and search */}
      <View style={styles.header}>
        <Text style={styles.deliveryTime}>18 minutes • surge applicable</Text>
        <Text style={styles.location}>Krishnapur, Rajarhat, Presidency Division, West Bengal</Text>
        <View style={styles.searchContainer}>
          <Text style={styles.searchText}>Search "kajal"</Text>
        </View>
      </View>

      {/* Category sections */}
      {renderCategorySection('Grocery & Kitchen', groceryCategories)}
      {renderCategorySection('Snacks & Drinks', snackCategories)}
      {renderCategorySection('Beauty & Personal Care', beautyCategories)}

      {/* Additional links from the image */}
      <View style={styles.bottomLinks}>
        <Text style={styles.bottomLinkText}>Order Again</Text>
        <Text style={styles.bottomLinkText}>Categories</Text>
        <Text style={styles.bottomLinkText}>Print</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  deliveryTime: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  location: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  searchContainer: {
    backgroundColor: '#f5f5f5',
    padding: 12,
    borderRadius: 8,
  },
  searchText: {
    color: '#888',
  },
  sectionContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  sectionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryItem: {
    width: '48%',
    alignItems: 'center',
    marginBottom: 16,
    padding: 12,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
  },
  categoryImage: {
    width: 50,
    height: 50,
    marginBottom: 8,
  },
  categoryText: {
    fontSize: 14,
    textAlign: 'center',
  },
  bottomLinks: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 16,
  },
  bottomLinkText: {
    fontSize: 14,
    color: '#666',
  },
});

export default CategoryScreen;