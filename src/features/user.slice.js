import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
const initialState = {
  loading: false,
  error: null,
  token: null,
  isAuthenticated: false,
  user: null,
};

export const loginApi = createAsyncThunk(
  "admin/login",
  async (creds, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/admin/auth/login`,
        creds
      );

      // console.log(res, "the response of login api");

      if (res.data?.success) {
        toast.success("Login successfully!");
        localStorage.setItem("token", res.data?.data?.token);
        localStorage.setItem("user", JSON.stringify(res.data?.data?.user));
        return {
          user: res.data?.data?.user,
          token: res.data?.data?.token,
        };
      } else {
        toast.error(res.data.message);
        return rejectWithValue(res.data.message);
      }
    } catch (error) {
      console.log(error, "in the catch error of logina pi thunk");
      if (error?.response) {
        toast.error(error.response.data.message);
        return rejectWithValue(error.response.data.message);
      } else {
        toast.error(error.message);
        return rejectWithValue(error.message);
      }
    }
  }
);

const userSlice = createSlice({
  name: "adminState",
  initialState,
  reducers: {
    logout: (state, action) => {
      state.token = null;
      state.error = null;
      state.isAuthenticated = false;
      state.user = null;
    },
    refresh: (state, action) => {
      state.token = action.payload.token;
      state.error = null;
      state.isAuthenticated = true;
      state.user = action.payload.user;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginApi.pending, (state, action) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(loginApi.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.error = null;
        state.user = action?.payload?.user;
        state.token = action?.payload?.token;
        state.loading = false;
      })
      .addCase(loginApi.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.payload;
      });
  },
});

const { actions, reducer } = userSlice;

export const { logout, refresh } = actions;
export default reducer;
