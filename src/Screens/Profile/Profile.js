import React, { useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { AuthContext } from '../../context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import Header from '../../components/Header';
import { useDispatch } from 'react-redux';
import { userLogout } from '../../redux/Slicers/LoginSlicer';

const Profile = () => {
  // const {logout} = useContext(AuthContext);
  const navigation = useNavigation();

  const dispatch = useDispatch();

  const handleLogout = () => {
    try {
      // logout();
      dispatch(userLogout())
      navigation.replace('AuthStack');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Header bgColor={'#FF6F61'} title="Profile" showBackButton={true} showProfileButton={true} />
      <ScrollView style={styles.container}>
        {/* Header Section */}
        <View style={styles.headerContainer}>
          <Image
            source={require('../../assets/img/man.png')}
            style={styles.profileImage}
          />
          <Text style={styles.userName}>John Doe</Text>
          <Text style={styles.userEmail}>johndoe@example.com</Text>
        </View>

        {/* Account Info Section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Account Information</Text>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Phone:</Text>
            <Text style={styles.infoValue}>+123 456 7890</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Address:</Text>
            <Text style={styles.infoValue}>123 Main Street, City, Country</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Membership:</Text>
            <Text style={styles.infoValue}>Premium</Text>
          </View>
        </View>

        {/* Settings Section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Settings</Text>
          <TouchableOpacity style={styles.optionRow}>
            <Text style={styles.optionText}>Edit Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.optionRow}>
            <Text style={styles.optionText}>Change Password</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.optionRow}>
            <Text style={styles.optionText}>Notification Preferences</Text>
          </TouchableOpacity>
        </View>

        {/* Support Section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Support</Text>
          <TouchableOpacity style={styles.optionRow}>
            <Text style={styles.optionText}>Help Center</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.optionRow}>
            <Text style={styles.optionText}>Contact Us</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.optionRow}>
            <Text style={styles.optionText}>Terms and Conditions</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.optionRow}>
            <Text style={styles.optionText}>Privacy Policy</Text>
          </TouchableOpacity>
        </View>

        {/* Logout Button */}
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={() => handleLogout()}>
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
      </ScrollView>
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
    alignItems: 'center',
    paddingVertical: 30,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  userName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
  },
  userEmail: {
    fontSize: 16,
    color: 'white',
    marginTop: 5,
  },
  sectionContainer: {
    backgroundColor: 'white',
    margin: 15,
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  infoLabel: {
    fontSize: 16,
    color: '#555',
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  optionRow: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  optionText: {
    fontSize: 16,
    color: '#FF6F61',
  },
  logoutButton: {
    backgroundColor: '#FF6F61',
    margin: 15,
    borderRadius: 10,
    alignItems: 'center',
    paddingVertical: 15,
  },
  logoutText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Profile;
