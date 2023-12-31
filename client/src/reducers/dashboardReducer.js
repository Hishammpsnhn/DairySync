// src/reducers/teamList.js
import { createSlice } from '@reduxjs/toolkit';

const dashboardSlice = createSlice({
  name: 'Dashboard',
  initialState: {
    dashboardStatBox: { "stat1": 0, "stat2": 0, "stat3": 0, "stat4": 0 },
    loading: false,
    error: null,
    bookingOrders: [],
    lineGraph: [],
    barGraph: [],
  },
  reducers: {
    fetchDashboardStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchDashboardSuccess: (state, action) => {
      state.dashboardStatBox.stat1 = action.payload.rich.quantity
      state.dashboardStatBox.stat2 = action.payload.toned.quantity
      state.dashboardStatBox.stat3 = action.payload.smart.quantity
      state.dashboardStatBox.stat4 = action.payload.skimmed.quantity
      state.loading = false;
    },
    fetchSellerDashboardSuccess: (state, action) => {
      state.dashboardStatBox.stat2 = action.payload[0].orderCount
      state.dashboardStatBox.stat3 = action.payload[1].productCount
      state.dashboardStatBox.stat4 = action.payload[2].animalCount
      state.loading = false;
    },
    fetchDashboardBookingOrders: (state, action) => {
      state.bookingOrders = action.payload
    },
    lineGraphSuccess: (state, action) => {
      state.lineGraph = action.payload
    },
    barGraphSuccess: (state, action) => {
      state.barGraph = action.payload
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
  fetchDashboardBookingOrders,
  fetchSellerDashboardSuccess,
  lineGraphSuccess,
  barGraphSuccess
} = dashboardSlice.actions;
export default dashboardSlice.reducer;