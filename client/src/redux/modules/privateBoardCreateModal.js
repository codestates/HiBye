import { createSlice } from "@reduxjs/toolkit";

const privateBoardCreateModalSlice = createSlice({
  name: "privateBoardCreateModal",
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

export default privateBoardCreateModalSlice.reducer;
export const { openModal, closeModal } = privateBoardCreateModalSlice.actions;
