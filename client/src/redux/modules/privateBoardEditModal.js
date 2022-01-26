import { createSlice } from "@reduxjs/toolkit";

const privateBoardEditModalSlice = createSlice({
  name: "privateBoardEditModal",
  initialState: { isOpen: false },
  reducers: {
    openModal: (state) => {
      state.isOpen = true;
    },
    closeModal: (state) => {
      state.isOpen = false;
    },
  },
});

export default privateBoardEditModalSlice.reducer;
export const { openModal, closeModal } = privateBoardEditModalSlice.actions;
