import {createSlice} from '@reduxjs/toolkit';
import axiosInstance from '../../../axiosInstance';

// Updated initial state with more generic names
const initialState = {
  authData: null,
  loading: false,
  error: null,
  userData: null,
  userRole: null,
};

export const userLoginDataSlice = createSlice({
  name: 'userLoginDetails',
  initialState,
  reducers: {
    authLoading: state => {
      state.authData = null;
      state.loading = true;
      state.error = null;
    },
    authSuccess: (state, {payload}) => {
      state.authData = payload;
      state.loading = false;
      state.error = null;
    },
    authError: (state, {payload}) => {
      state.authData = null;
      state.loading = false;
      state.error = payload;
    },
    userLogout: state => {
      // Reset state on logout
      return initialState;
    },
    userDetails: (state, {payload}) => {
      state.userData = payload;
    },
    // userRole: (state, {payload}) => {
    //   state.userRole = payload;
    // },
    userLocation: (state, {payload}) => {
      console.log('payload', payload);
      state.location =
        payload && payload.latitude && payload.longitude 
          ? payload
          : {latitude: null, longitude: null, address: null};
    },
  },
});

// Export actions
export const {
  authLoading,
  authSuccess,
  authError,
  userLogout,
  userDetails,
  userLocation,
} = userLoginDataSlice.actions;

// Export reducer
export default userLoginDataSlice.reducer;

// Async action for user login
export const userLogin = userDetails => async dispatch => {
  console.log('userDetails', userDetails);
  try {
    dispatch(authLoading());
    const {data} = await axiosInstance.post(`otp/send-otp`, userDetails);
    console.log('data', data);
    if (data) {
      dispatch(authSuccess(data));
      return data;
    } else {
      dispatch(authError('Login failed: No data received'));
    }
  } catch (err) {
    console.log('err', err);
    dispatch(authError(err.message || 'Login failed'));
  }
};

// Async action for verifying OTP
export const verifyOtp = otpDetails => async dispatch => {
  console.log('otpDetails', otpDetails);
  try {
    dispatch(authLoading());
    const {data} = await axiosInstance.post(`otp/verify-otp`, otpDetails);
    if (data) {
      dispatch(authSuccess(data));
      return data;
    } else {
      dispatch(authError('OTP verification failed: No data received'));
    }
  } catch (err) {
    console.log('err', err);
    dispatch(authError(err.message || 'OTP verification failed'));
  }
};
