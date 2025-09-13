import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  StyleSheet,
  Alert,
  ImageBackground,
  Image,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { userDetails, verifyOtp } from '../../redux/Slicers/LoginSlicer';
import { useNavigation, useRoute } from '@react-navigation/native';
import { AuthContext } from '../../context/AuthContext';
import LinearGradient from 'react-native-linear-gradient';
import OTPInput from '../../components/OtpInput/OTPInput';
import AsyncStorage from '@react-native-async-storage/async-storage';

const OTPScreen = () => {
  const [otp, setOtp] = useState('');
  const navigation = useNavigation();
  const route = useRoute();
  const dispatch = useDispatch();
  // const { login } = useContext(AuthContext);

  const phoneNumber = route.params?.phoneNumber;

  const handleVerifyOtp = otpValue => {
    setOtp(otpValue);
    if (otpValue.length !== 6) {
      Alert.alert('Error', 'Please enter a valid 6-digit OTP.');
      return;
    }
    dispatch(
      verifyOtp({ phone: phoneNumber, otp: otpValue, roleName: 'CUSTOMER' }),
    ).then(async res => {
      if (res) {
        // console.log('res', res);
        await AsyncStorage.setItem('token', res?.token); // Store token
        dispatch(userDetails(res));
        navigation.replace('BottomTabs');
        // login(res?.token, res?.user?.role);
        // login('token', 'role');
      } else {
        Alert.alert('Error', 'Invalid OTP. Please try again.');
      }
    });
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
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Verify OTP</Text>
          <Text style={styles.headerSubtitle}>
            Enter the OTP sent to {phoneNumber}
          </Text>
        </View>

        <OTPInput length={6} onOtpComplete={handleVerifyOtp} />

        <TouchableOpacity
          style={styles.button}
          onPress={() => handleVerifyOtp(otp)}>
          <LinearGradient
            colors={['#FF9800', '#F57C00']} // Orange gradient for button
            style={styles.gradientButton}>
            <Text style={styles.buttonText}>VERIFY OTP</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default OTPScreen;

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    // justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    width: 280,
    height: 250,
    resizeMode: 'contain',
    marginTop: '10%',
  },
  header: {
    marginBottom: 20,
    alignItems: 'center',
  },
  headerTitle: {
    color: '#FFF',
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  headerSubtitle: {
    color: '#DDD',
    fontSize: 16,
    textAlign: 'center',
  },
  button: {
    borderRadius: 10,
    overflow: 'hidden',
    marginTop: 20,
    width: '100%',
  },
  gradientButton: {
    paddingVertical: 15,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
