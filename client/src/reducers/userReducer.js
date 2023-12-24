// src/reducers/user.js
import { createSlice } from '@reduxjs/toolkit';

const storageUser = localStorage.getItem('userInfo');
const userInfoFromStorage = storageUser ? JSON.parse(storageUser) : null;

const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: userInfoFromStorage,
        isAuthenticated: userInfoFromStorage === null ? false : true,
        loading: false, 
        error:null,
    },
    reducers: {
        loginStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        loginSuccess: (state, action) => {
            state.user = action.payload;
            state.isAuthenticated = true;
            state.loading = false;
            state.error = null;
        },
        loginFailure: (state,action) => {
            state.loading = false;
            state.error = action.payload;
        },
        logout: (state) => {
            state.user = null;
            state.isAuthenticated = false;
            state.error = null;
        },
    },
});

export const { loginStart, loginSuccess, loginFailure, logout } = userSlice.actions;
export default userSlice.reducer;
