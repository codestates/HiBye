import { createSlice } from "@reduxjs/toolkit";

const chatEditModalSlice = createSlice({
  name: "chatEditModal",
  initialState: { isOpen: false, post_id: "", post_contents: "" },
  reducers: {
    openModal: (state, action) => {
      state.isOpen = true;
      state.post_id = action.payload.post_id;
      state.post_contents = action.payload.post_contents;
    },
    closeModal: (state) => {
      state.isOpen = false;
      state.post_id = "";
      state.post_contents = "";
    },
  },
});

export default chatEditModalSlice.reducer;
export const { openModal, closeModal } = chatEditModalSlice.actions;
