import { createSlice } from "@reduxjs/toolkit";

import login from "./authActions";

import { getUserInfo, saveRefreshToken, saveToken } from "@/utils/auth";

export type UserInfo = {
  username: string;
};

type AuthState = {
  userInfo: UserInfo | null;
  loginLoading: boolean;
  loginSuccess: boolean;
  loginError: null | {
    in: "rut" | "password";
    message: string;
  };
  refreshLoading: boolean;
  refreshSuccess: boolean;
};

const initialState: AuthState = {
  userInfo: null,
  loginLoading: false,
  loginSuccess: false,
  loginError: null,
  refreshLoading: false,
  refreshSuccess: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(login.pending, (state) => {
      state.loginLoading = true;
      state.loginError = null;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      saveToken(action.payload.token);
      saveRefreshToken(action.payload.refreshToken);
      state.userInfo = getUserInfo();
      state.loginLoading = false;
      state.loginError = null;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.loginLoading = false;
    });
  },
});

export default authSlice.reducer;
