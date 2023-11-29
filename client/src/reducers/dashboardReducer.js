// src/reducers/teamList.js
import { createSlice } from '@reduxjs/toolkit';

const dashboardSlice = createSlice({
  name: 'Dashboard',
  initialState: {
    dashboardStatBox:{"stat1":0,"stat2":0,"stat3":0,"stat4":0},
    loading: false,
    error: null,  
  },
  reducers: {
    fetchDashboardStart: (state) => {
      state.loading = true;
      state.error = null; 
    },
    fetchDashboardSuccess: (state, action) => {
      console.log(action.payload)
      //{totalQuantity: 0, inventory: 0, totalClient: 4}
      state.dashboardStatBox.stat1 = parseFloat(action.payload.inventory.toFixed(2));
      state.dashboardStatBox.stat2 = action.payload.totalQuantity;
      // state.dashboardStatBox.stat3 = action.payload.totalQuantity;
      state.dashboardStatBox.stat4 = action.payload.totalClient;
      state.loading = false;
    },
    
    fetchDashboardFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchDashboardFailure,
  fetchDashboardStart,
  fetchDashboardSuccess,
} = dashboardSlice.actions;
export default dashboardSlice.reducer;