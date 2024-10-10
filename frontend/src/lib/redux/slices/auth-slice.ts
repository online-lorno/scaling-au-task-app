import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthState } from "@/lib/types";

const initialState: AuthState = {
  isAuthenticated: false,
  email: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (
      state,
      action: PayloadAction<{ isAuthenticated: boolean; email: string }>
    ) => {
      state.isAuthenticated = action.payload.isAuthenticated;
      state.email = action.payload.email;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.email = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
