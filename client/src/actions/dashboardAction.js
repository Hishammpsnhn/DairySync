import axios from "axios";

export const adminDashboard = async (dispatch, getState) => {
    console.log("get",getState)
    try {
      const { user: { user } } = getState();
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user?.token}`,
        },
      };
  
       const { data } = await axios.get('/api/dashboard', config);
    //   console.log(data)
   //   dispatch(fetchTeamListSuccess(data))
    } catch (error) {
      console.error('Error:', error);
     // dispatch(fetchTeamListFailure(error));
    }
  };
  