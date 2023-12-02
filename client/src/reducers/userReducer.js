// src/reducers/user.js
import { createSlice } from '@reduxjs/toolkit';

const storageUser = localStorage.getItem('userInfo');
const userInfoFromStorage = storageUser ? JSON.parse(storageUser) : null;

const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: userInfoFromStorage,
        isAuthenticated: userInfoFromStorage === null ? false : true,
        loading: false, // Add loading state
    },
    reducers: {
        loginStart: (state) => {
            state.loading = true;
        },
        loginSuccess: (state, action) => {
            state.user = action.payload;
            state.isAuthenticated = true;
            state.loading = false;
        },
        loginFailure: (state) => {
            state.loading = false;
        },
        logout: (state) => {
            console.log("logged out");
            state.user = null;
            state.isAuthenticated = false;
        },
    },
});

export const { loginStart, loginSuccess, loginFailure, logout } = userSlice.actions;
export default userSlice.reducer;
