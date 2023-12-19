// src/reducers/teamList.js
import { createSlice } from '@reduxjs/toolkit';

const addProductSlice = createSlice({
  name: 'Add Product',
  initialState: {
    products: [],
    loading: false,
    error: null,
  },
  reducers: {
    addProductStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    addProductSuccess: (state, action) => {
      state.loading = false;
      state.products = [...state.products, action.payload];
    },
    ProductSuccessFetch: (state, action) => {
      state.products = action.payload;
      state.loading = false;
    },
    deleteProduct: (state, action) => {
      state.loading = false;
      state.products = state.products.filter((product) => product._id !== action.payload._id);
    },
    addProductFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  addProductFailure,
  addProductStart,
  ProductSuccessFetch,
  addProductSuccess,
  deleteProduct
} = addProductSlice.actions;
export default addProductSlice.reducer;