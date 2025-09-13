import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native'; // For navigation
import Ionicons from 'react-native-vector-icons/Ionicons'; // Or your preferred icon library

const Header = ({title, showBackButton = false, showProfileButton = true,bgColor}) => {
  const navigation = useNavigation();

  return (
    <View style={[styles.header, {backgroundColor: bgColor}]}>
      {/* Back Button (Conditional) */}
      {showBackButton && (
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}>
          <Ionicons name="arrow-back" size={28} color="#000" />
        </TouchableOpacity>
      )}

      {/* Title */}
      <Text style={styles.headerTitle}>{title}</Text>

      {/* Profile Button (Conditional) */}
      {showProfileButton && (
        <TouchableOpacity
          onPress={() => navigation.navigate('Profile')}
          style={styles.profileButton}>
          <Image
            source={require('../assets/img/man.png')}
            style={styles.profileIcon}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#FFFFFF',
    // borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  backButton: {
    padding: 5,
  },
  backIcon: {
    width: 24,
    height: 24,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
    flex: 1,
    marginHorizontal: 10, // Add margin to avoid overlap
  },
  profileButton: {
    padding: 10,
  },
  profileIcon: {
    width: 30,
    height: 30,
  },
});

export default Header;
