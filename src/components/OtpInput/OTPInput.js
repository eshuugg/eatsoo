import React, { useRef } from 'react';
import { View, TextInput, StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const OTPInput = ({ length = 6, onOtpComplete }) => {
  const otpRefs = Array(length)
    .fill()
    .map(() => useRef(null));
  const [otp, setOtp] = React.useState(Array(length).fill(''));

  const handleChange = (index, value) => {
    if (!/^\d$/.test(value) && value !== '') return; // Allow only numbers

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < length - 1) {
      otpRefs[index + 1]?.current?.focus();
    }

    if (newOtp.join('').length === length) {
      onOtpComplete(newOtp.join('')); // Call callback when OTP is complete
    }
  };

  const handleKeyPress = (index, key) => {
    if (key === 'Backspace' && index > 0 && otp[index] === '') {
      otpRefs[index - 1]?.current?.focus();
    }
  };

  return (
    <View style={styles.container}>
      {otp.map((digit, index) => (
        <TextInput
          key={index}
          ref={otpRefs[index]}
          value={digit}
          onChangeText={(text) => handleChange(index, text)}
          onKeyPress={({ nativeEvent }) => handleKeyPress(index, nativeEvent.key)}
          keyboardType="number-pad"
          maxLength={1}
          style={styles.otpBox}
        />
      ))}
    </View>
  );
};

export default OTPInput;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: height * 0.02, // 2% of screen height
  },
  otpBox: {
    width: width * 0.12, // 12% of screen width
    height: height * 0.07, // 7% of screen height
    marginHorizontal: width * 0.01, // 1% of screen width
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#FF7622',
    textAlign: 'center',
    fontSize: width * 0.06, // 6% of screen width
    color: '#000',
    backgroundColor: '#FFF',
  },
});