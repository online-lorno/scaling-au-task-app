import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthState } from "@/lib/types";

const initialState: AuthState = {
  isAuthenticated: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ isAuthenticated: boolean }>) => {
      state.isAuthenticated = action.payload.isAuthenticated;
    },
    logout: (state) => {
      state.isAuthenticated = false;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
