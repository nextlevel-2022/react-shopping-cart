import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: []
  },
  reducers: {
    addToCart: (state, action) => {
      console.log(action.payload)
      state.cart = action.payload;
    },
    removeFromCart: (state, action) => {
      state.cart.filter(product => product.id !== action.id);
    }
  }
});

export const { addToCart, removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;
