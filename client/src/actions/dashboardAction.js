import axios from "axios";
import { fetchDashboardBookingOrders, fetchDashboardFailure, fetchDashboardStart, fetchDashboardSuccess } from "../reducers/dashboardReducer";

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

    const { data } = await axios.get('/api/dashboard', config);
    console.log(data)
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

    const { data } = await axios.get('/api/dashboard/booking', config);
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

    const { data } = await axios.get('/api/dashboard/linegraph', config);
    console.log(data)
    return data;
   // dispatch(fetchDashboardBookingOrders(data))
  } catch (error) {
    console.error('Error:', error);
    dispatch(fetchDashboardFailure(error));
  }
};
