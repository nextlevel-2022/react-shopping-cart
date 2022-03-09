import { createSlice } from "@reduxjs/toolkit";

export const CartState = createSlice({
  name: "cart"
})

const CartReducer = CartState.reducer
export default CartReducer