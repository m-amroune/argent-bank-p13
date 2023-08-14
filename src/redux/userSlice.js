import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { baseUrl } from "../services/api";
import axios from "axios";

// Bank Argent API documentation :  http://localhost:3001/api-docs/

export const userLogin = createAsyncThunk(
  "user/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      // configure header's Content-Type to JSON
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        `${baseUrl}/user/login`,
        { email, password },
        config
      );

      // user's token in localstorage
      localStorage.setItem("userToken", data.body.token);

      return data;
    } catch (error) {
      // return error message from API
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const getUserProfile = createAsyncThunk(
  `${baseUrl}/user/profile`,
  async (userToken, { rejectWithValue }) => {
    try {
      const bodyParameters = {
        key: "value",
      };
      const config = {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      };
      const { data } = await axios.post(
        `${baseUrl}/user/profile`,
        bodyParameters,
        config
      );
      return data;
    } catch (error) {
      // return  error message from API
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const userUpdate = createAsyncThunk(
  "user/update",
  async ({ firstName, lastName }, { getState, rejectWithValue }) => {
    try {
      const { user } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.userToken}`,
        },
      };

      const { data } = await axios.put(
        `${baseUrl}/user/profile`,
        { firstName, lastName },
        config
      );

      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

const userToken = localStorage.getItem("userToken")
  ? localStorage.getItem("userToken")
  : null;

const initialState = {
  loading: false,
  userInfo: null,
  userToken,
  error: null,
  success: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem("userToken");
      state.loading = false;
      state.userInfo = null;
      state.userToken = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder // Login
      .addCase(userLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload;
        state.userToken = action.payload.body.token;
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      }) // Profile details
      .addCase(getUserProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload.body;
      })
      .addCase(getUserProfile.rejected, (state) => {
        state.loading = false;
      }) // Update profile
      .addCase(userUpdate.pending, (state) => {
        state.loading = true;
      })
      .addCase(userUpdate.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload.body;
      })
      .addCase(userUpdate.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default userSlice.reducer;
export const { logout } = userSlice.actions;
