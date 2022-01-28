import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getPrivateBoards = createAsyncThunk("privateBoards/getPrivateBoards", async (couple_id) => {
  const response = await axios.get(`${process.env.REACT_APP_API_URL}/boards/${couple_id}`);
  return response.data;
});

const privateBoardsSlice = createSlice({
  name: "privateBoardsSlice",
  initialState: {
    loading: true,
    error: null,
    data: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getPrivateBoards.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getPrivateBoards.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(getPrivateBoards.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });
  },
});

export default privateBoardsSlice.reducer;
