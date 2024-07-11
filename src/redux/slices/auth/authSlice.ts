import { createSlice } from "@reduxjs/toolkit";

type DecodedToken = object;

type AuthState = {
  userInfo: DecodedToken | null;
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
});

export default authSlice.reducer;
