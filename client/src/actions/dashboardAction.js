import axios from "axios";
import { fetchDashboardFailure, fetchDashboardStart,fetchDashboardSuccess } from "../reducers/dashboardReducer";

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
    //   console.log(data)
      dispatch(fetchDashboardSuccess(data))
    } catch (error) {
      console.error('Error:', error);
      dispatch(fetchDashboardFailure(error));
    }
  };
  