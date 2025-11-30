import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
const initialState = {
  loading: false,
  error: null,
  data: null,
};

export const getAllExerciseAPI = createAsyncThunk(
  "admin/getAllExercise",
  async (token, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/admin/exercise/getAll`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data?.success) {
        return {
          data: res.data?.data || [],
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
  name: "exerciseState",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllExerciseAPI.pending, (state, action) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(getAllExerciseAPI.fulfilled, (state, action) => {
        state.error = null;
        state.loading = false;
        state.data = action.payload.data;
      })
      .addCase(getAllExerciseAPI.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.payload;
      });
  },
});

const { actions, reducer } = userSlice;

export const {} = actions;
export default reducer;
