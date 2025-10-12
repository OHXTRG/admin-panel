import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  loading: false,
  error: null,
  token: null,
  isAuthenticated: false,
  user: null,
};

export const loginApi = createAsyncThunk(
  "user/login",
  async (creds, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/login`,
        creds
      );

      console.log(res, "the response of login api");

      if (res.data.success) {
        return {
          user: res.data.user,
          token: res.data.user,
        };
      } else {
        rejectWithValue(res.data.message);
      }
    } catch (error) {
      console.log(error, "in the catch error of logina pi thunk");
      if (error?.response) {
        rejectWithValue(error.response.data.message);
      } else {
        rejectWithValue(error.message);
      }
    }
  }
);

const userSlice = createSlice({
  name: "userState",
  initialState,
  reducers: {
    logout: (state, action) => {
      state.token = null;
      state.error = null;
      state.isAuthenticated = false;
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginApi.pending, (state, action) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(loginApi.fulfilled, (state, action) => {
      state.isAuthenticated = true;
      state.error = null;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.loading = false;
    });
    builder.addCase(loginApi.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

const { actions, reducer } = userSlice;

export const { loginFailure, loginRequest, loginSuccess } = actions;
export default reducer;
