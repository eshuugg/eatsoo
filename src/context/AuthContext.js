// import React, {createContext, useState, useEffect} from 'react';
// import {useDispatch} from 'react-redux';
// import AsyncStorage from '@react-native-async-storage/async-storage'; // For persistent storage
// import {userLogout} from '../redux/Slicers/LoginSlicer';
// import {useNavigation} from '@react-navigation/native';
// import {navigationRef} from '../navigation/Navigation';

// export const AuthContext = createContext();

// export const AuthProvider = ({children}) => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [token, setToken] = useState(null);
//   const [userRole, setUserRole] = useState(null);
//   const dispatch = useDispatch(); // Use Redux dispatch
//   const [loadingData, setloadingData] = useState(true);
//   // const navigation = useNavigation();
//   // Load stored token and role on app startup
//   useEffect(() => {
//     const loadStoredData = async () => {
//       try {
//         const storedToken = await AsyncStorage.getItem('token');
//         const storedRole = await AsyncStorage.getItem('role');

//         if (storedToken && storedRole) {
//           setToken(storedToken);
//           setUserRole(storedRole);
//           setIsAuthenticated(true);
//         }
//       } catch (error) {
//         console.error('Failed to load stored data:', error);
//       }
//       setloadingData(false); // Set loading to false after data is fetched
//     };

//     loadStoredData();
//   }, []);

//   // Login function
//   const login = async (token, role) => {
//     console.log('token', token,role)
//     try {
//       await AsyncStorage.setItem('token', token); // Store token
//       await AsyncStorage.setItem('role', role); // Store role
//       setToken(token);
//       setUserRole(role);
//       setIsAuthenticated(true);
//       // navigationRef.reset({
//       //   index: 0,
//       //   routes: [{name: 'PageStackScreens'}],
//       // });
//     } catch (error) {
//       console.error('Failed to save login data:', error);
//     }
//   };

//   // Logout function
//   const logout = async () => {
//     try {
//       await AsyncStorage.removeItem('token');
//       await AsyncStorage.removeItem('role');
//       setToken(null);
//       setUserRole(null);
//       setIsAuthenticated(false);
//       dispatch(userLogout());

//       navigationRef.reset({
//         index: 0,
//         routes: [{name: 'AuthStack'}],
//       });
//     } catch (error) {
//       console.error('Failed to logout:', error);
//     }
//   };

//   return (
//     <AuthContext.Provider
//       value={{
//         isAuthenticated,
//         token,
//         userRole,
//         login,
//         logout,
//         setIsAuthenticated,
//         loadingData,
//       }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };
