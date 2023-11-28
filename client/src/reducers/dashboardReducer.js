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
      state.users = action.payload;
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