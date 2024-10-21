// store.js
import { configureStore, createSlice } from "@reduxjs/toolkit";

// Initial state for the form slice
const initialState = {
  entries: [],
};

// Create the form slice
const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    // Action to add form data to the entries array
    setFormData: (state, action) => {
      state.entries.push(action.payload); // Append new entry
    },
  },
});

// Export the action creator for setting form data
export const { setFormData } = formSlice.actions;

// Configure the Redux store
const store = configureStore({
  reducer: {
    form: formSlice.reducer,
  },
});

export default store;

export const selectEntries = (state) => state.form.entries;
