import axios from 'axios';
import { loginFailure, loginStart, loginSuccess } from '../reducers/userReducer';
import { RootState } from '../store';
import { fetchTeamListFailure, fetchTeamListStart, fetchTeamListSuccess } from '../reducers/teamListReducer';

export const login = ({ email, password }) => async (dispatch) => {
  dispatch(loginStart());
  try {
    const { data } = await axios.post('/api/users/login', {
      email,
      password,
    });
    dispatch(loginSuccess(data))
    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    console.error('Error:', error);
    if (error.response && error.response.data) {
      const errorMessage = error.response.data.message;
      console.error('Server Error Message:', errorMessage);
      dispatch(loginFailure(errorMessage));
    } else {
      console.error('Generic Error');
      dispatch(loginFailure("Something went wrong"));
    }
  }
};
export const registerUser = (userData) => async (dispatch) => {
  dispatch(loginStart());
  try {
    const { data } = await axios.post('/api/users', {
      userData
    });
    dispatch(loginSuccess(data))
    localStorage.setItem('userInfo', JSON.stringify(data));

  } catch (error) {
    dispatch(loginFailure());
    console.error('Error:', error);

    if (error.response && error.response.data) {
      const errorMessage = error.response.data.message;
      console.error('Server Error Message:', errorMessage);
      dispatch(loginFailure(errorMessage));
    } else {
      console.error('Generic Error');
      dispatch(loginFailure("Something went wrong"));
    }
  }
};

export const registerSeller = (userData) => async (dispatch, getState) => {
  try {
    const { user: { user } } = getState();
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user?.token}`,
      },
    };
    const { data } = await axios.post('/api/users/addseller', {
      userData
    },config);
    console.log(data);
  } catch (error) {
    console.error('Error:', error);

    if (error.response && error.response.data) {
      const errorMessage = error.response.data.message;
      console.error('Server Error Message:', errorMessage);
      dispatch(loginFailure(errorMessage));
    } else {
      console.error('Generic Error');
      dispatch(loginFailure("Something went wrong"));
    }
  }
};

export const teams = async (dispatch, getState) => {
  dispatch(fetchTeamListStart);
  try {
    const { user: { user } } = getState();
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user?.token}`,
      },
    };

    const { data } = await axios.get('/api/users', config);
    console.log(data)
    dispatch(fetchTeamListSuccess(data))
  } catch (error) {
    console.error('Error:', error);

    if (error.response && error.response.data) {
      const errorMessage = error.response.data.message;
      console.error('Server Error Message:', errorMessage);
      dispatch(fetchTeamListFailure(errorMessage));
    } else {
      console.error('Generic Error');
      dispatch(fetchTeamListFailure("Something went wrong"));
    }
  }
};
