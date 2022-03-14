import { combineReducers } from "redux";
import cartCounterSlice from "../modules/cartCounter";

const rootReducer = combineReducers({
  cartCounterSlice: cartCounterSlice.reducer,
})

export default rootReducer;
