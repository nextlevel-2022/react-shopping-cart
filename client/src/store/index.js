import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "@store/features/product/productsSlice";
import productReducer from "@store/features/product/productSlice";

export const store = configureStore({
  reducer: {
    products: productsReducer,
    product: productReducer,
  },
});
