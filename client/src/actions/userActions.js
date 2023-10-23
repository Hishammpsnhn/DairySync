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
export const registerUser = ({ email, password, userName, contact }) => async (dispatch) => {
  try {
    const { data } = await axios.post('/api/users', {
      email,
      password,
      userName,
      contact
    });
    console.log(data);
  } catch (error) {
    console.error('Error:', error);
  }
};

export const registerSeller = async (userData) => {
  try {
    const { data } = await axios.post('/api/users', {
      userData
    });
    console.log(data);
  } catch (error) {
    console.error('Error:', error);
  }
};

export const teams = async (dispatch, getState) => {
  // redux
  try {
    const {user: { user }} = getState();
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user?.token}`,
      },
    };

    const { data } = await axios.get('/api/users',config);
    console.log(data);
  } catch (error) {
    console.error('Error:', error);
  }
};
