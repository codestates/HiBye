import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    // id: null,
    // username: null,
    // email: null,
    // couple_id: null,
    // is_matching: false,
    // d_day: null,
    id: 1,
    username: "yuchan",
    email: null,
    couple_id: 1,
    is_matching: true,
    d_day: null,
  },
  reducers: {
    setUserInfo: (state, action) => {
      state.id = action.payload.id;
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.couple_id = action.payload.couple_id;
      state.is_matching = action.payload.is_matching;
      state.d_day = action.payload.d_day;
    },
    removeUserInfo: (state) => {
      state.id = null;
      state.username = null;
      state.email = null;
      state.couple_id = null;
      state.is_matching = false;
      state.d_day = null;
    },
  },
});

export default userSlice.reducer;
export const { setUserInfo, removeUserInfo } = userSlice.actions;
