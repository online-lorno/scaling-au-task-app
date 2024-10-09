import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  token: string | null;
  email: string | null;
}

const initialState: AuthState = {
  token: null,
  email: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ token: string; email: string }>) => {
      state.token = action.payload.token;
      state.email = action.payload.email;
    },
    logout: (state) => {
      state.token = null;
      state.email = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
