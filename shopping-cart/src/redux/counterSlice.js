import { createSlice } from "@reduxjs/toolkit";

export const productSlice = createSlice({
  name: "product",
  initialState: {
    info: null
  },
  reducers: {
    click: (state, action) => {
      state.info = action.payload
    }
  }
})

export const {click} = productSlice.actions;

export default productSlice.reducer;
