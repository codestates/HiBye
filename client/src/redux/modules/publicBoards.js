import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getPublicBoards = createAsyncThunk("publicBoards/getPublicBoards", async () => {
  const response = await axios.get(`${process.env.REACT_APP_API_URL}/boards`);
  return response.data;
});

const publicBoardsSlice = createSlice({
  name: "publicBoardsSlice",
  initialState: {
    loading: true,
    error: null,
    data: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getPublicBoards.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getPublicBoards.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(getPublicBoards.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });
  },
});

export default publicBoardsSlice.reducer;
