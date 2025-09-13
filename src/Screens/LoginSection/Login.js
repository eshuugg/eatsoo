import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StatusBar,
  StyleSheet,
  ImageBackground,
  Image,
  Dimensions,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import {userLogin} from '../../redux/Slicers/LoginSlicer';

const {width, height} = Dimensions.get('window');

const LoginScreen = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleSendOtp = () => {
    if (!phoneNumber) {
      alert('Please enter your email or phone number');
      return;
    }

    dispatch(userLogin({phone: phoneNumber, roleName: 'CUSTOMER'})).then(
      res => {
        console.log('OTP Sent:', res);
        if (res) {
          navigation.navigate('OtpScreen', {phoneNumber});
        }
      },
    );
  };

  return (
    <ImageBackground
      source={require('../../assets/img/loginBack.jpg')} // Replace with your e-commerce background image path
      style={styles.backgroundImage}>
      <View style={styles.overlay}>
        <StatusBar barStyle="light-content" />
        <Image
          source={require('../../assets/img/Logo.png')} // Replace with your logo path
          style={styles.logo}
        />
        <Text style={styles.title}>Welcome Back!</Text>
        <Text style={styles.subtitle}>Enter your phone number or email</Text>

        <View style={styles.inputContainer}>
          <TextInput
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            placeholder="Enter your phone no."
            placeholderTextColor="#BDBDBD"
            style={styles.input}
            keyboardType="default"
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={handleSendOtp}>
          <LinearGradient
            colors={['#FF9800', '#F57C00']} // Orange gradient for button
            style={styles.gradientButton}>
            <Text style={styles.buttonText}>SEND OTP</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent overlay
    alignItems: 'center',
    padding: width * 0.05, // 5% of screen width
  },
  logo: {
    width: width * 0.7, // 70% of screen width
    height: height * 0.25, // 25% of screen height
    resizeMode: 'contain',
    marginTop: height * 0.1, // 10% of screen height
  },
  title: {
    fontSize: width * 0.07, // 7% of screen width
    color: '#fff',
    fontWeight: 'bold',
    marginTop: height * 0.05, // 5% of screen height
    marginBottom: height * 0.01, // 1% of screen height
    textAlign: 'center',
  },
  subtitle: {
    fontSize: width * 0.04, // 4% of screen width
    color: '#BDBDBD',
    marginBottom: height * 0.03, // 3% of screen height
    textAlign: 'center',
  },
  inputContainer: {
    width: '100%',
    marginBottom: height * 0.02, // 2% of screen height
  },
  input: {
    width: '100%',
    padding: height * 0.02, // 2% of screen height
    backgroundColor: 'rgba(255, 255, 255, 0.3)', // Slightly more transparent input
    borderRadius: 10,
    fontSize: width * 0.045, // 4.5% of screen width
    fontWeight: '700',
    color: '#fff',
  },
  button: {
    width: '100%',
    borderRadius: 10,
    overflow: 'hidden',
  },
  gradientButton: {
    padding: height * 0.02, // 2% of screen height
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: width * 0.045, // 4.5% of screen width
    fontWeight: 'bold',
  },
});
