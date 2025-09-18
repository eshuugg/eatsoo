import { createSlice } from '@reduxjs/toolkit';
import axiosInstance from '../../../axiosInstance';

const initialState = {
  loading: false,
  error: null,
  subCategoriesData: null,
  subCatWithInv_LAT_LNGData: null,
};

export const subCategoryDataSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    subCategoryDataLoading: state => {
      state.loading = true;
      state.error = null;
    },
    subCategoryDataSuccess: (state, { payload }) => {
      state.subCategoriesData = payload;
      state.loading = false;
      state.error = null;
    },
    subCategoryDataError: (state, { payload }) => {
      state.subCategoriesData = null;
      state.loading = false;
      state.error = payload;
    },
    subCatWithInv_LAT_LNGDataSuccess: (state, { payload }) => {
      state.subCatWithInv_LAT_LNGData = payload;
      state.loading = false;
      state.error = null;
    },
    subCatWithInv_LAT_LNGDataError: (state, { payload }) => {
      state.subCatWithInv_LAT_LNGData = null;
      state.loading = false;
      state.error = payload;
    },
    subCatWithInv_LAT_LNGDataLoading: state => {
      state.loading = true;
      state.error = null;
    }
  },
});

export const {
  subCategoryDataLoading,
  subCategoryDataSuccess,
  subCategoryDataError,
  subCatWithInv_LAT_LNGDataSuccess,
  subCatWithInv_LAT_LNGDataError,
  subCatWithInv_LAT_LNGDataLoading
} = subCategoryDataSlice.actions;

export const fetchSubcategoryData = (catId) => async dispatch => {
  try {
    dispatch(subCategoryDataLoading());
    const { data } = await axiosInstance.get(`subcategory/categories/${catId}/subcategories-with-inventory`);
    console.log('data', data);
    if (data) {
      dispatch(subCategoryDataSuccess(data));
      return data;
    } else {
      dispatch(subCategoryDataError('No data found'));
    }
  } catch (err) {
    console.log('err', err);
    dispatch(subCategoryDataError(err.message || 'No data found'));
  }
};

export const fetchInventoryDataBySubId = (subCId) => async dispatch => {
  try {
    dispatch(subCategoryDataLoading());
    const { data } = await axiosInstance.get(`inventory/getInventory/${subCId}`);
    console.log('data', data);
    if (data) {
      dispatch(subCategoryDataSuccess(data));
      return data;
    } else {
      dispatch(subCategoryDataError('No data found'));
    }
  } catch (err) {
    console.log('err', err);
    dispatch(subCategoryDataError(err.message || 'No data found'));
  }
};

export const fetchSubCatWithInv_LAT_LNGDataByCatId = (categoryID) => async dispatch => {
  console.log('categoryID', categoryID)
  try {
    dispatch(subCatWithInv_LAT_LNGDataLoading());
    const { data } = await axiosInstance.get(`subcategory/categories/${categoryID}/subcategories-with-inventory`);
    console.log('data', data);
    if (data) {
      dispatch(subCatWithInv_LAT_LNGDataSuccess(data));
      return data;
    } else {
      dispatch(subCatWithInv_LAT_LNGDataError('No data found'));
    }
  } catch (err) {
    console.log('err', err);
    dispatch(subCatWithInv_LAT_LNGDataError(err.message || 'No data found'));
  }
};
