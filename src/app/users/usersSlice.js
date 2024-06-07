import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const authSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    registerUser: (state, action) => {
      return [...state, action.payload];
    },
  },
});

export const { registerUser } = authSlice.actions;

export default authSlice.reducer;
