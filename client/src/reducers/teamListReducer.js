// src/reducers/teamList.js
import { createSlice } from '@reduxjs/toolkit';

const teamListSlice = createSlice({
  name: 'teamList',
  initialState: {
    users: [],   // Array of users
    loading: true,  // Loading state
    error: null,    // Error state
  },
  reducers: {
    fetchTeamListStart: (state) => {
      state.loading = true;
      state.error = null; 
    },
    fetchTeamListSuccess: (state, action) => {
      state.users = action.payload;
      state.loading = false;
      state.error = null; 
    },
    fetchTeamListFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchTeamListStart,
  fetchTeamListSuccess,
  fetchTeamListFailure,
} = teamListSlice.actions;
export default teamListSlice.reducer;
