import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
// import {navigationRef} from './Navigation';

const axiosInstance = axios.create({
  // baseURL: 'http://192.168.29.16:8080/eatsoo/',
  baseURL: 'http://192.168.29.16:8080/eatsoo/',

  // baseURL: 'http://localhost:8080/eatsoo/',
});

axiosInstance.interceptors.request.use(async config => {
  const value = await AsyncStorage.getItem('token');
console.log('value', value)
  if (value) {
    config.headers = {
      ...config.headers, // preserve any existing headers
      'Content-Type': 'application/json',
      Authorization: `Bearer ${value}`, // <<--- THIS IS IMPORTANT
    };
  }
  return config;
});

// axiosInstance.interceptors.response.use(
//   response => {
//     console.log('response', response);
//     return response;
//   },
//   async error => {
//     // console.log('erroewr', error.response);
//     if (error.response.status === 401) {
//       await AsyncStorage.removeItem('token');
//       return navigationRef.navigate('AuthStack');
//     }
//     return Promise.reject(error);
//   },
// );

export default axiosInstance;
