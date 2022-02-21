import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { request } from "@common/api";

export const getProducts = createAsyncThunk("products/fetchProduct", async () => {
  const response = await request.get("products");
  return response?.data;
});

const initialState = {
  status: "idle",
  products: [],
  error: null,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    loadProducts: (state, action) => {
      state.products = [...action.payload];
    },
  },
  extraReducers: {
    [getProducts.pending]: (state, action) => {
      state.status = "loading";
    },
    [getProducts.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.products = [...action.payload];
    },
    [getProducts.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
  },
});

export const { loadProducts } = productsSlice.actions;
export default productsSlice.reducer;

export const selectProducts = state => state.products.products;
