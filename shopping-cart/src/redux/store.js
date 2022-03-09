import { configureStore } from "@reduxjs/toolkit"
import CartReducer from "./cartSlicer"
import counterSlice from "./counterSlice"

export const store = configureStore({
  reducer: {
    //cart: CartReducer
  },
})