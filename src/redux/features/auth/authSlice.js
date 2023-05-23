import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../utils/axios";

const initialState = {
  user: null,
  token: null,
  isLodaing: false,
  status: null,
};

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async ({ username, password }) => {
    try {
      const { data } = await axios.post("/auth/register", {
        //{data} = response.data
        username,
        password,
      });
      if (data.token) {
        window.localStorage.setItem("token", data.token);
      }
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ username, password }) => {
    try {
      const { data } = await axios.post("/auth/login", {
        //{data} = response.data
        username,
        password,
      });
      if (data.token) {
        window.localStorage.setItem("token", data.token);
      }
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getMe = createAsyncThunk("auth/getMe", async () => {
  try {
    const { data } = await axios.get("/auth/me");
    return data;
  } catch (error) {
    console.log(error);
  }
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
      state.user = null;
      state.isLodaing = false;
      state.status = null;
    },
  },
  extraReducers: {
    // Register user
    [registerUser.pending]: (state) => {
      state.isLodaing = true;
      state.status = null;
    },
    [registerUser.fulfilled]: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isLodaing = false;
      state.status = action.payload.message;
    },
    [registerUser.rejected]: (state, action) => {
      state.isLodaing = false;
      state.status = action.payload.message;
    },

    // Login user
    [loginUser.pending]: (state) => {
      state.isLodaing = true;
      state.status = null;
    },
    [loginUser.fulfilled]: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isLodaing = false;
      state.status = action.payload.message;
    },
    [loginUser.rejected]: (state, action) => {
      state.isLodaing = false;
      state.status = action.payload.message;
    },

    // Verification if user is login
    [getMe.pending]: (state) => {
      state.isLodaing = true;
      state.status = null;
    },
    [getMe.fulfilled]: (state, action) => {
      state.isLodaing = false;
      state.status = null;
      state.user = action.payload?.user;
      state.token = action.payload?.token;
    },
    [getMe.rejected]: (state, action) => {
      state.isLodaing = false;
      state.status = action.payload.message;
    },
  },
});

export const checkIsAuth = (state) => Boolean(state.auth.token);

export default authSlice.reducer;
