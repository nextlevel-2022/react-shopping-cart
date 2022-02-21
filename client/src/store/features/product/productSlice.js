import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { request } from "@common/api";

export const getProductById = createAsyncThunk("product/fetchProduct", async id => {
  const response = await request.get(`products/${id}`);
  return response?.data;
});

const initialState = {
  status: "idle",
  product: {},
  error: null,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    loadProduct: (state, action) => {
      state.product = { ...action.payload };
    },
  },
  extraReducers: {
    [getProductById.pending]: (state, action) => {
      state.status = "loading";
    },
    [getProductById.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.product = { ...action.payload };
    },
    [getProductById.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
  },
});

export const { loadProduct } = productSlice.actions;
export default productSlice.reducer;

export const selectProduct = state => {
  console.log(state);
  return state.product.product;
};
