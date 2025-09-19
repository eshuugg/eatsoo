import { createSlice } from '@reduxjs/toolkit';
import axiosInstance from '../../../axiosInstance';

// Updated initial state with more generic names
const initialState = {
    cartData: null,
    addCart: null,
    updateCart: null,
    removeCart: null,
    clearCart: null,
    loading: false,
    error: null,
};

export const cartDataSlice = createSlice({
    name: 'cartDetails',
    initialState,
    reducers: {
        cartDataLoading: state => {
            state.cartData = null;
            state.loading = true;
            state.error = null;
        },
        cartDataSuccess: (state, { payload }) => {
            state.cartData = payload;
            state.loading = false;
            state.error = null;
        },
        cartDataError: (state, { payload }) => {
            state.cartData = null;
            state.loading = false;
            state.error = payload;
        },
        addcartDataLoading: state => {
            state.addCart = null;
            state.loading = true;
            state.error = null;
        },
        addcartDataSuccess: (state, { payload }) => {
            state.addCart = payload;
            state.loading = false;
            state.error = null;
        },
        addcartDataError: (state, { payload }) => {
            state.addCart = null;
            state.loading = false;
            state.error = payload;
        },
        updateCartDataLoading: state => {
            state.updateCart = null;
            state.loading = true;
            state.error = null;
        },
        updateCartDataSuccess: (state, { payload }) => {
            state.updateCart = payload;
            state.loading = false;
            state.error = null;
        },
        updateCartDataError: (state, { payload }) => {
            state.updateCart = null;
            state.loading = false;
            state.error = payload;
        },
        removeCartDataLoading: state => {
            state.removeCart = null;
            state.loading = true;
            state.error = null;
        },
        removeCartDataSuccess: (state, { payload }) => {
            state.removeCart = payload;
            state.loading = false;
            state.error = null;
        },
        removeCartDataError: (state, { payload }) => {
            state.removeCart = null;
            state.loading = false;
            state.error = payload;
        },
        clearCartDataLoading: state => {
            state.clearCart = null;
            state.loading = true;
            state.error = null;
        },
        clearCartDataSuccess: (state, { payload }) => {
            state.clearCart = payload;
            state.loading = false;
            state.error = null;
        },
        clearCartDataError: (state, { payload }) => {
            state.clearCart = null;
            state.loading = false;
            state.error = payload;
        },
    },
});

// Export actions
export const {
    cartDataLoading,
    cartDataSuccess,
    cartDataError,
    addcartDataLoading,
    addcartDataSuccess,
    addcartDataError,
    updateCartDataLoading,
    updateCartDataSuccess,
    updateCartDataError,
    removeCartDataLoading,
    removeCartDataSuccess,
    removeCartDataError,
    clearCartDataLoading,
    clearCartDataSuccess,
    clearCartDataError
} = cartDataSlice.actions;

// Export reducer
export default cartDataSlice.reducer;

// Async action for user login
export const getCart = (userID) => async dispatch => {
    try {
        dispatch(cartDataLoading());
        const { data } = await axiosInstance.get(`cart/cart/${userID}`);
        console.log('data', data);
        if (data) {
            dispatch(cartDataSuccess(data));
            return data;
        } else {
            dispatch(cartDataError('Login failed: No data received'));
        }
    } catch (err) {
        console.log('err', err);
        dispatch(cartDataError(err.message || 'Login failed'));
    }
};

export const addToCart = (dta) => async dispatch => {
    console.log('dta', dta)
    try {
        dispatch(addcartDataLoading());
        const { data } = await axiosInstance.post(`cart/cart/add`, dta);
        console.log('data', data);
        if (data) {
            dispatch(addcartDataSuccess(data));
            return data;
        } else {
            dispatch(addcartDataError('Login failed: No data received'));
        }
    } catch (err) {
        console.log('err', err);
        dispatch(addcartDataError(err.message || 'Login failed'));
    }
};

export const updateCart = (cartData) => async dispatch => {
    const id = Number(cartData?.cartItemID)
    try {
        dispatch(updateCartDataLoading());
        const { data } = await axiosInstance.post(`cart/cart/item/${id}`, { quantity: cartData?.quantity });
        console.log('data', data);
        if (data) {
            dispatch(updateCartDataSuccess(data));
            return data;
        } else {
            dispatch(updateCartDataError('Login failed: No data received'));
        }
    } catch (err) {
        console.log('err', err);
        dispatch(updateCartDataError(err.message || 'Login failed'));
    }
};

export const removeCart = (cartItemID) => async dispatch => {
    try {
        dispatch(updateCartDataLoading());
        const { data } = await axiosInstance.post(`cart/cart/itemRemove/${cartItemID}`);
        console.log('data', data);
        if (data) {
            dispatch(updateCartDataSuccess(data));
            return data;
        } else {
            dispatch(updateCartDataError('Login failed: No data received'));
        }
    } catch (err) {
        console.log('err', err);
        dispatch(updateCartDataError(err.message || 'Login failed'));
    }
};

export const clearCart = (cartID) => async dispatch => {
    try {
        dispatch(clearCartDataLoading());
        const { data } = await axiosInstance.get(`cart/cart/clear/${cartID}`);
        console.log('data', data);
        if (data) {
            dispatch(clearCartDataSuccess(data));
            return data;
        } else {
            dispatch(clearCartDataError('Login failed: No data received'));
        }
    } catch (err) {
        console.log('err', err);
        dispatch(clearCartDataError(err.message || 'Login failed'));
    }
};