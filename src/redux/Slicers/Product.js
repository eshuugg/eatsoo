import {createSlice} from '@reduxjs/toolkit';
import axiosInstance from '../../../axiosInstance';

const initialState = {
  loading: false,
  error: null,
  product: null,
};

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    productLoading: state => {
      state.loading = true;
      state.error = null;
    },
    productSuccess: (state, {payload}) => {
      state.product = payload;
      state.loading = false;
      state.error = null;
    },
    productError: (state, {payload}) => {
      state.product = null;
      state.loading = false;
      state.error = payload;
    },
  },
});

export const {productLoading, productSuccess, productError} =
  productSlice.actions;

export const fetchProduct = subCId => async dispatch => {
    console.log('subCId', subCId)
  try {
    dispatch(productLoading());
    const {data} = await axiosInstance.get(`inventory/getInventory/${subCId}`);
    console.log('data', data)
    if (data) {
      dispatch(productSuccess(data));
      return data;
    } else {
      dispatch(productError('No data found'));
    }
  } catch (err) {
    console.log('err', err);
    dispatch(productError(err.message || 'No data found'));
  }
};
