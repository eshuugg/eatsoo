import {createSlice} from '@reduxjs/toolkit';
import axiosInstance from '../../../axiosInstance';

const initialState = {
  loading: false,
  error: null,
  categoriesData: null,
};

export const categoryDataSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    categoryDataLoading: state => {
      state.loading = true;
      state.error = null;
    },
    categoryDataSuccess: (state, {payload}) => {
      state.categoriesData = payload;
      state.loading = false;
      state.error = null;
    },
    categoryDataError: (state, {payload}) => {
      state.categoriesData = null;
      state.loading = false;
      state.error = payload;
    },
  },
});

export const {categoryDataLoading, categoryDataSuccess, categoryDataError} =
  categoryDataSlice.actions;

export const fetchCategories_Subcategory = () => async dispatch => {
  try {
    dispatch(categoryDataLoading());
    const {data} = await axiosInstance.get(`category/getAllCategoryDetails`);
    console.log('data', data)
    if (data) {
      dispatch(categoryDataSuccess(data));
      return data;
    } else {
      dispatch(categoryDataError('No data found'));
    }
  } catch (err) {
    console.log('err', err);
    dispatch(categoryDataError(err.message || 'No data found'));
  }
};
