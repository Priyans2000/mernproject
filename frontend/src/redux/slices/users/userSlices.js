import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const INITIAL_STATE = {
  logout: false,
  loading: false,
  error: null,
  success: false,
  users: [],
  user: null,
  isUpdated: false,
  isDeleted: false,
  isEmailSent: false,
  isPasswordReset: false,
  profile: {},
  userAuth: {
    error: null,
    userInfo: localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null,
  },
};

//login user Action
const loginUser = createAsyncThunk(
  "users/Login",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log("comm started");
      const { data } = await axios.post(
        "http://localhost:5000/api/v1/users/login",
        payload,
      );
      localStorage.setItem("userInfo", JSON.stringify(data));
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);
//======================================
//logout user Action
const logoutuser = createAsyncThunk("users/logout", async () => {
  localStorage.removeItem("userInfo");
  return true;
});

export const userSlice = createSlice({
  name: "user",
  initialState: INITIAL_STATE,
  //==============================================
  //this is my code
  //  reducers: {
  //   loginPending: (state) => {
  //     state.loading = true;
  //     state.error = null;
  //   },

  //   loginSuccess: (state, action) => {
  //     state.loading = false;
  //     state.isLoggedIn = true;
  //     state.user = action.payload;
  //     state.success = true;
  //     state.error = null;
  //   },

  //   loginFailed: (state, action) => {
  //     state.loading = false;
  //     state.error = action.payload;
  //     state.success = false;
  //   },

  //   logout: (state) => {
  //     state.isLoggedIn = false;
  //     state.user = {};
  //     state.success = false;
  //     state.error = null;
  //   },
  // },
  //======================================
  //this code is for createAsyncThunk for login user
  extraReducers: (builder) => {
    builder

      // LOGIN CASES
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
        console.log("pending");
      })

      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.userAuth.userInfo = action.payload;
        state.success = true;
        state.userAuth.error = null;
        console.log("fulfilled");
      })

      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.userAuth.error = action.payload?.message || "Login failed";
        state.success = false;
           console.log("login faield");
      })

      // 🔥 LOGOUT CASE
      .addCase(logoutuser.pending, (state) => {
        state.loading = true;
      })

      .addCase(logoutuser.fulfilled, (state) => {
        state.loading = false;
        state.logout = true;
        state.userAuth.userInfo = null;
        state.userAuth.error = null;
        state.success = false;
      })

      .addCase(logoutuser.rejected, (state) => {
        state.loading = false;
      });
  },
});
const userReducer = userSlice.reducer;
export default userReducer;
export { loginUser, logoutuser };
