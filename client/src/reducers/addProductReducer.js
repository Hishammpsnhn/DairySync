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
      state.users = action.payload;
      state.loading = false;
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
  addProductSuccess,
} = addProductSlice.actions;
export default addProductSlice.reducer;