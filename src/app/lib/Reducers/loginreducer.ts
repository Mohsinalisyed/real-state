// loginSlice.js
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface LoginState {
  userid: string | null;
  token: string | null;
  user: string | null;
  email: string | null;
  isVerified: boolean;
  isAdmin: boolean;
}

const initialState: LoginState = {
  userid: null,
  token: null,
  user: null,
  email: null,
  isVerified: false,
  isAdmin: false,
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<LoginState>) => {
      const { userid, token, user, email, isVerified, isAdmin } =
        action.payload;
      state.userid = userid;
      state.token = token;
      state.user = user;
      state.email = email;
      state.isVerified = isVerified;
      state.isAdmin = isAdmin;
    },
    logoutSuccess: (state) => {
      state.userid = null;
      state.token = null;
      state.user = null;
      state.email = null;
      state.isVerified = false;
      state.isAdmin = false;
    },
  },
});

export const { loginSuccess, logoutSuccess } = loginSlice.actions;

export default loginSlice.reducer;
