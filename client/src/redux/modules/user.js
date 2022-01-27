import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    id: null,
    username: null,
    email: null,
    couple_id: null,
    is_matching: false,
    started_at: null,
  },
  reducers: {
    setUserInfo: (state, action) => {
      state.id = action.payload.id;
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.couple_id = action.payload.couple_id;
      state.is_matching = action.payload.is_matching;
      state.started_at = action.payload.started_at;
    },
    removeUserInfo: (state) => {
      state.id = null;
      state.username = null;
      state.email = null;
      state.couple_id = null;
      state.is_matching = false;
      state.started_at = null;
    },
  },
});

export default userSlice.reducer;
export const { setUserInfo, removeUserInfo } = userSlice.actions;
