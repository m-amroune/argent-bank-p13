import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const baseUrl = "http://localhost:3001/api/v1";

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
