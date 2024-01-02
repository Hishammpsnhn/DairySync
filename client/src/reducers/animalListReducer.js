// src/reducers/teamList.js
import { createSlice } from '@reduxjs/toolkit';

const animalListSlice = createSlice({
    name: 'animalList',
    initialState: {
        animals: [],   // Array of animals
        loading: true,  // Loading state
        error: null,    // Error state
    },
    reducers: {
        fetchAnimalListStart: (state) => {
            state.loading = true;
            state.error = null; // Reset any previous error
        },
        fetchAnimalListSuccess: (state, action) => {
            state.animals = action.payload;
            state.loading = false;
        },
        fetchAnimalListFailure: (state, action) => {
            console.log(action.payload);
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const {
    fetchAnimalListStart,
    fetchAnimalListSuccess,
    fetchAnimalListFailure,
} = animalListSlice.actions;
export default animalListSlice.reducer;
