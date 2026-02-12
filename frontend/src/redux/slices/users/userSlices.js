import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const INITIAL_STATE = {
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
    userInfo: {},
  },
};

//login user Action
const loginUser = createAsyncThunk(
  "users/Login",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      console.log("comm started")
      const response = await axios.post(
        "http://localhost:5000/api/v1/users/login",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

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
    //login user
    builder.addCase(loginUser.pending, (state, action) => {
      state.loading = true;
      console.log("pending");
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.loading = false;
      state.userAuth.userInfo = action.payload;
      state.success = true;
      state.userAuth.error = null;
      console.log("fulfilled");
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.loading = false;
      state.userAuth.error = action.payload;
      state.success = false;
      console.log("rejected");
    });
  },
});
const userReducer = userSlice.reducer;
export default userReducer;
export { loginUser };
