import { combineReducers } from "redux";
import cartReducer from "../modules/cartCounter";

const rootReducer = combineReducers({
  cart: cartReducer,
})

export default rootReducer;
