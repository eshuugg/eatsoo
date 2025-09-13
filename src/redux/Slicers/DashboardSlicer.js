import {createSlice} from '@reduxjs/toolkit';
import axiosInstance from '../../../axiosInstance';

const initialState = {
  loading: false,
  error: null,
  categories: null,
};

export const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    categoryLoading: state => {
      state.loading = true;
      state.error = null;
    },
    categorySuccess: (state, {payload}) => {
      state.categories = payload;
      state.loading = false;
      state.error = null;
    },
    categoryError: (state, {payload}) => {
      state.categories = null;
      state.loading = false;
      state.error = payload;
    },
  },
});

export const {categoryLoading, categorySuccess, categoryError} =
  dashboardSlice.actions;

export const fetchCategories = () => async dispatch => {
  try {
    dispatch(categoryLoading());
    const {data} = await axiosInstance.get(`category/get`);
    if (data) {
      dispatch(categorySuccess(data));
      return data;
    } else {
      dispatch(categoryError('No data found'));
    }
  } catch (err) {
    console.log('err', err);
    dispatch(categoryError(err.message || 'No data found'));
  }
};
