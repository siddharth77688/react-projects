import { createSlice } from "@reduxjs/toolkit";

const loadAuthFromStorage = () => {
  try {
    const auth = localStorage.getItem("auth");
    if (auth) {
      return JSON.parse(auth);
    }
  } catch (e) {
    console.error("Failed to load auth from storage", e);
  }
  return {
    isAuthenticated: false,
    user: null,
    token: null,
  };
};

const initialState = loadAuthFromStorage();

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess(state, action) {
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
      localStorage.setItem("auth", JSON.stringify({
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token,
      }));
    },
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      localStorage.removeItem("auth");
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
