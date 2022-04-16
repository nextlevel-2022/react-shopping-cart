import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
  "1": {
    quantity: 1,
    isChecked: false,
  },
  "2": {
    quantity: 1,
    isChecked: false,
  },
};

const cartCounterSlice = createSlice({
  name: "cartCounter",
  initialState,
  reducers: {
    increase: (state, { payload }) => {
      // console.log("before", current(state));
      state[payload].quantity++;
      // console.log("after", current(state));
    },
    decrease(state, { payload }) {
      state[payload].quantity--;
    },
    toggle(state, { payload }) {
      state[payload].isChecked = !state[payload].isChecked;
    }
    // insert(state, action) {

    // },
  },
});

export const { increase, decrease, toggle } = cartCounterSlice.actions;
const cartReducer = cartCounterSlice.reducer;
export default cartReducer;
