import { combineReducers } from "redux";
import cartReducer from "../pages/CartPage/cartSlicer";
import counterReducer from "./counterSlice";
import {configureStore} from '@reduxjs/toolkit';

export default configureStore({
  reducer: {
    "counter": counterReducer,
    "cart": cartReducer
  }
});
