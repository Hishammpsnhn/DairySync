import axios from "axios";
import { barGraphSuccess, fetchDashboardBookingOrders, fetchDashboardFailure, fetchDashboardStart, fetchDashboardSuccess, fetchSellerDashboardSuccess } from "../reducers/dashboardReducer";

//admin
export const adminDashboard = async (dispatch, getState) => {
  try {
    dispatch(fetchDashboardStart)
    const { user: { user } } = getState();
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user?.token}`,
      },
    };

    const { data } = await axios.get('/api/dashboard/admin', config);
    dispatch(fetchDashboardSuccess(data[0]))
  } catch (error) {
    console.error('Error:', error);
    dispatch(fetchDashboardFailure(error));
  }
};

export const adminDashboardBooking = async (dispatch, getState) => {
  try {
    dispatch(fetchDashboardStart)
    const { user: { user } } = getState();
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user?.token}`,
      },
    };

    const { data } = await axios.get('/api/dashboard/admin/booking', config);
    console.log(data)
    dispatch(fetchDashboardBookingOrders(data))
  } catch (error) {
    console.error('Error:', error);
    dispatch(fetchDashboardFailure(error));
  }
};
export const adminDashboardLineGraph = async (dispatch, getState) => {
  try {
    dispatch(fetchDashboardStart)
    const { user: { user } } = getState();
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user?.token}`,
      },
    };

    const { data } = await axios.get('/api/dashboard/admin/linegraph', config);
    console.log(data)
    return data;
   // dispatch(fetchDashboardBookingOrders(data))
  } catch (error) {
    console.error('Error:', error);
    dispatch(fetchDashboardFailure(error));
  }
};



//seller
export const sellerDashboard = async (dispatch, getState) => {
  try {
    dispatch(fetchDashboardStart)
    const { user: { user } } = getState();
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user?.token}`,
      },
    };

    const { data } = await axios.get('/api/dashboard/seller', config);
    dispatch(fetchSellerDashboardSuccess(data))
  } catch (error) {
    console.error('Error:', error);
    dispatch(fetchDashboardFailure(error));
  }
};

export const sellerDashboardOrders = async (dispatch, getState) => {
  try {
    dispatch(fetchDashboardStart)
    const { user: { user } } = getState();
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user?.token}`,
      },
    };

    const { data } = await axios.get('/api/dashboard/seller/orders', config);
    dispatch(fetchDashboardBookingOrders(data))
  } catch (error) {
    console.error('Error:', error);
    dispatch(fetchDashboardFailure(error));
  }
};

export const sellerDashboardBarGraph = async (dispatch, getState) => {
  try {
    dispatch(fetchDashboardStart)
    const { user: { user } } = getState();
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user?.token}`,
      },
    };

    const { data } = await axios.get('/api/dashboard/seller/bargraph', config);
    console.log(data)
    dispatch(barGraphSuccess(data))
  } catch (error) {
    console.error('Error:', error);
    dispatch(fetchDashboardFailure(error));
  }
};