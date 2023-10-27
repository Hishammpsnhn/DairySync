import axios from 'axios';
import { loginFailure, loginStart, loginSuccess } from '../reducers/userReducer';
import { RootState } from '../store';

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
    dispatch(loginFailure());
    console.error('Error:', error);
  }
};
export const registerUser = (userData) => async (dispatch) => {
  try {
    const { data } = await axios.post('/api/users', {
      userData
    });
    dispatch(loginSuccess(data))
    localStorage.setItem('userInfo', JSON.stringify(data));

  } catch (error) {
    dispatch(loginFailure());
    console.error('Error:', error);
  }
};

export const registerSeller = (userData) => async (dispatch) => {
  try {
    const { data } = await axios.post('/api/users', {
      userData
    });
    console.log(data);
    dispatch(loginSuccess(data))
    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch(loginFailure());
    console.error('Error:', error);
  }
};

export const teams = async (dispatch, getState) => {
  // redux
  try {
    const { user: { user } } = getState();
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user?.token}`,
      },
    };

    const { data } = await axios.get('/api/users', config);
    console.log(data);
  } catch (error) {
    console.error('Error:', error);
  }
};
