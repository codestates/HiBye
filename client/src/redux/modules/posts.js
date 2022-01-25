import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getPosts = createAsyncThunk("posts/getPosts", async (board_id) => {
  const response = await axios.get(`${process.env.REACT_APP_API_URL}/posts/${board_id}`);
  return response.data;
});

const postsSlice = createSlice({
  name: "postsSlice",
  initialState: {
    loading: true,
    error: null,
    data: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getPosts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getPosts.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(getPosts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });
  },
});

export default postsSlice.reducer;
